import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const catalogue = [
  ["natural-oak-veneer", "Natural Oak Veneer", "Veneers", "Matte, natural oak, light warm wood"],
  ["smoked-walnut-veneer", "Smoked Walnut Veneer", "Veneers", "Satin, dark smoked walnut"],
  ["stone-grey-laminate", "Stone Grey Laminate", "Laminates", "Super matte, grey stone look"],
  ["walnut-rhythm-panel", "Walnut Rhythm Panel", "Fluted Panels", "Fluted walnut, natural oil"],
  ["birch-core-ply", "Birch Core Ply", "Plywood", "Sanded pale birch"],
  ["linear-oak-louver", "Linear Oak Louver", "Louvers", "Matte natural oak slats"],
] as const;

export type MaterialMatch = { summary: string; matches: { slug: string; reason: string }[] };

export const matchMaterials = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z.object({ image: z.string().startsWith("data:image/").max(8_000_000) }).parse(d),
  )
  .handler(async ({ data }): Promise<MaterialMatch> => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("AI is not configured.");
    const list = catalogue.map((c) => `${c[0]} | ${c[1]} | ${c[2]} | ${c[3]}`).join("\n");
    const prompt = `You advise architects for CREST, a premium surface materials brand. Study the reference image (tone, grain, texture, finish) and pick the 1-3 best matching CREST materials from this list (slug | name | category | notes):\n${list}\n\nReply ONLY with JSON: {"summary":"one sentence describing the reference","matches":[{"slug":"...","reason":"short reason"}]}`;
    const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Lovable-API-Key": key, "X-Lovable-AIG-SDK": "fetch" },
      body: JSON.stringify({
        model: "openai/gpt-6-astra",
        stream: true,
        store: false,
        reasoning: { effort: "low" },
        input: [{ role: "user", content: [{ type: "input_text", text: prompt }, { type: "input_image", image_url: data.image }] }],
      }),
    });
    if (res.status === 402) throw new Error("AI credits are used up. Please add credits and try again.");
    if (res.status === 429) throw new Error("Too many requests right now. Please try again shortly.");
    if (!res.ok || !res.body) throw new Error(`Material matching failed (${res.status}).`);
    const reader = res.body.getReader();
    const dec = new TextDecoder();
    let buf = "", text = "";
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      const lines = buf.split("\n");
      buf = lines.pop() ?? "";
      for (const line of lines) {
        if (!line.startsWith("data:")) continue;
        try {
          const ev = JSON.parse(line.slice(5).trim());
          if (ev.type === "response.output_text.delta") text += ev.delta;
          if (ev.type === "response.refusal.delta" || ev.type === "error") throw new Error("The image could not be analysed.");
        } catch (e) { if (e instanceof Error && e.message.startsWith("The image")) throw e; }
      }
    }
    const json = text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1);
    let parsed: MaterialMatch;
    try { parsed = JSON.parse(json); } catch { throw new Error("No recommendation was returned. Try another image."); }
    const valid = new Set<string>(catalogue.map((c) => c[0]));
    return { summary: String(parsed.summary ?? ""), matches: (parsed.matches ?? []).filter((m) => valid.has(m.slug)).slice(0, 3) };
  });
