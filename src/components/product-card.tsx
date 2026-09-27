import { Link } from "@tanstack/react-router";
import type { products } from "@/lib/crest-data";

export function ProductCard({ product }: { product: (typeof products)[number] }) {
  return <Link to="/products/$slug" params={{slug:product.slug}} className="group block border-t pt-4"><div className="aspect-[4/5] overflow-hidden bg-muted"><img src={product.image} alt={product.name} loading="lazy" width={1920} height={1080} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"/></div><div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 py-5"><div className="min-w-0"><h2 className="truncate font-sans text-xs font-semibold uppercase tracking-[.1em]">{product.name}</h2><p className="mt-2 text-[10px] text-muted-foreground">{product.category} · {product.code}</p></div><p className="text-[10px] uppercase tracking-[.08em]">{product.price ? `₹${product.price.toLocaleString("en-IN")}` : "Request price"}</p></div></Link>
}