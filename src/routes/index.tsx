import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MousePointer2,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { CrestShell } from "@/components/crest-shell";
import { images } from "@/lib/crest-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "CREST | Premium Architectural Surfaces Hyderabad",
      },
      {
        name: "description",
        content:
          "Discover premium veneers, laminates, plywood, fluted panels and louvers from CREST Hyderabad.",
      },
      {
        property: "og:title",
        content: "CREST | Surfaces that shape spaces",
      },
      {
        property: "og:description",
        content:
          "Premium architectural surface materials for considered interiors.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
  }),
  component: Home,
});

const heroStories = [
  {
    number: "01",
    category: "Natural Veneer",
    title: "Natural oak.",
    subtitle: "Timeless grain.",
    description:
      "A warm, tactile surface where natural grain becomes part of the architecture.",
    image: images.hero,
  },
  {
    number: "02",
    category: "Material Library",
    title: "Quiet surfaces.",
    subtitle: "Considered spaces.",
    description:
      "Refined materials selected for interiors that value texture, tone and restraint.",
    image: images.library,
  },
  {
    number: "03",
    category: "Architectural Surface",
    title: "Honest material.",
    subtitle: "Built to last.",
    description:
      "Surfaces that bring warmth, structure and depth to contemporary architecture.",
    image: images.application,
  },
  {
    number: "04",
    category: "Interior Detail",
    title: "Light meets texture.",
    subtitle: "Depth in every detail.",
    description:
      "Watch light move across grain, shadow and architectural rhythm.",
    image: images.showroom,
  },
  {
    number: "05",
    category: "Material Experience",
    title: "Made for spaces.",
    subtitle: "Designed to be felt.",
    description:
      "Explore a curated collection of surfaces for residential, hospitality and commercial interiors.",
    image: images.hero,
  },
];

function Home() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const story = heroStories[active] ?? heroStories[0];

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion || isPaused) {
      return;
    }

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % heroStories.length);
    }, 6500);

    return () => {
      window.clearInterval(timer);
    };
  }, [isPaused]);

  function previous() {
    setActive(
      (current) =>
        (current - 1 + heroStories.length) %
        heroStories.length,
    );
  }

  function next() {
    setActive(
      (current) => (current + 1) % heroStories.length,
    );
  }

  return (
    <CrestShell darkHeader overlayHeader>
      <main className="bg-background">
        {/* =====================================================
            PHASE 1 — PREMIUM HERO
        ===================================================== */}
        <section
          className="
            relative
            min-h-svh
            overflow-hidden
            bg-charcoal
            text-primary-foreground
          "
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* ---------------------------------------------------
              BACKGROUND MATERIAL IMAGES
          --------------------------------------------------- */}
          <div className="absolute inset-0">
            {heroStories.map((item, index) => (
              <div
                key={item.number}
                className={`
                  absolute
                  inset-0
                  transition-opacity
                  duration-[1200ms]
                  ease-out
                  ${
                    active === index
                      ? "opacity-100"
                      : "pointer-events-none opacity-0"
                  }
                `}
              >
                <img
                  src={item.image}
                  alt=""
                  width={1920}
                  height={1080}
                  fetchPriority={
                    index === 0 ? "high" : "auto"
                  }
                  className={`
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-[7000ms]
                    ease-out
                    ${
                      active === index
                        ? "scale-105"
                        : "scale-100"
                    }
                  `}
                />
              </div>
            ))}
          </div>

          {/* ---------------------------------------------------
              IMAGE TREATMENT
          --------------------------------------------------- */}
          <div className="absolute inset-0 bg-charcoal/35" />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-charcoal/85
              via-charcoal/45
              to-charcoal/10
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-charcoal/80
              via-transparent
              to-charcoal/20
            "
          />

          {/* subtle material grain */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-[0.06]
              mix-blend-overlay
            "
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")",
            }}
          />

          {/* ---------------------------------------------------
              MAIN HERO CONTENT
          --------------------------------------------------- */}
          <div
            className="
              relative
              mx-auto
              flex
              min-h-svh
              max-w-[1600px]
              flex-col
              justify-end
              px-5
              pb-8
              pt-32
              lg:px-10
              lg:pb-8
            "
          >
            {/* top editorial label */}
            <div className="absolute left-5 top-28 lg:left-10 lg:top-32">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-primary-foreground/50" />

                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">
                  Material Library
                </span>
              </div>
            </div>

            {/* large editorial title */}
            <div
              key={story.number}
              className="
                max-w-4xl
                animate-in
                fade-in
                slide-in-from-bottom-4
                duration-700
              "
            >
              <p className="mb-5 text-[9px] font-semibold uppercase tracking-[0.2em] text-primary-foreground/65">
                {story.category}
              </p>

              <h1
                className="
                  max-w-4xl
                  font-serif
                  text-[4.5rem]
                  leading-[0.78]
                  tracking-[-0.04em]
                  sm:text-[6.5rem]
                  lg:text-[8.5rem]
                  xl:text-[9.5rem]
                "
              >
                {story.title}
                <br />
                <span className="text-primary-foreground/55">
                  {story.subtitle}
                </span>
              </h1>

              <div className="mt-8 grid max-w-xl gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
                <p className="max-w-sm text-xs leading-6 text-primary-foreground/65">
                  {story.description}
                </p>

                <Button
                  asChild
                  className="w-fit"
                >
                  <Link to="/products">
                    Explore materials
                    <ArrowRight size={15} />
                  </Link>
                </Button>
              </div>
            </div>

            {/* -------------------------------------------------
                BOTTOM CONTROL BAR
            ------------------------------------------------- */}
            <div
              className="
                mt-16
                grid
                gap-6
                border-t
                border-primary-foreground/20
                pt-5
                sm:grid-cols-[1fr_auto]
                sm:items-end
              "
            >
              {/* material information */}
              <div>
                <div className="flex items-center gap-4">
                  <span className="text-[9px] uppercase tracking-[0.18em] text-primary-foreground/45">
                    Current material
                  </span>

                  <span className="h-px w-10 bg-primary-foreground/25" />

                  <span className="text-[9px] uppercase tracking-[0.14em]">
                    {story.category}
                  </span>
                </div>

                <p className="mt-2 font-serif text-xl">
                  {story.title.replace(".", "")}
                </p>
              </div>

              {/* controls */}
              <div className="flex items-center gap-4">
                {/* slide counter */}
                <div className="flex items-center gap-2 text-[9px] tabular-nums">
                  <span className="text-primary-foreground">
                    {story.number}
                  </span>

                  <span className="text-primary-foreground/30">
                    /
                  </span>

                  <span className="text-primary-foreground/40">
                    05
                  </span>
                </div>

                {/* progress */}
                <div className="relative h-px w-24 overflow-hidden bg-primary-foreground/20 sm:w-32">
                  <div
                    className="
                      absolute
                      inset-y-0
                      left-0
                      bg-primary-foreground
                      transition-all
                      duration-700
                    "
                    style={{
                      width: `${((active + 1) / heroStories.length) * 100}%`,
                    }}
                  />
                </div>

                {/* previous */}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={previous}
                  aria-label="Previous material"
                  className="
                    h-9
                    w-9
                    rounded-none
                    text-primary-foreground
                    hover:bg-primary-foreground/10
                    hover:text-primary-foreground
                  "
                >
                  <ChevronLeft
                    size={18}
                    strokeWidth={1.5}
                  />
                </Button>

                {/* next */}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={next}
                  aria-label="Next material"
                  className="
                    h-9
                    w-9
                    rounded-none
                    text-primary-foreground
                    hover:bg-primary-foreground/10
                    hover:text-primary-foreground
                  "
                >
                  <ChevronRight
                    size={18}
                    strokeWidth={1.5}
                  />
                </Button>
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------
              SCROLL INDICATOR
          --------------------------------------------------- */}
          <div
            className="
              absolute
              bottom-8
              left-1/2
              hidden
              -translate-x-1/2
              flex-col
              items-center
              gap-3
              lg:flex
            "
          >
            <span className="text-[8px] uppercase tracking-[0.2em] text-primary-foreground/40">
              Scroll
            </span>

            <ArrowDown
              size={14}
              strokeWidth={1}
              className="
                animate-bounce
                text-primary-foreground/60
              "
            />
          </div>

          {/* ---------------------------------------------------
              RIGHT VERTICAL LABEL
          --------------------------------------------------- */}
          <div
            className="
              absolute
              right-5
              top-1/2
              hidden
              -translate-y-1/2
              lg:block
            "
          >
            <div className="flex items-center gap-3 [writing-mode:vertical-rl]">
              <span className="text-[8px] uppercase tracking-[0.2em] text-primary-foreground/40">
                CREST · Hyderabad
              </span>

              <span className="h-12 w-px bg-primary-foreground/20" />
            </div>
          </div>
        </section>

        {/* =====================================================
            SMALL INTRO SECTION
            Phase 1 continuation
        ===================================================== */}
        <section className="border-b bg-background px-5 py-20 lg:px-10 lg:py-28">
          <div
            className="
              mx-auto
              grid
              max-w-[1600px]
              gap-10
              lg:grid-cols-[0.7fr_1.3fr]
              lg:items-end
            "
          >
            <div>
              <div className="mb-5 flex items-center gap-3 text-[9px] uppercase tracking-[0.18em]">
                <span>CREST</span>
                <span className="h-px w-10 bg-border" />
                <span>01</span>
              </div>

              <p className="font-serif text-3xl leading-[1] sm:text-4xl">
                Materials with
                <br />
                architectural intent.
              </p>
            </div>

            <div className="max-w-2xl">
              <p className="text-sm leading-7 text-muted-foreground">
                Veneers, laminates, plywood, fluted panels and
                louvers — curated for architects, designers and
                makers who believe the surface is part of the
                space.
              </p>

              <Link
                to="/products"
                className="
                  mt-8
                  inline-flex
                  items-center
                  gap-2
                  border-b
                  border-foreground/30
                  pb-2
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  transition-all
                  duration-300
                  hover:gap-4
                "
              >
                Enter the material library
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </CrestShell>
  );
}
