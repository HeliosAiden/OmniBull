"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/lib/supabase";
// import DexWalletLogin from "@/utils/login/DexWalletLogin";
import MultiWalletLogin from "@/utils/login/MultiWalletLogin";
import { useTheme } from "next-themes";

export default function LoginPage() {
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace("/dashboard");
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) router.replace("/dashboard");
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const authAppearance = {
    theme: ThemeSupa,
    variables: {
      default: {
        colors:
          theme === "light"
            ? {
                brand: "#16C784",
                brandAccent: "#FDC500",
              }
            : {
                brand: "#16C784",
                brandAccent: "#22D69F",
              },
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-background-paper">
      {/* Branding */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-text-primary sm:text-4xl">
          OmniBull
        </h1>
        <p className="mt-2 text-sm text-text-secondary">
          Unified CEX + DEX analytics & journaling
        </p>
      </div>

      {/* Auth Card */}
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-background-card border border-stroke rounded-2xl shadow-xl p-6 sm:p-8 backdrop-blur-sm">
        <Auth
          supabaseClient={supabase}
          appearance={authAppearance}
          theme={theme === "light" ? "default" : "dark"}
          providers={["google", "github"]}
        />
        <MultiWalletLogin />
      </div>

      {/* Footer */}
      <footer className="mt-8 text-sm text-text-secondary">
        Built with <span className="text-pallete-primary">💚</span> by OmniBull
      </footer>
    </div>
  );
}
