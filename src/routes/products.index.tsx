import { createFileRoute } from "@tanstack/react-router";
import {
  Check,
  ChevronDown,
  Filter,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

import { CrestShell, PageIntro } from "@/components/crest-shell";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories, products } from "@/lib/crest-data";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      {
        title: "Products | CREST",
      },
      {
        name: "description",
        content:
          "Explore CREST veneers, laminates, plywood, fluted panels and louvers.",
      },
      {
        property: "og:title",
        content: "Explore the CREST collection",
      },
      {
        property: "og:description",
        content: "Premium architectural surface materials.",
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

function Products() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [sort, setSort] = useState("Featured");

  const availableCategories = ["All", ...categories];

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

  const hasFilters = category !== "All" || query.trim() !== "";

  function clearFilters() {
    setQuery("");
    setCategory("All");
  }

  function selectCategory(value: string) {
    setCategory(value);
    setFilterOpen(false);
  }

  return (
    <CrestShell>
      <PageIntro
        eyebrow="The collection"
        title="Explore the CREST collection."
        copy="Search by material, tone, finish or product code. Every surface is selected for architectural clarity and lasting performance."
      />

      <main className="mx-auto max-w-[1600px] px-5 pb-20 pt-8 lg:px-10 lg:pt-12">
        {/* SEARCH + DESKTOP CONTROLS */}
        <section className="border-y">
          <div className="flex flex-col gap-4 py-4 lg:flex-row lg:items-center">
            <label className="flex min-w-0 flex-1 items-center gap-3">
              <Search
                size={18}
                strokeWidth={1.5}
                className="shrink-0 text-muted-foreground"
              />

              <span className="sr-only">Search products</span>

              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search products, colours, finishes, textures, codes…"
                className="h-12 border-0 bg-transparent px-0 text-sm shadow-none focus-visible:ring-0"
              />

              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <X size={15} />
                </button>
              ) : null}
            </label>

            <div className="hidden items-center gap-2 lg:flex">
              <Button
                type="button"
                variant="outline"
                className="h-10 gap-2 px-4"
                onClick={() => setFilterOpen(true)}
              >
                <SlidersHorizontal size={15} />
                Filter
              </Button>

              <div className="relative">
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 gap-2 px-4"
                  onClick={() => setSortOpen((open) => !open)}
                >
                  Sort
                  <ChevronDown
                    size={14}
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

          {/* CATEGORY CHIPS */}
          <div className="border-t py-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {availableCategories.map((item) => {
                const active = category === item;

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    className={`shrink-0 rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.1em] transition-all duration-300 ${
                      active
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* MOBILE CONTROLS */}
        <div className="grid grid-cols-2 border-b lg:hidden">
          <button
            type="button"
            onClick={() => setFilterOpen(true)}
            className="flex h-12 items-center justify-center gap-2 border-r text-[10px] uppercase tracking-[0.14em]"
          >
            <Filter size={14} />
            Filter
          </button>

          <button
            type="button"
            onClick={() => setSortOpen((open) => !open)}
            className="flex h-12 items-center justify-center gap-2 text-[10px] uppercase tracking-[0.14em]"
          >
            Sort
            <ChevronDown
              size={14}
              className={`transition-transform ${
                sortOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* MOBILE SORT MENU */}
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

        {/* ACTIVE FILTERS + RESULT COUNT */}
        <div className="flex min-h-20 flex-wrap items-center justify-between gap-4 py-5">
          <div className="flex flex-wrap items-center gap-2">
            <p className="mr-2 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              {filtered.length}{" "}
              {filtered.length === 1 ? "surface" : "surfaces"}
            </p>

            {category !== "All" ? (
              <button
                type="button"
                onClick={() => setCategory("All")}
                className="flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.08em]"
              >
                {category}
                <X size={12} />
              </button>
            ) : null}

            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.08em]"
              >
                Search: {query}
                <X size={12} />
              </button>
            ) : null}

            {hasFilters ? (
              <button
                type="button"
                onClick={clearFilters}
                className="ml-1 text-[10px] uppercase tracking-[0.1em] text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
              >
                Clear all
              </button>
            ) : null}
          </div>

          <p className="hidden text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:block">
            {sort}
          </p>
        </div>

        {/* PRODUCTS */}
        {filtered.length > 0 ? (
          <div className="grid gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
              />
            ))}
          </div>
        ) : (
          <EmptyState clearFilters={clearFilters} />
        )}
      </main>

      {/* MOBILE / DESKTOP FILTER PANEL */}
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
            className={`flex w-full items-center justify-between px-3 py-3 text-left text-xs transition-colors ${
              active
                ? "bg-muted"
                : "hover:bg-muted/60"
            }`}
          >
            <span>{option}</span>
            {active ? <Check size={14} /> : null}
          </button>
        );
      })}
    </div>
  );
}

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
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
      />

      <aside className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto bg-background shadow-2xl animate-in slide-in-from-bottom duration-300 lg:bottom-auto lg:left-auto lg:top-0 lg:h-full lg:max-h-none lg:w-[420px] lg:slide-in-from-right">
        <div className="sticky top-0 z-10 border-b bg-background/95 px-5 py-4 backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Collection
              </p>

              <h2 className="mt-1 text-2xl">
                Filter products
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close filters"
              className="grid h-10 w-10 place-items-center rounded-full border transition-colors hover:bg-muted"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="p-5">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                Category
              </p>

              {category !== "All" ? (
                <button
                  type="button"
                  onClick={onClear}
                  className="text-[10px] uppercase tracking-[0.1em] underline underline-offset-4"
                >
                  Clear
                </button>
              ) : null}
            </div>

            <div className="grid gap-1">
              {categories.map((item) => {
                const active = category === item;

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => onSelectCategory(item)}
                    className="flex min-h-12 items-center justify-between border-b px-1 text-left text-sm transition-colors hover:bg-muted/50"
                  >
                    <span>{item}</span>

                    <span
                      className={`grid h-5 w-5 place-items-center rounded-full border ${
                        active
                          ? "border-foreground bg-foreground text-background"
                          : "border-border"
                      }`}
                    >
                      {active ? <Check size={12} /> : null}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 border-t pt-6">
            <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              More filters
            </p>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Finish, colour, availability and price filters can be connected here as your catalogue data expands.
            </p>
          </div>
        </div>

        <div className="sticky bottom-0 border-t bg-background p-4">
          <Button
            type="button"
            className="h-12 w-full"
            onClick={onClose}
          >
            View {category === "All" ? "all" : category}
          </Button>
        </div>
      </aside>
    </div>
  );
}

function EmptyState({
  clearFilters,
}: {
  clearFilters: () => void;
}) {
  return (
    <div className="grid min-h-[360px] place-items-center border-y text-center">
      <div className="max-w-md px-6">
        <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          No surfaces found
        </p>

        <h2 className="mt-4 text-4xl">
          Try another search.
        </h2>

        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          Adjust your search or remove the active filters to
          explore the full CREST collection.
        </p>

        <Button
          type="button"
          variant="outline"
          className="mt-7"
          onClick={clearFilters}
        >
          Clear filters
        </Button>
      </div>
    </div>
  );
}
