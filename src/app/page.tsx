import { BookSection } from "@/components/BookSection";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ProcessSection } from "@/components/ProcessSection";
import { CaseStudySection } from "@/components/CaseStudySection";
import { ServicesSection } from "@/components/ServicesSection";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <HeroSection />
        <ProcessSection />
        <ServicesSection />
        <CaseStudySection />
        <BookSection />
      </main>
      <SiteFooter />
    </>
  );
}
