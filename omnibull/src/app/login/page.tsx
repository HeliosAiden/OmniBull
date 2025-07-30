"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/lib/supabase";
import MultiWalletLogin from "@/utils/login/MultiWalletLogin";
import { useTheme } from "next-themes";

const tabs = [
  { id: "wallet", label: "Connect Wallet" },
  { id: "login", label: "Login" },
];


export default function LoginPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("traditional");

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
            ? { brand: "#16C784", brandAccent: "#FDC500" }
            : { brand: "#16C784", brandAccent: "#22D69F" },
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-background-paper">
      {/* Branding */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-text-primary sm:text-4xl">OmniBull</h1>
        <p className="mt-2 text-sm text-text-secondary">
          Unified CEX + DEX analytics & journaling
        </p>
      </div>

      {/* Auth Card with Tabs */}
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-background-card border border-stroke rounded-2xl shadow-xl p-6 sm:p-8 backdrop-blur-sm min-h-[600px]">
        {/* Tabs */}
        <div className="flex justify-between mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-4 text-sm font-medium border-b-2 transition-colors hover:cursor-pointer duration-300 ${
                activeTab === tab.id
                  ? "border-pallete-primary text-pallete-primary"
                  : "border-transparent text-text-secondary hover:text-text-primary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "login" && (
          <Auth
            supabaseClient={supabase}
            appearance={authAppearance}
            theme={theme === "light" ? "default" : "dark"}
            providers={["google", "github"]}
          />
        )}
        {activeTab === "wallet" && <MultiWalletLogin />}
      </div>
    </div>
  );
}
