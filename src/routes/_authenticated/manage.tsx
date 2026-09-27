import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Tables = Database["public"]["Tables"];
type ProductRow = Pick<Tables["products"]["Row"], "id" | "name" | "code" | "stock_status" | "stock_quantity" | "featured" | "published">;
type CategoryRow = Pick<Tables["categories"]["Row"], "id" | "name" | "slug" | "active" | "display_order">;
type EnquiryRow = Tables["enquiries"]["Row"];
type StockStatus = Database["public"]["Enums"]["stock_status"];
type EnquiryStatus = Database["public"]["Enums"]["enquiry_status"];
const stockStatuses: StockStatus[] = ["in_stock", "low_stock", "out_of_stock", "made_to_order"] as StockStatus[];
const enquiryStatuses: EnquiryStatus[] = ["new", "contacted", "quoted", "converted", "closed"];

export const Route = createFileRoute("/_authenticated/manage")({
  head: () => ({ meta: [
    { title: "CREST Management" },
    { name: "description", content: "Manage the CREST product collection, inventory and enquiries." },
    { property: "og:title", content: "CREST Management" },
    { property: "og:description", content: "Secure catalogue management." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: Manage,
});

const sections = ["Overview", "Products", "Categories", "Inventory", "Media", "Enquiries"] as const;
type Section = (typeof sections)[number];
const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const label = (s: string) => s.replaceAll("_", " ");
const selectCls = "h-9 border bg-background px-2 text-[10px] uppercase tracking-[.1em]";

function Manage() {
  const navigate = useNavigate();
  const [active, setActive] = useState<Section>("Overview");
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [enquiries, setEnquiries] = useState<EnquiryRow[]>([]);
  const [media, setMedia] = useState<{ name: string; url: string }[]>([]);
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState<string>();

  async function load() {
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) return;
    let { data: role } = await supabase.from("user_roles").select("role").eq("user_id", u.user.id).eq("role", "admin").maybeSingle();
    if (!role) {
      await supabase.rpc("claim_initial_admin" as never);
      ({ data: role } = await supabase.from("user_roles").select("role").eq("user_id", u.user.id).eq("role", "admin").maybeSingle());
    }
    setAllowed(Boolean(role));
    if (!role) return;
    const [p, c, e, m] = await Promise.all([
      supabase.from("products").select("id,name,code,stock_status,stock_quantity,featured,published").order("created_at", { ascending: false }),
      supabase.from("categories").select("id,name,slug,active,display_order").order("display_order"),
      supabase.from("enquiries").select("*").order("created_at", { ascending: false }),
      supabase.storage.from("crest-media").list("", { limit: 100, sortBy: { column: "created_at", order: "desc" } }),
    ]);
    setProducts((p.data ?? []) as ProductRow[]);
    setCategories((c.data ?? []) as CategoryRow[]);
    setEnquiries((e.data ?? []) as EnquiryRow[]);
    const files = (m.data ?? []).filter((f) => f.id);
    if (files.length) {
      const { data: signed } = await supabase.storage.from("crest-media").createSignedUrls(files.map((f) => f.name), 3600);
      setMedia((signed ?? []).map((s, i) => ({ name: files[i]!.name, url: s.signedUrl ?? "" })));
    } else setMedia([]);
  }
  useEffect(() => { load(); }, []);

  const flash = (msg: string) => { setNotice(msg); window.setTimeout(() => setNotice(undefined), 3000); };
  const report = (error: { message: string } | null, ok: string) => { flash(error ? error.message : ok); if (!error) load(); };

  async function addProduct(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); const form = e.currentTarget; const fd = new FormData(form); const name = String(fd.get("name"));
    const { error } = await supabase.from("products").insert({ name, slug: `${slugify(name)}-${Date.now().toString(36)}`, code: String(fd.get("code")), category_id: String(fd.get("category")) || null, price: Number(fd.get("price")) || null, stock_quantity: Number(fd.get("stock")) || 0, stock_status: "in_stock", short_description: "", description: "" });
    if (!error) form.reset(); report(error, "Product saved.");
  }
  async function addCategory(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); const form = e.currentTarget; const name = String(new FormData(form).get("name"));
    const { error } = await supabase.from("categories").insert({ name, slug: slugify(name), display_order: categories.length + 1 });
    if (!error) form.reset(); report(error, "Category added.");
  }
  async function upload(files: FileList | null) {
    if (!files?.length) return;
    for (const f of Array.from(files)) {
      const { error } = await supabase.storage.from("crest-media").upload(`${Date.now()}-${slugify(f.name.replace(/\.[^.]+$/, ""))}.${f.name.split(".").pop()}`, f);
      if (error) return flash(error.message);
    }
    report(null, "Upload complete.");
  }
  async function signout() { await supabase.auth.signOut(); navigate({ to: "/admin" }); }

  if (allowed === null) return <main className="grid min-h-screen place-items-center"><p className="text-xs uppercase tracking-[.16em]">Loading management…</p></main>;
  if (!allowed) return <main className="grid min-h-screen place-items-center px-5"><div className="max-w-md text-center"><h1 className="text-5xl">Access pending.</h1><p className="mt-5 text-sm leading-7 text-muted-foreground">Your account is signed in but does not yet have a CREST administrator role.</p><Button className="mt-8" onClick={signout}>Sign out</Button></div></main>;

  const q = query.toLowerCase();
  const shownProducts = products.filter((p) => `${p.name} ${p.code}`.toLowerCase().includes(q));
  const newEnquiries = enquiries.filter((e) => e.status === "new").length;

  return <main className="min-h-screen bg-background pb-10">
    <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center border-b bg-charcoal px-5 py-5 text-primary-foreground lg:px-8">
      <div className="min-w-0"><Link to="/" className="font-serif text-3xl">CREST</Link><p className="text-[9px] uppercase tracking-[.14em] text-primary-foreground/60">Management</p></div>
      <Button variant="ghost" size="icon" onClick={signout} aria-label="Sign out"><LogOut /></Button>
    </header>
    <div className="grid lg:grid-cols-[220px_minmax(0,1fr)]">
      <aside className="border-b lg:min-h-[calc(100vh-85px)] lg:border-b-0 lg:border-r">
        <nav className="flex overflow-x-auto lg:grid lg:py-6">{sections.map((s, i) => <button key={s} onClick={() => setActive(s)} className={`flex shrink-0 items-center gap-3 border-b-2 px-5 py-4 text-[10px] font-semibold uppercase tracking-[.14em] transition-colors lg:border-b-0 lg:border-l-2 ${active === s ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}><span className="tabular-nums opacity-50">0{i + 1}</span>{s}</button>)}</nav>
      </aside>
      <section className="min-w-0 p-5 lg:p-10">
        <p className="text-[10px] uppercase tracking-[.16em] text-muted-foreground">CREST operations</p>
        <h1 className="mt-2 truncate text-5xl lg:text-7xl">{active}</h1>
        {notice && <p role="status" className="mt-6 border px-4 py-3 text-xs">{notice}</p>}

        {active === "Overview" && <div className="mt-12 grid border-y sm:grid-cols-4">
          <Metric label="Total products" value={products.length} />
          <Metric label="Low / out of stock" value={products.filter((p) => p.stock_status !== "in_stock" && p.stock_status !== ("made_to_order" as StockStatus)).length} />
          <Metric label="Categories" value={categories.length} />
          <Metric label="New enquiries" value={newEnquiries} />
        </div>}

        {active === "Products" && <div className="mt-10">
          <form onSubmit={addProduct} className="mb-10 grid gap-3 border-y py-6 md:grid-cols-6">
            <Input name="name" required placeholder="Product name" className="md:col-span-2" />
            <Input name="code" required placeholder="Code" />
            <select name="category" className={`${selectCls} h-10`} defaultValue=""><option value="">Category</option>{categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
            <Input name="price" type="number" placeholder="Price ₹" />
            <Button>Save product</Button>
          </form>
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products by name or code" className="mb-2" />
          {shownProducts.map((p) => <div key={p.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b py-5">
            <div className="min-w-0"><p className="truncate text-sm font-semibold">{p.name}</p><p className="mt-1 text-[10px] text-muted-foreground">{p.code} · {label(p.stock_status)}</p></div>
            <div className="flex flex-wrap justify-end gap-2">
              <Button size="sm" variant={p.featured ? "default" : "outline"} onClick={async () => report((await supabase.from("products").update({ featured: !p.featured }).eq("id", p.id)).error, "Updated.")}>{p.featured ? "Featured" : "Feature"}</Button>
              <Button size="sm" variant={p.published ? "outline" : "ghost"} onClick={async () => report((await supabase.from("products").update({ published: !p.published }).eq("id", p.id)).error, "Updated.")}>{p.published ? "Published" : "Hidden"}</Button>
              <Button size="sm" variant="ghost" onClick={async () => { if (confirm(`Delete ${p.name}?`)) report((await supabase.from("products").delete().eq("id", p.id)).error, "Deleted."); }}>Delete</Button>
            </div>
          </div>)}
          {!shownProducts.length && <Empty text="No products match." />}
        </div>}

        {active === "Categories" && <div className="mt-10">
          <form onSubmit={addCategory} className="mb-8 grid grid-cols-[minmax(0,1fr)_auto] gap-3 border-y py-6"><Input name="name" required placeholder="New category name" /><Button>Add</Button></form>
          {categories.map((c) => <div key={c.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b py-5">
            <div className="min-w-0"><p className="truncate font-serif text-2xl">{c.name}</p><p className="text-[10px] text-muted-foreground">/{c.slug} · {products.length ? "" : ""}order {c.display_order}</p></div>
            <Button size="sm" variant={c.active ? "outline" : "ghost"} onClick={async () => report((await supabase.from("categories").update({ active: !c.active }).eq("id", c.id)).error, "Updated.")}>{c.active ? "Active" : "Inactive"}</Button>
          </div>)}
          {!categories.length && <Empty text="No categories yet." />}
        </div>}

        {active === "Inventory" && <div className="mt-10">
          {products.map((p) => <InventoryRow key={p.id} p={p} onSave={async (qty, status) => report((await supabase.from("products").update({ stock_quantity: qty, stock_status: status }).eq("id", p.id)).error, `${p.name} updated.`)} />)}
          {!products.length && <Empty text="No products to track." />}
        </div>}

        {active === "Media" && <div className="mt-10">
          <label className="flex cursor-pointer flex-col items-center justify-center border border-dashed px-5 py-14 text-center hover:bg-secondary">
            <span className="font-serif text-3xl">Upload material imagery</span>
            <span className="mt-2 text-[10px] uppercase tracking-[.14em] text-muted-foreground">JPG, PNG or WebP · up to 20 MB each</span>
            <input type="file" accept="image/*" multiple className="sr-only" onChange={(e) => upload(e.target.files)} />
          </label>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">{media.map((m) => <figure key={m.name} className="border">
            <img src={m.url} alt={m.name} loading="lazy" className="aspect-square w-full object-cover" />
            <figcaption className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 p-2"><span className="truncate text-[10px]">{m.name}</span><button className="text-[9px] uppercase tracking-[.1em] text-muted-foreground hover:text-foreground" onClick={async () => report((await supabase.storage.from("crest-media").remove([m.name])).error, "Removed.")}>Remove</button></figcaption>
          </figure>)}</div>
          {!media.length && <Empty text="No media uploaded yet." />}
        </div>}

        {active === "Enquiries" && <div className="mt-10">
          {enquiries.map((e) => <article key={e.id} className="grid gap-4 border-b py-6 md:grid-cols-[minmax(0,1fr)_auto]">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[.14em] text-muted-foreground">{new Date(e.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}{e.product_name ? ` · ${e.product_name} × ${e.quantity}` : ""}</p>
              <p className="mt-1 font-serif text-2xl">{e.name}{e.company ? `, ${e.company}` : ""}</p>
              <p className="mt-1 text-sm"><a href={`tel:${e.phone}`} className="underline">{e.phone}</a>{e.email && <> · <a href={`mailto:${e.email}`} className="underline">{e.email}</a></>}{e.delivery_location ? ` · ${e.delivery_location}` : ""}</p>
              {e.message && <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{e.message}</p>}
            </div>
            <select value={e.status} className={selectCls} onChange={async (ev) => report((await supabase.from("enquiries").update({ status: ev.target.value as EnquiryStatus }).eq("id", e.id)).error, "Status updated.")}>{enquiryStatuses.map((s) => <option key={s} value={s}>{s}</option>)}</select>
          </article>)}
          {!enquiries.length && <Empty text="No enquiries yet." />}
        </div>}
      </section>
    </div>
  </main>;
}

function InventoryRow({ p, onSave }: { p: ProductRow; onSave: (qty: number, status: StockStatus) => void }) {
  const [qty, setQty] = useState(p.stock_quantity);
  const [status, setStatus] = useState<StockStatus>(p.stock_status);
  const dirty = qty !== p.stock_quantity || status !== p.stock_status;
  return <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b py-4 md:grid-cols-[minmax(0,1fr)_100px_170px_auto]">
    <div className="col-span-2 min-w-0 md:col-span-1"><p className="truncate text-sm font-semibold">{p.name}</p><p className="text-[10px] text-muted-foreground">{p.code}</p></div>
    <Input type="number" min={0} value={qty} onChange={(e) => setQty(Number(e.target.value))} aria-label="Quantity" />
    <select value={status} onChange={(e) => setStatus(e.target.value as StockStatus)} className={selectCls}>{stockStatuses.map((s) => <option key={s} value={s}>{label(s)}</option>)}</select>
    <Button size="sm" disabled={!dirty} onClick={() => onSave(qty, status)} className="col-span-2 md:col-span-1">Save</Button>
  </div>;
}
function Metric({ label, value }: { label: string; value: number }) { return <div className="border-b p-7 last:border-0 sm:border-b-0 sm:border-r"><p className="font-serif text-5xl">{value}</p><p className="mt-2 text-[10px] uppercase tracking-[.12em] text-muted-foreground">{label}</p></div>; }
function Empty({ text }: { text: string }) { return <p className="border-b py-10 text-sm text-muted-foreground">{text}</p>; }
