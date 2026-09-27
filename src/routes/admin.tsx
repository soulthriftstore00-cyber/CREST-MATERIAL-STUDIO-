import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoAsset from "@/assets/crest-logo.jpeg.asset.json";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      {
        title: "CREST Management Sign In",
      },
      {
        name: "description",
        content: "Secure CREST catalogue management.",
      },
      {
        property: "og:title",
        content: "CREST Management",
      },
      {
        property: "og:description",
        content: "Secure sign in.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary",
      },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const formData = new FormData(event.currentTarget);

      const email = String(formData.get("email") ?? "").trim();
      const password = String(formData.get("password") ?? "");

      if (!email || !password) {
        setError("Please enter your email and password.");
        return;
      }

      if (mode === "signin") {
        const result = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (result.error) {
          setError(result.error.message);
          return;
        }

        if (result.data.session) {
          navigate({ to: "/manage" });
        }

        return;
      }

      const result = await supabase.auth.signUp({
        email,
        password,
      });

      if (result.error) {
        setError(result.error.message);
        return;
      }

      if (result.data.session) {
        navigate({ to: "/manage" });
      } else {
        setError(
          "Account created. Please check your email to confirm your account.",
        );
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function signInWithGoogle() {
    setError("");
    setLoading(true);

    try {
      sessionStorage.setItem("crest_auth_next", "/manage");

      const result = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (result.error) {
        setError(result.error.message);
      }
    } catch (err) {
      console.error(err);
      setError("Unable to continue with Google.");
    } finally {
      setLoading(false);
    }
  }

  function toggleMode() {
    setError("");
    setMode((current) =>
      current === "signin" ? "signup" : "signin",
    );
  }

  return (
    <main className="grid min-h-screen place-items-center bg-charcoal px-5 py-12 text-primary-foreground">
      <div className="w-full max-w-md">
        <img
          src={logoAsset.url}
          alt="CREST"
          className="mb-16 h-16 w-auto"
        />

        <p className="text-[10px] uppercase tracking-[0.16em] text-primary-foreground/60">
          Management access
        </p>

        <h1 className="mt-4 text-5xl">
          {mode === "signin" ? "Welcome back." : "Create account."}
        </h1>

        <p className="mt-4 text-sm text-primary-foreground/60">
          Manage products, categories, images, pricing and stock.
        </p>

        <form onSubmit={submit} className="mt-10 grid gap-5">
          <Input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Email"
            className="h-12 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/40"
          />

          <Input
            name="password"
            type="password"
            minLength={8}
            required
            autoComplete={
              mode === "signin"
                ? "current-password"
                : "new-password"
            }
            placeholder="Password"
            className="h-12 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/40"
          />

          {error ? (
            <p className="text-xs leading-5 text-secondary">
              {error}
            </p>
          ) : null}

          <Button type="submit" disabled={loading}>
            {loading
              ? "Please wait..."
              : mode === "signin"
                ? "Sign in"
                : "Create account"}
          </Button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-primary-foreground/15" />

          <span className="text-[10px] uppercase tracking-[0.16em] text-primary-foreground/40">
            or
          </span>

          <div className="h-px flex-1 bg-primary-foreground/15" />
        </div>

        <Button
          type="button"
          variant="inverse"
          className="w-full"
          disabled={loading}
          onClick={signInWithGoogle}
        >
          Continue with Google
        </Button>

        <button
          type="button"
          className="mt-6 text-xs underline underline-offset-4"
          onClick={toggleMode}
        >
          {mode === "signin"
            ? "Create an account"
            : "Already have an account"}
        </button>
      </div>
    </main>
  );
}
