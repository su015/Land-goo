import About from "@/components/sections/About";
import Footer from "@/components/layout/Footer";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <About />
      </main>
      <Footer />
    </div>
  );
}
