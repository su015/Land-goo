import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
