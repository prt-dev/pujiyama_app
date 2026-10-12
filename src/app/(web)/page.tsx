import Hero from "@/components/web/Hero";
import AboutSection from "@/components/web/AboutSection";
import ProductCollection from "@/components/web/ProductCollection";
import Banner from "@/components/web/Banner";
import Testimonials from "@/components/web/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductCollection
        type="top-selling"
        title="Best Selling Dhoop Sticks"
        viewAllText="View All Fragrances →"
      />
      <AboutSection />
      <Banner />
      <ProductCollection
        type="pagdi"
        title="Pure Floral &amp; Rose Collection"
        viewAllText="View Floral Dhoop →"
      />
      <ProductCollection
        type="kundan"
        title="Luxury Parfum &amp; Sandalwood Dhoop"
        viewAllText="View Luxury Blends →"
      />
      <Testimonials />
    </>
  );
}
