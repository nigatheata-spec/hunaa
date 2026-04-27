import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TracksSection } from "@/components/TracksSection";
import { FamilySection } from "@/components/FamilySection";
import { AIAssistantSection } from "@/components/AIAssistantSection";
import { FeaturedContent } from "@/components/FeaturedContent";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <section id="tracks"><TracksSection /></section>
        <section id="family"><FamilySection /></section>
        <section id="ai"><AIAssistantSection /></section>
        <section id="content"><FeaturedContent /></section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
