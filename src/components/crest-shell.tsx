import { Link } from "@tanstack/react-router";
import { Menu, Search, X, ArrowUpRight } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import logoAsset from "@/assets/crest-logo.jpeg.asset.json";
import { Button } from "@/components/ui/button";

const nav = [
  ["Materials", "/products"],
  ["Collections", "/catalogue"],
  ["Projects", "/projects"],
  ["Match", "/match"],
  ["Showroom", "/contact"],
  ["Contact", "/contact"],
] as const;

export function CrestShell({
  children,
  darkHeader = false,
  overlayHeader = false,
}: {
  children: ReactNode;
  darkHeader?: boolean;
  overlayHeader?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!overlayHeader) return;

    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [overlayHeader]);

  const isDark = darkHeader || overlayHeader;

  const headerClass = isDark
    ? "text-primary-foreground"
    : "text-foreground";

  const backgroundClass = overlayHeader
    ? scrolled
      ? "bg-charcoal/95 backdrop-blur-xl"
      : "bg-charcoal/25 backdrop-blur-[2px]"
    : darkHeader
      ? "bg-charcoal"
      : "bg-background";

  const borderClass = isDark
    ? "border-primary-foreground/15"
    : "border-border";

  const iconButtonClass = isDark
    ? "text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
    : "text-foreground hover:bg-foreground/5 hover:text-foreground";

  return (
    <div className="min-h-screen bg-background">
      {/* HEADER */}
      <header
        className={`
          ${overlayHeader ? "fixed" : "relative"}
          inset-x-0 top-0 z-50 h-20
          border-b
          transition-all duration-500
          ${headerClass}
          ${backgroundClass}
          ${borderClass}
        `}
      >
        <div
          className="
            mx-auto grid h-full max-w-[1600px]
            grid-cols-[1fr_auto]
            items-center
            gap-4
            px-5
            lg:grid-cols-[190px_1fr_190px]
            lg:px-10
          "
        >
          {/* LOGO */}
          <Link
            to="/"
            aria-label="CREST home"
            className="group relative z-10 flex w-fit items-center"
          >
            <img
              src={logoAsset.url}
              alt="CREST"
              className={`
                h-10 w-auto max-w-32
                object-contain
                transition-all duration-500
                ${
                  isDark
                    ? "brightness-0 invert"
                    : "brightness-100"
                }
              `}
            />

            {/* subtle logo line */}
            <span
              className={`
                ml-3 hidden h-px w-8 transition-all duration-500
                lg:block
                ${
                  isDark
                    ? "bg-primary-foreground/30 group-hover:w-12"
                    : "bg-foreground/20 group-hover:w-12"
                }
              `}
            />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav
            className="
              hidden
              items-center
              justify-center
              gap-7
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.16em]
              lg:flex
            "
          >
            {nav.map(([label, to]) => (
              <Link
                key={`${label}-${to}`}
                to={to}
                activeProps={{
                  className: "opacity-100",
                }}
                className={`
                  group relative
                  py-3
                  opacity-70
                  transition-all
                  duration-300
                  hover:opacity-100
                  ${
                    isDark
                      ? "text-primary-foreground"
                      : "text-foreground"
                  }
                `}
              >
                {label}

                <span
                  className={`
                    absolute
                    inset-x-0
                    bottom-1
                    h-px
                    origin-left
                    scale-x-0
                    transition-transform
                    duration-500
                    group-hover:scale-x-100
                    ${
                      isDark
                        ? "bg-primary-foreground"
                        : "bg-foreground"
                    }
                  `}
                />
              </Link>
            ))}
          </nav>

          {/* RIGHT CONTROLS */}
          <div className="flex shrink-0 items-center justify-end gap-1">
            {/* SEARCH */}
            <Button
              asChild
              variant="ghost"
              size="icon"
              className={`
                h-10 w-10
                rounded-none
                ${iconButtonClass}
              `}
            >
              <Link
                to="/products"
                aria-label="Search products"
              >
                <Search
                  size={17}
                  strokeWidth={1.5}
                  className="text-current"
                />
              </Link>
            </Button>

            {/* MENU */}
            <Button
              variant="ghost"
              size="icon"
              aria-label={
                open ? "Close menu" : "Open menu"
              }
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              className={`
                h-10 w-10
                rounded-none
                ${iconButtonClass}
                lg:hidden
              `}
            >
              {open ? (
                <X
                  size={21}
                  strokeWidth={1.5}
                  className="text-current"
                />
              ) : (
                <Menu
                  size={21}
                  strokeWidth={1.5}
                  className="text-current"
                />
              )}
            </Button>

            {/* DESKTOP MENU LABEL */}
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className={`
                hidden
                items-center
                gap-2
                px-3
                py-2
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.16em]
                transition-opacity
                hover:opacity-60
                lg:flex
                ${
                  isDark
                    ? "text-primary-foreground"
                    : "text-foreground"
                }
              `}
              aria-label={
                open ? "Close menu" : "Open menu"
              }
            >
              <span>
                {open ? "Close" : "Menu"}
              </span>

              <span className="flex w-4 flex-col gap-[4px]">
                <span
                  className={`
                    h-px w-full
                    transition-transform duration-300
                    ${
                      open
                        ? "translate-y-[2.5px] rotate-45"
                        : ""
                    }
                    ${
                      isDark
                        ? "bg-primary-foreground"
                        : "bg-foreground"
                    }
                  `}
                />

                <span
                  className={`
                    h-px w-full
                    transition-transform duration-300
                    ${
                      open
                        ? "-translate-y-[2.5px] -rotate-45"
                        : ""
                    }
                    ${
                      isDark
                        ? "bg-primary-foreground"
                        : "bg-foreground"
                    }
                  `}
                />
              </span>
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div
            className="
              absolute
              inset-x-0
              top-20
              min-h-[calc(100svh-5rem)]
              border-t
              border-primary-foreground/15
              bg-charcoal
              px-6
              py-12
              text-primary-foreground
              lg:hidden
            "
          >
            <div className="mb-12 flex items-center justify-between">
              <p className="text-[9px] uppercase tracking-[0.18em] text-primary-foreground/45">
                Navigate
              </p>

              <span className="text-[9px] uppercase tracking-[0.14em] text-primary-foreground/35">
                CREST
              </span>
            </div>

            <nav className="grid gap-5">
              {nav.map(([label, to], i) => (
                <Link
                  key={`${label}-${to}`}
                  to={to}
                  onClick={() => setOpen(false)}
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    border-b
                    border-primary-foreground/15
                    pb-5
                    font-serif
                    text-4xl
                    transition-opacity
                    hover:opacity-60
                  "
                >
                  <span>{label}</span>

                  <span className="flex items-center gap-3 font-sans text-[9px] text-primary-foreground/35">
                    0{i + 1}
                    <ArrowUpRight size={13} />
                  </span>
                </Link>
              ))}
            </nav>

            <div className="mt-16 border-t border-primary-foreground/10 pt-6">
              <p className="text-[9px] uppercase tracking-[0.16em] text-primary-foreground/40">
                Architectural surfaces
              </p>

              <p className="mt-2 max-w-xs font-serif text-lg text-primary-foreground/70">
                Materials that shape spaces.
              </p>
            </div>
          </div>
        )}
      </header>

      {/* PAGE */}
      {children}

      {/* FOOTER */}
      <footer className="border-t bg-background px-5 py-12 lg:px-10">
        <div className="mx-auto grid max-w-[1600px] gap-10 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <Link to="/" aria-label="CREST home">
            <img
              src={logoAsset.url}
              alt="CREST"
              className="h-10 w-auto max-w-28 object-contain"
            />
          </Link>

          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-[9px] font-semibold uppercase tracking-[.14em]">
            {nav.map(([label, to]) => (
              <Link
                key={`${label}-footer`}
                to={to}
                className="transition-opacity hover:opacity-50"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-wrap gap-5 text-[9px] uppercase tracking-[.14em] lg:justify-end">
            <span>Hyderabad · Pan-India</span>
            <Link
              to="/admin"
              className="transition-opacity hover:opacity-50"
            >
              Admin
            </Link>
          </div>
        </div>
      </footer>

      {/* MOBILE ACTION BAR */}
      <div
        className="
          fixed
          inset-x-0
          bottom-0
          z-40
          grid
          grid-cols-2
          border-t
          border-primary-foreground/20
          bg-charcoal
          text-primary-foreground
          lg:hidden
        "
      >
        <Button
          asChild
          variant="inverse"
          className="rounded-none border-0"
        >
          <Link to="/contact">Enquire</Link>
        </Button>

        <Button
          asChild
          variant="inverse"
          className="rounded-none border-y-0 border-r-0"
        >
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
        </Button>
      </div>
    </div>
  );
}x-w-[1600px]"><div className="mb-10 flex items-center gap-4 text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground"><p>{eyebrow}</p><span className="h-px w-12 bg-border"/></div><div className="grid gap-10 lg:grid-cols-[1.65fr_.65fr] lg:items-end"><h1 className="max-w-5xl text-6xl leading-[.86] sm:text-8xl lg:text-[7.75rem]">{title}</h1><p className="max-w-md text-sm leading-7 text-muted-foreground">{copy}</p></div></div></section> }
