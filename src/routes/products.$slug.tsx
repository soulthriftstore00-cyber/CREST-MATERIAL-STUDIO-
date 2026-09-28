import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Minus,
  Plus,
  ZoomIn,
} from "lucide-react";
import { useMemo, useState } from "react";

import { CrestShell } from "@/components/crest-shell";
import { Button } from "@/components/ui/button";
import { images, products } from "@/lib/crest-data";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = products.find(
      (item) => item.slug === params.slug,
    );

    if (!product) {
      throw notFound();
    }

    return product;
  },

  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${loaderData?.name ?? "Product"} | CREST`,
      },
      {
        name: "description",
        content: loaderData
          ? `${loaderData.name}, ${loaderData.finish} ${loaderData.category.toLowerCase()} by CREST.`
          : "CREST architectural surface.",
      },
      {
        property: "og:title",
        content: `${loaderData?.name ?? "Product"} | CREST`,
      },
      {
        property: "og:description",
        content:
          "Premium architectural surface material from CREST.",
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

  component: Detail,
});

function Detail() {
  const p = Route.useLoaderData();

  const [qty, setQty] = useState(100);
  const [zoom, setZoom] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const relatedProducts = useMemo(() => {
    return products
      .filter(
        (item) =>
          item.slug !== p.slug &&
          item.category === p.category,
      )
      .slice(0, 3);
  }, [p.slug, p.category]);

  const whatsappText = encodeURIComponent(
    `I'm interested in ${p.name} (${p.code}), quantity ${qty}`,
  );

  return (
    <CrestShell>
      <main className="overflow-hidden">

        {/* =====================================================
            PRODUCT HERO
        ===================================================== */}

        <section className="border-b">
          <div
            className="
              mx-auto
              grid
              max-w-[1600px]
              lg:min-h-[calc(100svh-5rem)]
              lg:grid-cols-[1.15fr_.85fr]
            "
          >

            {/* -------------------------------------------------
                IMAGE
            ------------------------------------------------- */}

            <div
              className="
                relative
                min-h-[62svh]
                overflow-hidden
                bg-muted
                lg:min-h-0
              "
            >
              <button
                type="button"
                onClick={() => setZoom(!zoom)}
                aria-label={
                  zoom
                    ? "Reset product image zoom"
                    : "Zoom product image"
                }
                className="group absolute inset-0 z-10 cursor-zoom-in"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  width={1920}
                  height={1280}
                  className={`
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-[1400ms]
                    ease-out
                    ${
                      zoom
                        ? "scale-125"
                        : "scale-100 group-hover:scale-[1.035]"
                    }
                  `}
                />

                {/* IMAGE OVERLAY */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-charcoal/45
                    via-transparent
                    to-transparent
                    opacity-80
                  "
                />

                {/* IMAGE NUMBER */}

                <div
                  className="
                    absolute
                    left-5
                    top-5
                    flex
                    items-center
                    gap-3
                    text-[9px]
                    uppercase
                    tracking-[0.16em]
                    text-primary-foreground
                    lg:left-8
                    lg:top-8
                  "
                >
                  <span className="h-px w-8 bg-primary-foreground/50" />
                  <span>Material / {p.category}</span>
                </div>

                {/* ZOOM */}

                <span
                  className="
                    absolute
                    bottom-5
                    right-5
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    border
                    border-primary-foreground/40
                    bg-charcoal/20
                    text-primary-foreground
                    backdrop-blur-sm
                    transition-all
                    duration-500
                    group-hover:bg-primary-foreground
                    group-hover:text-charcoal
                    lg:bottom-8
                    lg:right-8
                  "
                >
                  <ZoomIn size={17} />
                </span>

                {/* IMAGE CAPTION */}

                <div
                  className="
                    absolute
                    bottom-5
                    left-5
                    text-primary-foreground
                    lg:bottom-8
                    lg:left-8
                  "
                >
                  <p className="text-[8px] uppercase tracking-[0.16em] text-primary-foreground/55">
                    CREST Material Library
                  </p>

                  <p className="mt-2 font-serif text-2xl">
                    {p.name}
                  </p>
                </div>
              </button>
            </div>

            {/* -------------------------------------------------
                PRODUCT INFORMATION
            ------------------------------------------------- */}

            <div
              className="
                flex
                flex-col
                justify-between
                px-6
                py-12
                sm:px-8
                lg:px-14
                lg:py-16
                xl:px-20
              "
            >
              <div>

                {/* BREADCRUMB */}

                <div className="flex items-center justify-between">
                  <Link
                    to="/products"
                    className="
                      group
                      inline-flex
                      items-center
                      gap-2
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.15em]
                      text-muted-foreground
                      transition-colors
                      hover:text-foreground
                    "
                  >
                    <ArrowLeft
                      size={13}
                      className="
                        transition-transform
                        duration-300
                        group-hover:-translate-x-1
                      "
                    />

                    All materials
                  </Link>

                  <span className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                    {p.code}
                  </span>
                </div>

                {/* TITLE */}

                <div
                  className="
                    mt-16
                    animate-in
                    fade-in
                    slide-in-from-bottom-4
                    duration-700
                    lg:mt-24
                  "
                >
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {p.category}
                  </p>

                  <h1
                    className="
                      mt-5
                      max-w-xl
                      font-serif
                      text-6xl
                      leading-[0.82]
                      tracking-[-0.035em]
                      sm:text-7xl
                      lg:text-[6.5rem]
                    "
                  >
                    {p.name}
                  </h1>

                  <p className="mt-7 max-w-md text-sm leading-7 text-muted-foreground">
                    A considered architectural surface with
                    quiet material depth, selected for crafted
                    residential, hospitality and commercial
                    interiors.
                  </p>
                </div>

                {/* SPECIFICATIONS */}

                <div className="mt-12 border-y">
                  <div className="grid grid-cols-2">
                    <Spec
                      label="Product code"
                      value={p.code}
                    />

                    <Spec
                      label="Finish"
                      value={p.finish}
                    />

                    <Spec
                      label="Colour"
                      value={p.colour}
                    />

                    <Spec
                      label="Thickness"
                      value={p.thickness}
                    />

                    <Spec
                      label="Sheet size"
                      value="8 × 4 ft"
                    />

                    <Spec
                      label="Availability"
                      value={p.stock}
                    />
                  </div>
                </div>

                {/* STOCK */}

                <div className="mt-7 flex items-center gap-3">
                  <span
                    className="
                      flex
                      h-6
                      w-6
                      items-center
                      justify-center
                      rounded-full
                      border
                    "
                  >
                    <Check size={12} />
                  </span>

                  <span className="text-[9px] font-semibold uppercase tracking-[0.14em]">
                    {p.stock}
                  </span>
                </div>
              </div>

              {/* -------------------------------------------------
                  QUANTITY + ACTIONS
              ------------------------------------------------- */}

              <div className="mt-12">

                <div className="flex flex-wrap items-center justify-between gap-5">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
                      Quantity
                    </p>

                    <div className="mt-3 flex h-11 border">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-full w-11 rounded-none"
                        onClick={() =>
                          setQty(Math.max(1, qty - 10))
                        }
                        aria-label="Decrease quantity"
                      >
                        <Minus size={15} />
                      </Button>

                      <span className="grid min-w-20 place-items-center border-x text-sm tabular-nums">
                        {qty}
                      </span>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-full w-11 rounded-none"
                        onClick={() => setQty(qty + 10)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={15} />
                      </Button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
                      Material
                    </p>

                    <p className="mt-2 font-serif text-xl">
                      {p.category}
                    </p>
                  </div>
                </div>

                {/* ACTIONS */}

                <div className="mt-6 grid gap-2 sm:grid-cols-2">
                  <Button
                    asChild
                    className="h-12 rounded-none"
                  >
                    <Link
                      to="/contact"
                      search={{
                        product: p.name,
                        quantity: qty,
                      }}
                    >
                      Request bulk quote
                      <ArrowRight size={15} />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="h-12 rounded-none"
                  >
                    <a
                      href={`https://wa.me/?text=${whatsappText}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      WhatsApp enquiry
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            MATERIAL STORY
        ===================================================== */}

        <section className="bg-charcoal text-primary-foreground">
          <div className="grid lg:grid-cols-[0.75fr_1.25fr]">

            <div className="flex flex-col justify-between px-6 py-20 lg:px-14 lg:py-28 xl:px-20">
              <div>
                <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.18em] text-primary-foreground/50">
                  <span>02</span>
                  <span className="h-px w-10 bg-primary-foreground/20" />
                  <span>View in space</span>
                </div>

                <h2
                  className="
                    mt-8
                    font-serif
                    text-6xl
                    leading-[0.82]
                    tracking-[-0.035em]
                    sm:text-7xl
                  "
                >
                  Material,
                  <br />
                  in context.
                </h2>

                <p className="mt-8 max-w-sm text-sm leading-7 text-primary-foreground/55">
                  Surfaces become meaningful when they meet
                  architecture, light, furniture and people.
                  Explore how this material translates into a
                  considered interior.
                </p>
              </div>

              <div className="mt-16">
                <p className="text-[8px] uppercase tracking-[0.16em] text-primary-foreground/35">
                  Material character
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    p.finish,
                    p.colour,
                    p.category,
                  ].map((item) => (
                    <span
                      key={item}
                      className="
                        border
                        border-primary-foreground/15
                        px-3
                        py-2
                        text-[8px]
                        uppercase
                        tracking-[0.12em]
                        text-primary-foreground/65
                      "
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative min-h-[520px] overflow-hidden lg:min-h-[720px]">
              <img
                src={images.application}
                alt={`${p.name} application`}
                loading="lazy"
                width={1920}
                height={1280}
                className="
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-[1600ms]
                  hover:scale-[1.025]
                "
              />

              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />

              <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between text-primary-foreground lg:bottom-10 lg:left-10 lg:right-10">
                <div>
                  <p className="text-[8px] uppercase tracking-[0.16em] text-primary-foreground/50">
                    Application
                  </p>

                  <p className="mt-2 font-serif text-2xl">
                    Designed for real spaces.
                  </p>
                </div>

                <span className="hidden text-[8px] uppercase tracking-[0.14em] text-primary-foreground/50 sm:block">
                  CREST / 02
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            DETAILS ACCORDION
        ===================================================== */}

        <section className="border-b">
          <div className="mx-auto max-w-[1200px] px-5 py-16 lg:px-10 lg:py-20">
            <button
              type="button"
              onClick={() => setDetailsOpen(!detailsOpen)}
              className="
                flex
                w-full
                items-center
                justify-between
                border-b
                pb-5
                text-left
              "
            >
              <div>
                <p className="text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                  Material information
                </p>

                <p className="mt-2 font-serif text-3xl">
                  Product details
                </p>
              </div>

              <ChevronDown
                size={18}
                className={`
                  transition-transform
                  duration-300
                  ${detailsOpen ? "rotate-180" : ""}
                `}
              />
            </button>

            <div
              className={`
                grid
                overflow-hidden
                transition-all
                duration-500
                ${
                  detailsOpen
                    ? "mt-8 max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0"
                }
              `}
            >
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <InfoBlock
                  title="Finish"
                  value={p.finish}
                />

                <InfoBlock
                  title="Colour"
                  value={p.colour}
                />

                <InfoBlock
                  title="Thickness"
                  value={p.thickness}
                />

                <InfoBlock
                  title="Category"
                  value={p.category}
                />

                <InfoBlock
                  title="Sheet size"
                  value="8 × 4 ft"
                />

                <InfoBlock
                  title="Availability"
                  value={p.stock}
                />
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            RELATED MATERIALS
        ===================================================== */}

        {relatedProducts.length > 0 && (
          <section className="px-5 py-20 lg:px-10 lg:py-28">
            <div className="mx-auto max-w-[1600px]">

              <div className="mb-10 flex items-end justify-between gap-6">
                <div>
                  <div className="mb-4 flex items-center gap-3 text-[9px] uppercase tracking-[0.18em]">
                    <span>04</span>
                    <span className="h-px w-10 bg-border" />
                    <span>More from this category</span>
                  </div>

                  <h2 className="font-serif text-5xl leading-[0.88] sm:text-6xl">
                    Explore
                    <br />
                    similar materials.
                  </h2>
                </div>

                <Link
                  to="/products"
                  className="
                    hidden
                    items-center
                    gap-2
                    border-b
                    pb-2
                    text-[9px]
                    uppercase
                    tracking-[0.15em]
                    sm:flex
                  "
                >
                  View all
                  <ArrowRight size={13} />
                </Link>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {relatedProducts.map((product, index) => (
                  <Link
                    key={product.slug}
                    to="/products/$slug"
                    params={{
                      slug: product.slug,
                    }}
                    className="group"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        width={1200}
                        height={900}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-[900ms]
                          group-hover:scale-105
                        "
                      />

                      <span
                        className="
                          absolute
                          left-4
                          top-4
                          text-[8px]
                          text-primary-foreground
                        "
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/65 via-transparent to-transparent opacity-80" />

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
                    </div>

                    <div className="border-b py-4">
                      <p className="text-[8px] uppercase tracking-[0.15em] text-muted-foreground">
                        {product.category} · {product.code}
                      </p>

                      <h3 className="mt-2 font-serif text-2xl">
                        {product.name}
                      </h3>

                      <p className="mt-2 text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                        {product.finish} · {product.thickness}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* =====================================================
            FINAL CTA
        ===================================================== */}

        <section className="bg-charcoal px-5 py-20 text-primary-foreground lg:px-10 lg:py-28">
          <div className="mx-auto grid max-w-[1600px] gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="mb-5 text-[9px] uppercase tracking-[0.18em] text-primary-foreground/45">
                Build with CREST
              </p>

              <h2
                className="
                  max-w-4xl
                  font-serif
                  text-6xl
                  leading-[0.82]
                  tracking-[-0.035em]
                  sm:text-7xl
                  lg:text-8xl
                "
              >
                Find the surface
                <br />
                for your space.
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button asChild className="h-12 rounded-none">
                <Link
                  to="/contact"
                  search={{
                    product: p.name,
                    quantity: qty,
                  }}
                >
                  Request a quote
                  <ArrowRight size={15} />
                </Link>
              </Button>

              <Button
                asChild
                variant="inverse"
                className="h-12 rounded-none"
              >
                <Link to="/products">
                  Explore collection
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </CrestShell>
  );
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function Spec({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border-b p-4 last:border-b-0 even:border-l lg:p-5">
      <dt className="mb-2 text-[8px] uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </dt>

      <dd className="text-xs leading-5">
        {value}
      </dd>
    </div>
  );
}

function InfoBlock({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-[8px] uppercase tracking-[0.15em] text-muted-foreground">
        {title}
      </p>

      <p className="mt-2 text-sm">
        {value}
      </p>
    </div>
  );
}
