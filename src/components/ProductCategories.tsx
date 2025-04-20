
import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { productCategories } from '@/data/productData';

const ProductCategories = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();
  
  useEffect(() => {
    if (inView) {
      setIsVisible(true);
      controls.start("visible");
    }
  }, [controls, inView]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };
  
  return (
    <section id="categories" className="py-24 relative overflow-hidden bg-secondary/50">
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{
             backgroundImage: "url('https://www.transparenttextures.com/patterns/food.png')",
             backgroundRepeat: "repeat"
           }}></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">فئات المنتجات</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            اكتشف مجموعتنا المتنوعة من المنتجات الطازجة عالية الجودة. من اللحوم الطازجة إلى الوجبات السريعة الشهية.
          </p>
        </div>
        
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {productCategories.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <Link to={`/category/${category.id}`} className="block h-full">
                <Card className="category-card h-full overflow-hidden hover:border-primary/30 border-transparent border-2 transition-colors duration-300">
                  <div 
                    className="h-48 overflow-hidden relative"
                    style={{
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${category.backgroundImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 right-0 p-4 text-white">
                      <div className="font-bold text-3xl mb-1">{category.icon}</div>
                      <h3 className="text-2xl font-bold">{category.name}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-foreground/80">{category.description}</p>
                    <div className="mt-6 flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{category.products.length} منتج</span>
                      <span className="text-primary font-medium hover:underline">عرض المنتجات</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductCategories;
