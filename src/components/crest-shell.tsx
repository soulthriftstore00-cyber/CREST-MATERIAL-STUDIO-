import { Link } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import logoAsset from "@/assets/crest-logo.jpeg.asset.json";
import { Button } from "@/components/ui/button";

const nav = [["Materials","/products"],["Collections","/catalogue"],["Projects","/projects"],["Match","/match"],["Showroom","/contact"],["Contact","/contact"]] as const;

export function CrestShell({ children, darkHeader=false, overlayHeader=false }: { children: ReactNode; darkHeader?: boolean; overlayHeader?: boolean }) {
  const [open,setOpen]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{if(!overlayHeader)return;const onScroll=()=>setScrolled(window.scrollY>40);onScroll();window.addEventListener("scroll",onScroll,{passive:true});return()=>window.removeEventListener("scroll",onScroll)},[overlayHeader]);
  const headerTone=darkHeader||overlayHeader ? "text-primary-foreground" : "bg-background text-foreground";
  return <div className="min-h-screen bg-background">
    <header className={`${overlayHeader?"fixed":"relative"} inset-x-0 top-0 z-50 h-20 border-b transition-colors duration-500 ${headerTone} ${overlayHeader&&!scrolled?"border-primary-foreground/15 bg-charcoal/20":"border-primary-foreground/10 bg-charcoal"}`}>
      <div className="mx-auto grid h-full max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 lg:grid-cols-[190px_1fr_190px] lg:px-10">
        <Link to="/" className="min-w-0" aria-label="CREST home"><img src={logoAsset.url} alt="CREST" className="h-11 w-auto max-w-32 object-cover object-center mix-blend-screen" /></Link>
        <nav className="hidden items-center justify-center gap-8 text-[9px] font-semibold uppercase tracking-[0.16em] lg:flex">{nav.map(([label,to])=><Link key={`${label}-${to}`} to={to} activeProps={{className:"text-accent"}} className="relative py-2 transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform hover:after:scale-x-100">{label}</Link>)}</nav>
        <div className="flex shrink-0 items-center justify-end gap-1"><Button asChild variant="ghost" size="icon"><Link to="/products" aria-label="Search products"><Search size={15}/></Link></Button><Button variant="ghost" size="icon" aria-label={open?"Close menu":"Open menu"} onClick={()=>setOpen(!open)} className="lg:hidden">{open?<X/>:<Menu/>}</Button></div>
      </div>
      {open && <div className="absolute inset-x-0 top-20 min-h-[calc(100svh-5rem)] border-t border-primary-foreground/15 bg-charcoal px-6 py-12 text-primary-foreground lg:hidden"><p className="mb-10 text-[9px] uppercase tracking-[.18em] text-primary-foreground/50">Navigate</p><nav className="grid gap-5">{nav.map(([label,to],i)=><Link key={`${label}-${to}`} to={to} onClick={()=>setOpen(false)} className="flex items-center justify-between border-b border-primary-foreground/15 pb-5 font-serif text-4xl"><span>{label}</span><span className="font-sans text-[9px] text-primary-foreground/40">0{i+1}</span></Link>)}</nav></div>}
    </header>
    {children}
    <footer className="border-t bg-background px-5 py-12 lg:px-10"><div className="mx-auto grid max-w-[1600px] gap-10 lg:grid-cols-[1fr_auto_1fr] lg:items-center"><Link to="/" aria-label="CREST home"><img src={logoAsset.url} alt="CREST" className="h-10 w-auto max-w-28 object-cover"/></Link><nav className="flex flex-wrap gap-x-6 gap-y-3 text-[9px] font-semibold uppercase tracking-[.14em]">{nav.map(([label,to])=><Link key={`${label}-footer`} to={to}>{label}</Link>)}</nav><div className="flex flex-wrap gap-5 text-[9px] uppercase tracking-[.14em] lg:justify-end"><span>Hyderabad · Pan-India</span><Link to="/admin">Admin</Link></div></div></footer>
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-primary-foreground/20 bg-charcoal text-primary-foreground lg:hidden"><Button asChild variant="inverse" className="border-0"><Link to="/contact">Enquire</Link></Button><Button asChild variant="inverse" className="border-y-0 border-r-0"><a href="https://wa.me/" target="_blank" rel="noreferrer">WhatsApp</a></Button></div>
  </div>
}

export function PageIntro({eyebrow,title,copy}:{eyebrow:string;title:string;copy:string}) { return <section className="border-b px-5 py-20 lg:px-10 lg:py-28"><div className="mx-auto max-w-[1600px]"><div className="mb-10 flex items-center gap-4 text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground"><p>{eyebrow}</p><span className="h-px w-12 bg-border"/></div><div className="grid gap-10 lg:grid-cols-[1.65fr_.65fr] lg:items-end"><h1 className="max-w-5xl text-6xl leading-[.86] sm:text-8xl lg:text-[7.75rem]">{title}</h1><p className="max-w-md text-sm leading-7 text-muted-foreground">{copy}</p></div></div></section> }