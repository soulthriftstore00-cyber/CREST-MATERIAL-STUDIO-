import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Menu,
  Search,
  X,
} from "lucide-react";
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

type CrestShellProps = {
  children: ReactNode;
  darkHeader?: boolean;
  overlayHeader?: boolean;
};

export function CrestShell({
  children,
  darkHeader = false,
  overlayHeader = false,
}: CrestShellProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!overlayHeader) {
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [overlayHeader]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const darkMode = darkHeader || overlayHeader;

  const headerPosition = overlayHeader
    ? "fixed"
    : "relative";

  const headerBackground = overlayHeader
    ? scrolled
      ? "bg-charcoal/95 backdrop-blur-xl"
      : "bg-charcoal/30 backdrop-blur-sm"
    : darkHeader
      ? "bg-charcoal"
      : "bg-background";

  const headerText = darkMode
    ? "text-primary-foreground"
    : "text-foreground";

  const headerBorder = darkMode
    ? "border-primary-foreground/15"
    : "border-border";

  const iconButton =
    darkMode
      ? "text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
      : "text-foreground hover:bg-foreground/5 hover:text-foreground";

  return (
    <div className="min-h-screen bg-background">
      {/* =========================================================
          HEADER
      ========================================================= */}
      <header
        className={`
          ${headerPosition}
          inset-x-0
          top-0
          z-50
          h-20
          border-b
          ${headerBackground}
          ${headerBorder}
          ${headerText}
          transition-all
          duration-500
        `}
      >
        <div
          className="
            mx-auto
            grid
            h-full
            max-w-[1600px]
            grid-cols-[1fr_auto]
            items-center
            gap-4
            px-5
            lg:grid-cols-[190px_1fr_190px]
            lg:px-10
          "
        >
          {/* =====================================================
              LOGO
          ===================================================== */}
          <Link
            to="/"
            aria-label="CREST home"
            className="group flex w-fit items-center"
          >
            <img
              src={logoAsset.url}
              alt="CREST"
              className={`
                h-10
                w-auto
                max-w-32
                object-contain
                transition-all
                duration-500
                ${
                  darkMode
                    ? "brightness-0 invert"
                    : "brightness-100"
                }
              `}
            />

            <span
              className={`
                ml-3
                hidden
                h-px
                transition-all
                duration-500
                group-hover:w-12
                lg:block
                ${
                  darkMode
                    ? "w-8 bg-primary-foreground/30"
                    : "w-8 bg-foreground/20"
                }
              `}
            />
          </Link>

          {/* =====================================================
              DESKTOP NAVIGATION
          ===================================================== */}
          <nav
            className="
              hidden
              items-center
              justify-center
              gap-7
              lg:flex
            "
          >
            {nav.map(([label, to]) => (
              <Link
                key={`${label}-${to}`}
                to={to}
                className={`
                  group
                  relative
                  py-3
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  opacity-70
                  transition-opacity
                  duration-300
                  hover:opacity-100
                  ${headerText}
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
                      darkMode
                        ? "bg-primary-foreground"
                        : "bg-foreground"
                    }
                  `}
                />
              </Link>
            ))}
          </nav>

          {/* =====================================================
              HEADER ACTIONS
          ===================================================== */}
          <div className="flex items-center justify-end gap-1">
            {/* Search */}
            <Button
              asChild
              variant="ghost"
              size="icon"
              className={`
                h-10
                w-10
                rounded-none
                ${iconButton}
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

            {/* Desktop menu */}
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className={`
                hidden
                items-center
                gap-3
                px-3
                py-2
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.16em]
                transition-opacity
                duration-300
                hover:opacity-60
                lg:flex
                ${headerText}
              `}
            >
              <span>
                {open ? "Close" : "Menu"}
              </span>

              <span className="flex w-4 flex-col gap-[4px]">
                <span
                  className={`
                    block
                    h-px
                    w-full
                    transition-transform
                    duration-300
                    ${
                      open
                        ? "translate-y-[2.5px] rotate-45"
                        : ""
                    }
                    ${
                      darkMode
                        ? "bg-primary-foreground"
                        : "bg-foreground"
                    }
                  `}
                />

                <span
                  className={`
                    block
                    h-px
                    w-full
                    transition-transform
                    duration-300
                    ${
                      open
                        ? "-translate-y-[2.5px] -rotate-45"
                        : ""
                    }
                    ${
                      darkMode
                        ? "bg-primary-foreground"
                        : "bg-foreground"
                    }
                  `}
                />
              </span>
            </button>

            {/* Mobile menu */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={
                open ? "Close menu" : "Open menu"
              }
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              className={`
                h-10
                w-10
                rounded-none
                lg:hidden
                ${iconButton}
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
          </div>
        </div>

        {/* =======================================================
            MOBILE MENU
        ======================================================= */}
        {open && (
          <div
            className="
              absolute
              inset-x-0
              top-20
              min-h-[calc(100svh-5rem)]
              overflow-y-auto
              border-t
              border-primary-foreground/15
              bg-charcoal
              px-6
              py-10
              text-primary-foreground
              lg:hidden
            "
          >
            <div className="mb-12 flex items-center justify-between">
              <p className="text-[9px] uppercase tracking-[0.18em] text-primary-foreground/45">
                Navigate
              </p>

              <span className="text-[9px] uppercase tracking-[0.14em] text-primary-foreground/30">
                CREST
              </span>
            </div>

            <nav className="grid gap-5">
              {nav.map(([label, to], index) => (
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
                    text-primary-foreground
                    transition-opacity
                    duration-300
                    hover:opacity-60
                  "
                >
                  <span>{label}</span>

                  <span className="flex items-center gap-3 font-sans text-[9px] text-primary-foreground/35">
                    {"0" + (index + 1)}
                    <ArrowUpRight
                      size={13}
                      strokeWidth={1.5}
                    />
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

      {/* =========================================================
          PAGE CONTENT
      ========================================================= */}
      {children}

      {/* =========================================================
          FOOTER
      ========================================================= */}
      <footer className="border-t bg-background px-5 py-12 lg:px-10">
        <div
          className="
            mx-auto
            grid
            max-w-[1600px]
            gap-10
            lg:grid-cols-[1fr_auto_1fr]
            lg:items-center
          "
        >
          <Link to="/" aria-label="CREST home">
            <img
              src={logoAsset.url}
              alt="CREST"
              className="
                h-10
                w-auto
                max-w-28
                object-contain
              "
            />
          </Link>

          <nav
            className="
              flex
              flex-wrap
              gap-x-6
              gap-y-3
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.14em]
            "
          >
            {nav.map(([label, to]) => (
              <Link
                key={`${label}-footer`}
                to={to}
                className="
                  transition-opacity
                  duration-300
                  hover:opacity-50
                "
              >
                {label}
              </Link>
            ))}
          </nav>

          <div
            className="
              flex
              flex-wrap
              gap-5
              text-[9px]
              uppercase
              tracking-[0.14em]
              lg:justify-end
            "
          >
            <span>Hyderabad · Pan-India</span>

            <Link
              to="/admin"
              className="
                transition-opacity
                duration-300
                hover:opacity-50
              "
            >
              Admin
            </Link>
          </div>
        </div>
      </footer>

      {/* =========================================================
          MOBILE BOTTOM ACTIONS
      ========================================================= */}
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
          className="
            rounded-none
            border-0
          "
        >
          <Link to="/contact">
            Enquire
          </Link>
        </Button>

        <Button
          asChild
          variant="inverse"
          className="
            rounded-none
            border-y-0
            border-r-0
          "
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
}

/* ===============================================================
   PAGE INTRO
=============================================================== */

export function PageIntro({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <section className="border-b bg-background px-5 pb-16 pt-32 lg:px-10 lg:pb-24 lg:pt-40">
      <div
        className="
          mx-auto
          grid
          max-w-[1600px]
          gap-8
          lg:grid-cols-[1.3fr_.7fr]
          lg:items-end
        "
      >
        <div>
          <div className="mb-6 flex items-center gap-3">
            <span className="text-[9px] font-semibold uppercase tracking-[0.18em]">
              {eyebrow}
            </span>

            <span className="h-px w-12 bg-border" />
          </div>

          <h1
            className="
              max-w-5xl
              font-serif
              text-6xl
              leading-[0.88]
              tracking-[-0.03em]
              sm:text-7xl
              lg:text-[7rem]
            "
          >
            {title}
          </h1>
        </div>

        <p
          className="
            max-w-md
            text-xs
            leading-6
            text-muted-foreground
            lg:pb-2
          "
        >
          {copy}
        </p>
      </div>
    </section>
  );
}
