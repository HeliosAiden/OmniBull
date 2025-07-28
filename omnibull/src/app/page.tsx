// app/page.tsx hoặc pages/index.tsx nếu bạn dùng pages router
export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white font-sans">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20 space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          One dashboard. Every move. Your rules
        </h1>
        <p className="text-gray-400 max-w-xl text-lg">
          Clarity turns chaos into conviction
        </p>
        <div className="space-x-4">
          <button className="bg-white text-black font-medium px-6 py-3 rounded-full hover:bg-gray-200 transition">
            Get Started
          </button>
          <button className="border border-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition">
            Learn More
          </button>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="grid md:grid-cols-3 gap-6 px-6 py-16 bg-[#0A0A0A]">
        <FeatureCard
          title="Unified Portfolio"
          description="Connect CEX APIs and DEX wallets into one view."
        />
        <FeatureCard
          title="Privacy-First"
          description="Your data stays yours. End-to-end encrypted & local-first."
        />
        <FeatureCard
          title="Snapshot Sharing"
          description="Share only what you choose. No more, no less."
        />
      </section>
    </main>
  );
}

// Subcomponent
function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-[#111] rounded-2xl p-6 hover:shadow-xl transition">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
