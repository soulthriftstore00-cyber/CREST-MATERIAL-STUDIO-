import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { CrestShell } from "@/components/crest-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories, images, products } from "@/lib/crest-data";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      {
        title: "Material Library | CREST",
      },
      {
        name: "description",
        content:
          "Explore the CREST material library — veneers, laminates, plywood, fluted panels and louvers.",
      },
      {
        property: "og:title",
        content: "CREST Material Library",
      },
      {
        property: "og:description",
        content:
          "Explore premium architectural surfaces through material, texture and application.",
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

  component: Products,
});

const materialDescriptions: Record<string, string> = {
  Veneers: "Natural grain / warmth / depth",
  Laminates: "Colour / durability / precision",
  Plywood: "Structure / strength / honesty",
  "Fluted Panels": "Rhythm / shadow / dimension",
  Louvers: "Light / rhythm / architecture",
};

function Products() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [sort, setSort] = useState("Featured");
  const [railIndex, setRailIndex] = useState(0);

  const availableCategories = ["All", ...categories];

  /*
   * Slowly move the material rail.
   * Stops automatically when the user prefers reduced motion.
   */
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion || products.length < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setRailIndex((current) => {
        if (current >= products.length - 1) {
          return 0;
        }

        return current + 1;
      });
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();

    const result = products.filter((product) => {
      const matchesCategory =
        category === "All" || product.category === category;

      const searchableText = [
        product.name,
        product.code,
        product.colour,
        product.finish,
        product.category,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !search || searchableText.includes(search);

      return matchesCategory && matchesSearch;
    });

    if (sort === "Name A–Z") {
      return [...result].sort((a, b) =>
        a.name.localeCompare(b.name),
      );
    }

    if (sort === "Name Z–A") {
      return [...result].sort((a, b) =>
        b.name.localeCompare(a.name),
      );
    }

    return result;
  }, [query, category, sort]);

  const activeRailProduct =
    products[railIndex] ?? products[0];

  const hasFilters =
    category !== "All" || query.trim() !== "";

  function clearFilters() {
    setQuery("");
    setCategory("All");
  }

  function selectCategory(value: string) {
    setCategory(value);
    setFilterOpen(false);
  }

  function previousRail() {
    setRailIndex((current) =>
      current <= 0 ? products.length - 1 : current - 1,
    );
  }

  function nextRail() {
    setRailIndex((current) =>
      current >= products.length - 1 ? 0 : current + 1,
    );
  }

  return (
    <CrestShell>
      <main className="overflow-hidden">

        {/* =====================================================
            MATERIAL LIBRARY INTRO
        ===================================================== */}

        <section className="border-b bg-background">
          <div
            className="
              mx-auto
              grid
              max-w-[1600px]
              lg:grid-cols-[0.8fr_1.2fr]
            "
          >
            <div className="px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
              <div className="flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.18em]">
                <span>01</span>
                <span className="h-px w-10 bg-border" />
                <span>Material Library</span>
              </div>

              <h1
                className="
                  mt-8
                  max-w-3xl
                  font-serif
                  text-6xl
                  leading-[0.82]
                  tracking-[-0.04em]
                  sm:text-7xl
                  lg:text-[7.2rem]
                "
              >
                Surfaces
                <br />
                for spaces.
              </h1>

              <p className="mt-8 max-w-md text-sm leading-7 text-muted-foreground">
                Explore veneers, laminates, plywood, fluted
                panels and louvers through texture, colour,
                finish and application.
              </p>

              <div className="mt-10 flex flex-wrap gap-2">
                <a
                  href="#collection"
                  className="
                    inline-flex
                    h-11
                    items-center
                    gap-3
                    border
                    bg-foreground
                    px-5
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-background
                    transition-transform
                    duration-300
                    hover:-translate-y-0.5
                  "
                >
                  Explore collection
                  <ArrowDown size={13} />
                </a>

                <Link
                  to="/match"
                  className="
                    inline-flex
                    h-11
                    items-center
                    gap-3
                    border
                    px-5
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    transition-colors
                    hover:bg-muted
                  "
                >
                  Find your material
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            {/* INTRO IMAGE COMPOSITION */}

            <div className="relative min-h-[520px] overflow-hidden bg-charcoal lg:min-h-[650px]">
              <img
                src={images.hero}
                alt="CREST architectural material"
                width={1920}
                height={1280}
                fetchPriority="high"
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                  opacity-90
                  transition-transform
                  duration-[1800ms]
                  hover:scale-[1.025]
                "
              />

              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-charcoal/20" />

              <div className="absolute left-6 top-6 flex items-center gap-3 text-[9px] uppercase tracking-[0.16em] text-primary-foreground/70 lg:left-10 lg:top-10">
                <span className="h-px w-8 bg-primary-foreground/50" />
                <span>CREST / Material Archive</span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-primary-foreground lg:bottom-10 lg:left-10 lg:right-10">
                <div>
                  <p className="text-[8px] uppercase tracking-[0.16em] text-primary-foreground/50">
                    Material library
                  </p>

                  <p className="mt-2 max-w-sm font-serif text-3xl leading-none">
                    Texture becomes architecture.
                  </p>
                </div>

                <span className="hidden text-[8px] uppercase tracking-[0.14em] text-primary-foreground/45 sm:block">
                  Explore / 2026
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            CATEGORY STRIP
        ===================================================== */}

        <section className="border-b">
          <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
            <div className="flex items-center overflow-x-auto scrollbar-none">
              {categories.map((item, index) => {
                const active = category === item;

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setCategory(item);
                      document
                        .getElementById("collection")
                        ?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                    }}
                    className={`
                      group
                      flex
                      min-w-max
                      items-center
                      gap-4
                      border-r
                      px-5
                      py-5
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.14em]
                      transition-colors
                      first:border-l
                      lg:px-7
                      ${
                        active
                          ? "bg-foreground text-background"
                          : "hover:bg-muted"
                      }
                    `}
                  >
                    <span className="text-[8px] opacity-40">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span>{item}</span>

                    <span
                      className={`
                        h-px
                        w-5
                        transition-all
                        duration-300
                        group-hover:w-8
                        ${
                          active
                            ? "bg-background/60"
                            : "bg-border"
                        }
                      `}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================
            MOVING MATERIAL RAIL
        ===================================================== */}

        <section className="bg-charcoal text-primary-foreground">
          <div className="mx-auto max-w-[1600px]">

            <div className="flex items-end justify-between border-b border-primary-foreground/10 px-5 py-8 lg:px-10">
              <div>
                <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.18em] text-primary-foreground/45">
                  <span>02</span>
                  <span className="h-px w-10 bg-primary-foreground/20" />
                  <span>Materials in motion</span>
                </div>

                <h2 className="mt-4 font-serif text-4xl leading-none sm:text-5xl">
                  Move through the collection.
                </h2>
              </div>

              <div className="hidden items-center gap-2 sm:flex">
                <button
                  type="button"
                  onClick={previousRail}
                  aria-label="Previous material"
                  className="
                    grid
                    h-10
                    w-10
                    place-items-center
                    border
                    border-primary-foreground/20
                    transition-colors
                    hover:bg-primary-foreground
                    hover:text-charcoal
                  "
                >
                  <ChevronLeft size={15} />
                </button>

                <button
                  type="button"
                  onClick={nextRail}
                  aria-label="Next material"
                  className="
                    grid
                    h-10
                    w-10
                    place-items-center
                    border
                    border-primary-foreground/20
                    transition-colors
                    hover:bg-primary-foreground
                    hover:text-charcoal
                  "
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>

            {/* MOVING CARDS */}

            <div className="relative overflow-hidden py-5">
              <div
                className="
                  flex
                  gap-3
                  transition-transform
                  duration-[1200ms]
                  ease-[cubic-bezier(.22,1,.36,1)]
                "
                style={{
                  transform: `translateX(calc(-${railIndex} * min(67vw, 470px)))`,
                }}
              >
                {products.map((product, index) => (
                  <Link
                    key={product.slug}
                    to="/products/$slug"
                    params={{ slug: product.slug }}
                    className="
                      group
                      relative
                      block
                      min-w-[67vw]
                      sm:min-w-[420px]
                      lg:min-w-[470px]
                    "
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        width={1400}
                        height={1050}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-[1200ms]
                          ease-out
                          group-hover:scale-105
                        "
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />

                      <span className="absolute left-5 top-5 text-[8px] uppercase tracking-[0.14em] text-primary-foreground/70">
                        {String(index + 1).padStart(2, "0")} /{" "}
                        {String(products.length).padStart(2, "0")}
                      </span>

                      <span
                        className="
                          absolute
                          bottom-5
                          right-5
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          border
                          border-primary-foreground/40
                          text-primary-foreground
                          opacity-0
                          transition-all
                          duration-500
                          group-hover:opacity-100
                        "
                      >
                        <ArrowRight size={14} />
                      </span>

                      <div className="absolute bottom-5 left-5 right-16 text-primary-foreground">
                        <p className="text-[8px] uppercase tracking-[0.14em] text-primary-foreground/50">
                          {product.category}
                        </p>

                        <p className="mt-2 font-serif text-3xl leading-none">
                          {product.name}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between py-3">
                      <p className="text-[8px] uppercase tracking-[0.12em] text-primary-foreground/45">
                        {product.code} · {product.finish}
                      </p>

                      <p className="text-[8px] uppercase tracking-[0.12em] text-primary-foreground/45">
                        Explore
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* ACTIVE MATERIAL INDICATOR */}

            <div className="flex items-center justify-between border-t border-primary-foreground/10 px-5 py-5 lg:px-10">
              <div className="flex items-center gap-2">
                {products.map((product, index) => (
                  <button
                    key={product.slug}
                    type="button"
                    onClick={() => setRailIndex(index)}
                    aria-label={`Show ${product.name}`}
                    className={`
                      h-px
                      transition-all
                      duration-500
                      ${
                        railIndex === index
                          ? "w-10 bg-primary-foreground"
                          : "w-4 bg-primary-foreground/20"
                      }
                    `}
                  />
                ))}
              </div>

              <p className="text-[8px] uppercase tracking-[0.14em] text-primary-foreground/40">
                {activeRailProduct?.category ?? "Materials"}
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            COLLECTION CONTROLS
        ===================================================== */}

        <section
          id="collection"
          className="scroll-mt-20 px-5 pb-20 pt-20 lg:px-10 lg:pb-28 lg:pt-28"
        >
          <div className="mx-auto max-w-[1600px]">

            <div className="grid gap-8 lg:grid-cols-[0.55fr_1.45fr]">
              <div>
                <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.18em]">
                  <span>03</span>
                  <span className="h-px w-10 bg-border" />
                  <span>Collection</span>
                </div>

                <h2 className="mt-6 max-w-md font-serif text-5xl leading-[0.88] sm:text-6xl">
                  Find your
                  <br />
                  material.
                </h2>

                <p className="mt-6 max-w-sm text-xs leading-6 text-muted-foreground">
                  Search the full CREST collection by material,
                  tone, finish or product code.
                </p>
              </div>

              <div>
                {/* SEARCH */}

                <label className="flex items-center gap-3 border-b pb-4">
                  <Search
                    size={17}
                    strokeWidth={1.5}
                    className="shrink-0 text-muted-foreground"
                  />

                  <span className="sr-only">
                    Search products
                  </span>

                  <Input
                    value={query}
                    onChange={(event) =>
                      setQuery(event.target.value)
                    }
                    placeholder="Search materials, colours, finishes, codes…"
                    className="
                      h-10
                      border-0
                      bg-transparent
                      px-0
                      text-sm
                      shadow-none
                      focus-visible:ring-0
                    "
                  />

                  {query ? (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      aria-label="Clear search"
                      className="
                        grid
                        h-8
                        w-8
                        shrink-0
                        place-items-center
                        rounded-full
                        text-muted-foreground
                        transition-colors
                        hover:bg-muted
                        hover:text-foreground
                      "
                    >
                      <X size={14} />
                    </button>
                  ) : null}
                </label>

                {/* CATEGORY CHIPS */}

                <div className="mt-5 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {availableCategories.map((item) => {
                    const active = category === item;

                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setCategory(item)}
                        className={`
                          shrink-0
                          rounded-full
                          border
                          px-4
                          py-2
                          text-[9px]
                          font-semibold
                          uppercase
                          tracking-[0.1em]
                          transition-all
                          duration-300
                          ${
                            active
                              ? "border-foreground bg-foreground text-background"
                              : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                          }
                        `}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>

                {/* DESKTOP ACTIONS */}

                <div className="mt-5 hidden items-center gap-2 lg:flex">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-10 gap-2 px-4"
                    onClick={() => setFilterOpen(true)}
                  >
                    <SlidersHorizontal size={14} />
                    Filter
                  </Button>

                  <div className="relative">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-10 gap-2 px-4"
                      onClick={() =>
                        setSortOpen((open) => !open)
                      }
                    >
                      Sort
                      <ChevronDown
                        size={13}
                        className={`transition-transform ${
                          sortOpen ? "rotate-180" : ""
                        }`}
                      />
                    </Button>

                    {sortOpen ? (
                      <SortMenu
                        sort={sort}
                        setSort={setSort}
                        close={() => setSortOpen(false)}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            {/* MOBILE CONTROLS */}

            <div className="mt-8 grid grid-cols-2 border-y lg:hidden">
              <button
                type="button"
                onClick={() => setFilterOpen(true)}
                className="
                  flex
                  h-12
                  items-center
                  justify-center
                  gap-2
                  border-r
                  text-[9px]
                  uppercase
                  tracking-[0.14em]
                "
              >
                <Filter size={13} />
                Filter
              </button>

              <button
                type="button"
                onClick={() =>
                  setSortOpen((open) => !open)
                }
                className="
                  flex
                  h-12
                  items-center
                  justify-center
                  gap-2
                  text-[9px]
                  uppercase
                  tracking-[0.14em]
                "
              >
                Sort
                <ChevronDown
                  size={13}
                  className={`transition-transform ${
                    sortOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {/* MOBILE SORT */}

            {sortOpen ? (
              <div className="border-b bg-muted/30 p-4 lg:hidden">
                <SortMenu
                  sort={sort}
                  setSort={setSort}
                  close={() => setSortOpen(false)}
                  mobile
                />
              </div>
            ) : null}

            {/* RESULTS */}

            <div className="mt-8 flex min-h-10 flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <p className="mr-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {filtered.length}{" "}
                  {filtered.length === 1
                    ? "surface"
                    : "surfaces"}
                </p>

                {category !== "All" ? (
                  <button
                    type="button"
                    onClick={() => setCategory("All")}
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      px-3
                      py-1.5
                      text-[9px]
                      uppercase
                      tracking-[0.08em]
                    "
                  >
                    {category}
                    <X size={11} />
                  </button>
                ) : null}

                {query ? (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      px-3
                      py-1.5
                      text-[9px]
                      uppercase
                      tracking-[0.08em]
                    "
                  >
                    Search: {query}
                    <X size={11} />
                  </button>
                ) : null}

                {hasFilters ? (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="
                      ml-1
                      text-[9px]
                      uppercase
                      tracking-[0.1em]
                      text-muted-foreground
                      underline
                      underline-offset-4
                      transition-colors
                      hover:text-foreground
                    "
                  >
                    Clear all
                  </button>
                ) : null}
              </div>

              <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                {sort}
              </p>
            </div>

            {/* =================================================
                PRODUCT GRID
            ================================================= */}

            {filtered.length > 0 ? (
              <div
                className="
                  mt-8
                  grid
                  gap-x-5
                  gap-y-16
                  sm:grid-cols-2
                  lg:grid-cols-3
                "
              >
                {filtered.map((product, index) => (
                  <ProductCardEnhanced
                    key={product.slug}
                    product={product}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <EmptyState clearFilters={clearFilters} />
            )}
          </div>
        </section>

        {/* =====================================================
            MATERIAL STATEMENT
        ===================================================== */}

        <section className="border-y bg-muted/25">
          <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[0.65fr_1.35fr]">

            <div className="px-5 py-20 lg:px-10 lg:py-28">
              <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.18em]">
                <span>04</span>
                <span className="h-px w-10 bg-border" />
                <span>The CREST approach</span>
              </div>

              <h2 className="mt-8 max-w-lg font-serif text-5xl leading-[0.86] sm:text-6xl">
                Material is
                <br />
                part of the
                <br />
                architecture.
              </h2>
            </div>

            <div className="grid border-t lg:border-l lg:border-t-0">
              <Statement
                number="01"
                title="Texture"
                text="Surfaces are selected for the way they reveal grain, depth, shadow and touch."
              />

              <Statement
                number="02"
                title="Tone"
                text="Natural and considered colours create a material language that lasts beyond trends."
              />

              <Statement
                number="03"
                title="Application"
                text="Every surface is considered in relation to furniture, walls, light and architecture."
              />
            </div>
          </div>
        </section>

        {/* =====================================================
            FINAL CTA
        ===================================================== */}

        <section className="relative overflow-hidden bg-charcoal px-5 py-20 text-primary-foreground lg:px-10 lg:py-28">
          <img
            src={images.application}
            alt=""
            loading="lazy"
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              opacity-20
              transition-transform
              duration-[1600ms]
              hover:scale-[1.025]
            "
          />

          <div className="absolute inset-0 bg-charcoal/50" />

          <div className="relative mx-auto grid max-w-[1600px] gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="mb-5 text-[9px] uppercase tracking-[0.18em] text-primary-foreground/45">
                Need help choosing?
              </p>

              <h2 className="max-w-5xl font-serif text-6xl leading-[0.82] tracking-[-0.035em] sm:text-7xl lg:text-8xl">
                Find the surface
                <br />
                for your space.
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button asChild className="h-12 rounded-none">
                <Link to="/match">
                  Match a material
                  <ArrowRight size={15} />
                </Link>
              </Button>

              <Button
                asChild
                variant="inverse"
                className="h-12 rounded-none"
              >
                <Link to="/contact">
                  Contact CREST
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================
          FILTER PANEL
      ===================================================== */}

      {filterOpen ? (
        <FilterPanel
          category={category}
          categories={availableCategories}
          onSelectCategory={selectCategory}
          onClose={() => setFilterOpen(false)}
          onClear={clearFilters}
        />
      ) : null}
    </CrestShell>
  );
}

/* =========================================================
   ENHANCED PRODUCT CARD
========================================================= */

function ProductCardEnhanced({
  product,
  index,
}: {
  product: (typeof products)[number];
  index: number;
}) {
  return (
    <Link
      to="/products/$slug"
      params={{ slug: product.slug }}
      className="group block"
    >
      <article>

        {/* IMAGE */}

        <div className="relative aspect-[4/3] overflow-hidden bg-muted">

          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={1400}
            height={1050}
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-[1100ms]
              ease-out
              group-hover:scale-[1.045]
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-charcoal/60
              via-transparent
              to-transparent
              opacity-70
            "
          />

          {/* NUMBER */}

          <span className="absolute left-4 top-4 text-[8px] uppercase tracking-[0.14em] text-primary-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* CATEGORY */}

          <span className="absolute right-4 top-4 text-[8px] uppercase tracking-[0.12em] text-primary-foreground/70">
            {product.category}
          </span>

          {/* ARROW */}

          <span
            className="
              absolute
              bottom-4
              right-4
              flex
              h-10
              w-10
              items-center
              justify-center
              border
              border-primary-foreground/50
              bg-charcoal/10
              text-primary-foreground
              opacity-0
              backdrop-blur-sm
              transition-all
              duration-500
              group-hover:opacity-100
            "
          >
            <ArrowRight
              size={14}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-0.5
              "
            />
          </span>

          {/* MOBILE / HOVER LABEL */}

          <div
            className="
              absolute
              bottom-4
              left-4
              max-w-[70%]
              text-primary-foreground
            "
          >
            <p className="text-[8px] uppercase tracking-[0.13em] text-primary-foreground/55">
              {product.code}
            </p>

            <p className="mt-1 font-serif text-2xl leading-none">
              {product.name}
            </p>
          </div>
        </div>

        {/* INFO */}

        <div className="border-b py-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.1em]">
                {product.name}
              </h3>

              <p className="mt-2 text-[8px] uppercase tracking-[0.11em] text-muted-foreground">
                {product.category} · {product.finish}
              </p>
            </div>

            <span className="mt-1 text-[8px] uppercase tracking-[0.12em] text-muted-foreground transition-transform duration-300 group-hover:translate-x-1">
              View
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between text-[8px] uppercase tracking-[0.1em] text-muted-foreground">
            <span>{product.colour}</span>
            <span>{product.thickness}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

/* =========================================================
   SORT MENU
========================================================= */

function SortMenu({
  sort,
  setSort,
  close,
  mobile = false,
}: {
  sort: string;
  setSort: (value: string) => void;
  close: () => void;
  mobile?: boolean;
}) {
  const options = [
    "Featured",
    "Name A–Z",
    "Name Z–A",
  ];

  return (
    <div
      className={
        mobile
          ? "grid gap-1"
          : "absolute right-0 top-[calc(100%+8px)] z-50 w-48 border bg-background p-2 shadow-xl"
      }
    >
      {options.map((option) => {
        const active = sort === option;

        return (
          <button
            key={option}
            type="button"
            onClick={() => {
              setSort(option);
              close();
            }}
            className={`
              flex
              w-full
              items-center
              justify-between
              px-3
              py-3
              text-left
              text-xs
              transition-colors
              ${
                active
                  ? "bg-muted"
                  : "hover:bg-muted/60"
              }
            `}
          >
            <span>{option}</span>

            {active ? <Check size={14} /> : null}
          </button>
        );
      })}
    </div>
  );
}

/* =========================================================
   FILTER PANEL
========================================================= */

function FilterPanel({
  category,
  categories,
  onSelectCategory,
  onClose,
  onClear,
}: {
  category: string;
  categories: string[];
  onSelectCategory: (value: string) => void;
  onClose: () => void;
  onClear: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[100]">

      <button
        type="button"
        aria-label="Close filters"
        onClick={onClose}
        className="
          absolute
          inset-0
          bg-black/40
          backdrop-blur-[2px]
        "
      />

      <aside
        className="
          absolute
          bottom-0
          left-0
          right-0
          max-h-[88vh]
          overflow-y-auto
          bg-background
          shadow-2xl
          animate-in
          slide-in-from-bottom
          duration-300
          lg:bottom-auto
          lg:left-auto
          lg:top-0
          lg:h-full
          lg:max-h-none
          lg:w-[420px]
          lg:slide-in-from-right
        "
      >

        {/* HEADER */}

        <div
          className="
            sticky
            top-0
            z-10
            border-b
            bg-background/95
            px-5
            py-5
            backdrop-blur
          "
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                Material Library
              </p>

              <h2 className="mt-1 font-serif text-3xl">
                Filter materials
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close filters"
              className="
                grid
                h-10
                w-10
                place-items-center
                rounded-full
                border
                transition-colors
                hover:bg-muted
              "
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* CONTENT */}

        <div className="p-5">

          <div>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                Material category
              </p>

              {category !== "All" ? (
                <button
                  type="button"
                  onClick={onClear}
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.1em]
                    underline
                    underline-offset-4
                  "
                >
                  Clear
                </button>
              ) : null}
            </div>

            <div className="grid">
              {categories.map((item, index) => {
                const active = category === item;

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => onSelectCategory(item)}
                    className="
                      flex
                      min-h-14
                      items-center
                      justify-between
                      border-b
                      px-1
                      text-left
                      transition-colors
                      hover:bg-muted/50
                    "
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-[8px] text-muted-foreground">
                        {String(index).padStart(2, "0")}
                      </span>

                      <span className="text-sm">
                        {item}
                      </span>
                    </div>

                    <span
                      className={`
                        grid
                        h-5
                        w-5
                        place-items-center
                        rounded-full
                        border
                        ${
                          active
                            ? "border-foreground bg-foreground text-background"
                            : "border-border"
                        }
                      `}
                    >
                      {active ? <Check size={11} /> : null}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CATEGORY INFORMATION */}

          {category !== "All" && (
            <div className="mt-8 border-t pt-6">
              <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                About this material
              </p>

              <p className="mt-3 font-serif text-2xl">
                {category}
              </p>

              <p className="mt-3 text-xs leading-6 text-muted-foreground">
                {materialDescriptions[category] ??
                  "Considered surfaces for contemporary architecture and interiors."}
              </p>
            </div>
          )}
        </div>

        {/* FOOTER */}

        <div className="sticky bottom-0 border-t bg-background p-4">
          <Button
            type="button"
            className="h-12 w-full rounded-none"
            onClick={onClose}
          >
            View{" "}
            {category === "All"
              ? "all materials"
              : category}
          </Button>
        </div>
      </aside>
    </div>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({
  clearFilters,
}: {
  clearFilters: () => void;
}) {
  return (
    <div className="mt-8 grid min-h-[420px] place-items-center border-y text-center">
      <div className="max-w-md px-6">
        <p className="text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
          No surfaces found
        </p>

        <h2 className="mt-4 font-serif text-5xl leading-none">
          Nothing here yet.
        </h2>

        <p className="mt-5 text-sm leading-6 text-muted-foreground">
          Try another material, colour, finish or product
          code.
        </p>

        <Button
          type="button"
          variant="outline"
          className="mt-7 rounded-none"
          onClick={clearFilters}
        >
          Clear filters
        </Button>
      </div>
    </div>
  );
}

/* =========================================================
   EDITORIAL STATEMENT
========================================================= */

function Statement({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="grid gap-5 border-b p-7 sm:grid-cols-[80px_180px_1fr] sm:items-start lg:p-10">
      <span className="text-[8px] uppercase tracking-[0.14em] text-muted-foreground">
        {number}
      </span>

      <h3 className="font-serif text-3xl">
        {title}
      </h3>

      <p className="max-w-md text-xs leading-6 text-muted-foreground">
        {text}
      </p>
    </div>
  );
}
