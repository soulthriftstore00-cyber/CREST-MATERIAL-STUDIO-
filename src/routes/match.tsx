import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { CrestShell, PageIntro } from "@/components/crest-shell";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/crest-data";
import { matchMaterials, type MaterialMatch } from "@/lib/material-match.functions";

export const Route = createFileRoute("/match")({
  head: () => ({
    meta: [
      { title: "Material Matcher | CREST" },
      { name: "description", content: "Upload a reference image and find the CREST veneers, laminates and panels that match it." },
      { property: "og:title", content: "Material Matcher | CREST" },
      { property: "og:description", content: "Upload a reference, discover matching CREST surfaces." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MatchPage,
});

function MatchPage() {
  const run = useServerFn(matchMaterials);
  const [image, setImage] = useState<string>();
  const [result, setResult] = useState<MaterialMatch>();
  const [error, setError] = useState<string>();
  const [busy, setBusy] = useState(false);

  const onFile = (file?: File) => {
    if (!file) return;
    if (file.size > 5_000_000) return setError("Please use an image under 5 MB.");
    setError(undefined); setResult(undefined);
    const r = new FileReader();
    r.onload = () => setImage(r.result as string);
    r.readAsDataURL(file);
  };
  const submit = async () => {
    if (!image) return;
    setBusy(true); setError(undefined);
    try { setResult(await run({ data: { image } })); }
    catch (e) { setError(e instanceof Error ? e.message : "Something went wrong."); }
    finally { setBusy(false); }
  };

  return <CrestShell>
    <PageIntro eyebrow="Material matcher" title="Bring a reference." copy="Upload a photo of a surface, interior or mood board. We read its tone, grain and finish and suggest the CREST materials that match." />
    <section className="px-5 py-16 pb-28 lg:px-10">
      <div className="mx-auto grid max-w-[1600px] gap-10 lg:grid-cols-2">
        <div className="border">
          <label className="flex aspect-[4/3] cursor-pointer items-center justify-center overflow-hidden bg-secondary">
            {image ? <img src={image} alt="Your reference" className="h-full w-full object-cover" /> : <span className="text-[10px] uppercase tracking-[.16em] text-muted-foreground">Select a reference image</span>}
            <input type="file" accept="image/*" className="sr-only" onChange={(e) => onFile(e.target.files?.[0])} />
          </label>
          <div className="flex items-center justify-between gap-4 border-t p-4">
            <p className="text-[10px] uppercase tracking-[.14em] text-muted-foreground">JPG or PNG · max 5 MB</p>
            <Button onClick={submit} disabled={!image || busy}>{busy ? "Reading surface…" : "Find matches"}</Button>
          </div>
        </div>
        <div>
          {error && <p className="border border-destructive p-4 text-sm text-destructive">{error}</p>}
          {!result && !error && <p className="font-serif text-3xl text-muted-foreground">Your recommendations will appear here.</p>}
          {result && <>
            <p className="font-serif text-3xl leading-tight">{result.summary}</p>
            {result.matches.length === 0 && <p className="mt-6 text-sm text-muted-foreground">No close match found. <Link to="/contact" className="underline">Ask our team</Link>.</p>}
            <div className="mt-8 grid gap-px border bg-border">
              {result.matches.map((m, i) => { const p = products.find((x) => x.slug === m.slug); if (!p) return null; return (
                <Link key={m.slug} to="/products/$slug" params={{ slug: m.slug }} className="grid grid-cols-[96px_minmax(0,1fr)] gap-4 bg-background p-4 transition-colors hover:bg-secondary">
                  <img src={p.image} alt={p.name} className="aspect-square w-full object-cover" />
                  <div className="min-w-0"><p className="text-[9px] uppercase tracking-[.16em] text-muted-foreground">0{i + 1} · {p.category} · {p.code}</p><p className="mt-1 font-serif text-2xl">{p.name}</p><p className="mt-1 text-sm text-muted-foreground">{m.reason}</p></div>
                </Link>); })}
            </div>
          </>}
        </div>
      </div>
    </section>
  </CrestShell>;
}
