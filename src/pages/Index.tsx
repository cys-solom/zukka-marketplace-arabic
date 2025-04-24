
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Address from '@/components/Address';
import ProductCategories from '@/components/ProductCategories';
import WhatsAppOrder from '@/components/WhatsAppOrder';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Address />
      <ProductCategories />
      <WhatsAppOrder />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
