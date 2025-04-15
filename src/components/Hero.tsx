
import { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-meat-light/80 to-spice-light/80 -z-10"></div>
      <div 
        className="absolute inset-0 -z-20"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.9)"
        }}
      ></div>
      
      <div className="container mx-auto px-4">
        <div className={`max-w-3xl transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">
            <span className="text-meat-dark">لحوم وبهارات</span> طازجة ومميزة
          </h1>
          <p className="text-lg md:text-xl text-foreground/90 mb-8">
            نقدم أجود أنواع اللحوم والبهارات الطازجة وأدوات المطبخ العالية الجودة بأسعار مناسبة. 
            تذوق الفرق مع منتجات مطبخ زكا المختارة بعناية.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={() => document.getElementById('products')?.scrollIntoView({behavior: 'smooth'})}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg text-lg"
            >
              تصفح المنتجات
            </Button>
            <Button 
              onClick={() => document.getElementById('whatsapp-order')?.scrollIntoView({behavior: 'smooth'})}
              className="whatsapp-btn px-8 py-3 text-lg"
            >
              اطلب الآن
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown 
          className="text-primary/70" 
          size={32}
          onClick={() => document.getElementById('address')?.scrollIntoView({behavior: 'smooth'})}
        />
      </div>
    </div>
  );
};

export default Hero;
