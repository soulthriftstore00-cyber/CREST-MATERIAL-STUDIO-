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
  ["Projects", "/projects"],
  ["Match", "/match"],
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
    if (!overlayHeader) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 32);
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
    if (!open) return;

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

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  const darkMode = darkHeader || overlayHeader;

  const headerPosition = overlayHeader
    ? "fixed"
    : "relative";

  const headerBackground = overlayHeader
    ? scrolled
      ? "bg-charcoal/95 backdrop-blur-2xl"
      : "bg-charcoal/15 backdrop-blur-md"
    : darkHeader
      ? "bg-charcoal"
      : "bg-background/95 backdrop-blur-xl";

  const headerText = darkMode
    ? "text-primary-foreground"
    : "text-foreground";

  const headerBorder = darkMode
    ? "border-primary-foreground/10"
    : "border-border/70";

  const iconButton = darkMode
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
            h-[84px]
            max-w-[1680px]
            grid-cols-[1fr_auto]
            items-center
            gap-5
            px-5
            sm:px-7
            lg:grid-cols-[260px_1fr_260px]
            lg:px-10
            xl:px-14
          "
        >
          {/* =====================================================
              LOGO
          ===================================================== */}

          <Link
            to="/"
            aria-label="CREST home"
            className="
              group
              flex
              w-fit
              items-center
              overflow-visible
            "
          >
            <div
              className="
                relative
                flex
                items-center
                overflow-visible
              "
            >
              <img
                src={logoAsset.url}
                alt="CREST"
                className={`
                  block
                  h-14
                  w-auto
                  max-w-[240px]
                  object-contain
                  object-left
                  transition-all
                  duration-500
                  ease-out
                  group-hover:scale-[1.025]
                  ${
                    darkMode
                      ? "brightness-0 invert"
                      : "brightness-100"
                  }
                `}
              />

              <span
                className={`
                  ml-4
                  hidden
                  h-px
                  transition-all
                  duration-500
                  ease-out
                  group-hover:w-14
                  lg:block
                  ${
                    darkMode
                      ? "w-7 bg-primary-foreground/25"
                      : "w-7 bg-foreground/20"
                  }
                `}
              />
            </div>
          </Link>

          {/* =====================================================
              DESKTOP NAVIGATION
          ===================================================== */}

          <nav
            aria-label="Primary navigation"
            className="
              hidden
              items-center
              justify-center
              gap-9
              lg:flex
              xl:gap-11
            "
          >
            {nav.map(([label, to], index) => (
              <Link
                key={`${label}-${to}`}
                to={to}
                className={`
                  group
                  relative
                  flex
                  items-center
                  gap-2
                  py-4
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.18em]
                  opacity-70
                  transition-all
                  duration-300
                  hover:opacity-100
                  ${headerText}
                `}
              >
                <span
                  className="
                    text-[7px]
                    tracking-normal
                    opacity-30
                    transition-opacity
                    duration-300
                    group-hover:opacity-60
                  "
                >
                  0{index + 1}
                </span>

                <span>{label}</span>

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
                    ease-out
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
                h-11
                w-11
                rounded-none
                transition-all
                duration-300
                ${iconButton}
              `}
            >
              <Link
                to="/products"
                aria-label="Search materials"
              >
                <Search
                  size={17}
                  strokeWidth={1.35}
                  className="text-current transition-transform duration-300 hover:scale-110"
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
                gap-4
                px-3
                py-3
                text-[10px]
                font-medium
                uppercase
                tracking-[0.18em]
                transition-all
                duration-300
                hover:opacity-60
                lg:flex
                ${headerText}
              `}
            >
              <span>
                {open ? "Close" : "Menu"}
              </span>

              <span className="flex w-5 flex-col gap-[5px]">
                <span
                  className={`
                    block
                    h-px
                    w-full
                    origin-center
                    transition-all
                    duration-300
                    ${
                      open
                        ? "translate-y-[3px] rotate-45"
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
                    origin-center
                    transition-all
                    duration-300
                    ${
                      open
                        ? "-translate-y-[3px] -rotate-45"
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
                h-11
                w-11
                rounded-none
                lg:hidden
                ${iconButton}
              `}
            >
              {open ? (
                <X
                  size={22}
                  strokeWidth={1.35}
                  className="text-current"
                />
              ) : (
                <Menu
                  size={22}
                  strokeWidth={1.35}
                  className="text-current"
                />
              )}
            </Button>
          </div>
        </div>

        {/* =======================================================
            DESKTOP MENU
        ======================================================= */}

        {open && (
          <div
            className="
              absolute
              inset-x-0
              top-[84px]
              hidden
              border-t
              border-primary-foreground/10
              bg-charcoal
              text-primary-foreground
              shadow-2xl
              lg:block
            "
          >
            <div
              className="
                mx-auto
                grid
                max-w-[1680px]
                grid-cols-[1fr_2fr]
                gap-16
                px-10
                py-14
                xl:px-14
              "
            >
              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-primary-foreground/35">
                  CREST
                </p>

                <h2 className="mt-5 max-w-sm font-serif text-4xl leading-[0.95]">
                  Materials that shape spaces.
                </h2>

                <p className="mt-6 max-w-sm text-xs leading-6 text-primary-foreground/45">
                  Architectural surfaces selected for
                  proportion, texture and permanence.
                </p>
              </div>

              <nav className="grid grid-cols-2 gap-x-12">
                {nav.map(([label, to], index) => (
                  <Link
                    key={`menu-${label}`}
                    to={to}
                    onClick={() => setOpen(false)}
                    className="
                      group
                      flex
                      items-center
                      justify-between
                      border-b
                      border-primary-foreground/10
                      py-6
                      transition-opacity
                      duration-300
                      hover:opacity-60
                    "
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-[8px] tracking-[0.15em] text-primary-foreground/30">
                        0{index + 1}
                      </span>

                      <span className="font-serif text-2xl">
                        {label}
                      </span>
                    </div>

                    <ArrowUpRight
                      size={17}
                      strokeWidth={1.2}
                      className="
                        opacity-30
                        transition-all
                        duration-300
                        group-hover:-translate-y-1
                        group-hover:translate-x-1
                        group-hover:opacity-100
                      "
                    />
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* =======================================================
            MOBILE MENU
        ======================================================= */}

        {open && (
          <div
            className="
              absolute
              inset-x-0
              top-[84px]
              min-h-[calc(100svh-84px)]
              overflow-y-auto
              border-t
              border-primary-foreground/10
              bg-charcoal
              px-6
              py-10
              text-primary-foreground
              lg:hidden
            "
          >
            <div className="mb-12 flex items-center justify-between">
              <p className="text-[9px] uppercase tracking-[0.2em] text-primary-foreground/40">
                Navigate
              </p>

              <span className="text-[9px] uppercase tracking-[0.16em] text-primary-foreground/25">
                CREST / 01
              </span>
            </div>

            <nav className="grid">
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
                    border-primary-foreground/10
                    py-6
                    transition-opacity
                    duration-300
                    hover:opacity-60
                  "
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[8px] uppercase tracking-[0.15em] text-primary-foreground/30">
                      0{index + 1}
                    </span>

                    <span className="font-serif text-4xl leading-none">
                      {label}
                    </span>
                  </div>

                  <ArrowUpRight
                    size={18}
                    strokeWidth={1.2}
                    className="
                      text-primary-foreground/35
                      transition-all
                      duration-300
                      group-hover:-translate-y-1
                      group-hover:translate-x-1
                      group-hover:text-primary-foreground
                    "
                  />
                </Link>
              ))}
            </nav>

            <div className="mt-16 border-t border-primary-foreground/10 pt-6">
              <p className="text-[9px] uppercase tracking-[0.18em] text-primary-foreground/35">
                Architectural surfaces
              </p>

              <p className="mt-3 max-w-xs font-serif text-xl leading-snug text-primary-foreground/70">
                Materials selected with restraint,
                character and intent.
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

      <footer className="border-t bg-background px-5 py-14 sm:px-7 lg:px-10 lg:py-16 xl:px-14">
        <div
          className="
            mx-auto
            max-w-[1680px]
          "
        >
          <div
            className="
              grid
              gap-12
              lg:grid-cols-[1fr_auto_1fr]
              lg:items-center
            "
          >
            {/* Footer logo */}

            <Link
              to="/"
              aria-label="CREST home"
              className="
                group
                flex
                w-fit
                items-center
              "
            >
              <img
                src={logoAsset.url}
                alt="CREST"
                className="
                  block
                  h-12
                  w-auto
                  max-w-[210px]
                  object-contain
                  object-left
                  transition-transform
                  duration-500
                  group-hover:scale-[1.02]
                "
              />
            </Link>

            {/* Footer navigation */}

            <nav
              aria-label="Footer navigation"
              className="
                flex
                flex-wrap
                gap-x-7
                gap-y-3
                text-[9px]
                font-medium
                uppercase
                tracking-[0.17em]
              "
            >
              {nav.map(([label, to]) => (
                <Link
                  key={`${label}-footer`}
                  to={to}
                  className="
                    transition-opacity
                    duration-300
                    hover:opacity-45
                  "
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Location / admin */}

            <div
              className="
                flex
                flex-wrap
                gap-x-6
                gap-y-3
                text-[9px]
                uppercase
                tracking-[0.15em]
                text-muted-foreground
                lg:justify-end
              "
            >
              <span>Hyderabad · Pan-India</span>

              <Link
                to="/admin"
                className="
                  text-foreground
                  transition-opacity
                  duration-300
                  hover:opacity-50
                "
              >
                Admin
              </Link>
            </div>
          </div>

          {/* Footer lower line */}

          <div
            className="
              mt-12
              flex
              flex-col
              gap-3
              border-t
              pt-5
              text-[8px]
              uppercase
              tracking-[0.16em]
              text-muted-foreground/60
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <span>
              © {new Date().getFullYear()} CREST
            </span>

            <span>
              Architectural materials & surfaces
            </span>
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
          border-primary-foreground/15
          bg-charcoal
          text-primary-foreground
          shadow-2xl
          lg:hidden
        "
      >
        <Button
          asChild
          variant="inverse"
          className="
            h-14
            rounded-none
            border-0
            text-[9px]
            font-medium
            uppercase
            tracking-[0.16em]
          "
        >
          <Link to="/contact">
            Enquire
            <ArrowUpRight
              size={13}
              strokeWidth={1.3}
            />
          </Link>
        </Button>

        <Button
          asChild
          variant="inverse"
          className="
            h-14
            rounded-none
            border-y-0
            border-r-0
            text-[9px]
            font-medium
            uppercase
            tracking-[0.16em]
          "
        >
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
            <ArrowUpRight
              size={13}
              strokeWidth={1.3}
            />
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
    <section className="border-b bg-background px-5 pb-16 pt-32 sm:px-7 lg:px-10 lg:pb-28 lg:pt-40 xl:px-14">
      <div
        className="
          mx-auto
          grid
          max-w-[1680px]
          gap-10
          lg:grid-cols-[1.35fr_.65fr]
          lg:items-end
          lg:gap-16
        "
      >
        <div>
          <div className="mb-7 flex items-center gap-4">
            <span className="text-[9px] font-medium uppercase tracking-[0.2em]">
              {eyebrow}
            </span>

            <span className="h-px w-14 bg-border" />
          </div>

          <h1
            className="
              max-w-6xl
              font-serif
              text-[3.6rem]
              leading-[0.86]
              tracking-[-0.04em]
              sm:text-7xl
              lg:text-[7.5rem]
              xl:text-[8.5rem]
            "
          >
            {title}
          </h1>
        </div>

        <div className="lg:pb-3">
          <span className="mb-5 block text-[8px] uppercase tracking-[0.18em] text-muted-foreground/60">
            CREST / Studio
          </span>

          <p
            className="
              max-w-md
              text-xs
              leading-7
              text-muted-foreground
            "
          >
            {copy}
          </p>
        </div>
      </div>
    </section>
  );
}
