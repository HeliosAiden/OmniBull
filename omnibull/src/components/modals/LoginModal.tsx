"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useTheme } from "next-themes";
import { supabase } from "@/lib/supabase";
import { X } from "lucide-react";
import IconButton from "@/components/IconButton";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { theme } = useTheme();

  const authAppearance = {
    theme: ThemeSupa,
    classNames: {
      container: "rounded-xl shadow-lg p-4 bg-white dark:bg-zinc-900",
      button: "bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg w-full transition",
      anchor: "text-emerald-600 hover:underline text-sm",
      label: "text-gray-700 dark:text-gray-300 text-sm font-medium",
      input: "border border-gray-300 dark:border-zinc-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white dark:bg-zinc-800",
      loader: "text-emerald-500",
      message: "text-sm text-red-500",
    },
    variables: {
      default: {
        colors: {
          brand: "#16C784",
          brandAccent: "#22D69F",
          inputText: "#ffffffff",
          inputLabelText: "#6B7280",
        },
      },
    },
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-xl relative space-y-4 shadow-xl transition-all">
                <IconButton
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition hover:text-red-500"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </IconButton>

                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4"
                >
                  Sign in to OmniBull
                </Dialog.Title>

                <Auth
                  supabaseClient={supabase}
                  appearance={authAppearance}
                  theme={theme === "light" ? "default" : "dark"}
                  providers={["google"]}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
