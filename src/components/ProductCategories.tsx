
import { useState, useEffect } from 'react';
import { Beef, Utensils, ShoppingBag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';

const categories = [
  {
    id: 'meat',
    title: 'اللحوم',
    description: 'نقدم أجود أنواع اللحوم الطازجة المذبوحة على الطريقة الإسلامية، من لحوم الضأن والبقر بمختلف أنواعها وقطعياتها.',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=2070&auto=format&fit=crop',
    icon: Beef,
    color: 'bg-meat-light',
    accent: 'text-meat-dark',
    buttonBg: 'bg-meat-dark'
  },
  {
    id: 'spices',
    title: 'البهارات',
    description: 'مجموعة مختارة من أفخر أنواع البهارات الطازجة والمميزة، مطحونة ومعبأة بعناية لتحافظ على نكهتها ورائحتها.',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop',
    icon: ShoppingBag,
    color: 'bg-spice-light',
    accent: 'text-spice-dark',
    buttonBg: 'bg-spice-dark'
  },
  {
    id: 'tools',
    title: 'أدوات المطبخ',
    description: 'كل ما تحتاجه من أدوات وملحقات المطبخ عالية الجودة، من سكاكين وأواني وأدوات تقطيع وتقديم.',
    image: 'https://images.unsplash.com/photo-1545015451-f05567aa6bcc?q=80&w=2069&auto=format&fit=crop',
    icon: Utensils,
    color: 'bg-tool-light',
    accent: 'text-tool-dark',
    buttonBg: 'bg-tool-dark'
  },
];

const ProductCategories = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="products" className="py-24 relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-secondary/80 to-transparent -z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-secondary/80 to-transparent -z-10"></div>
      
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-5 -z-20" 
        style={{
          backgroundImage: "url('https://www.transparenttextures.com/patterns/food.png')",
          backgroundRepeat: "repeat"
        }}
      ></div>
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-center mx-auto">منتجاتنا المميزة</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            نقدم لكم مجموعة متنوعة من المنتجات عالية الجودة بأسعار تنافسية
          </p>
        </motion.div>
        
        <motion.div 
          ref={ref} 
          className="grid md:grid-cols-3 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <Card className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                <div className="h-64 relative overflow-hidden group">
                  <img 
                    src={category.image} 
                    alt={category.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 right-0 p-4 w-full">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${category.color}`}>
                        <category.icon className={category.accent} size={24} />
                      </div>
                      <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                    </div>
                  </div>
                </div>
                <CardContent className="pt-6 flex-grow">
                  <p className="text-foreground/80 text-lg">{category.description}</p>
                </CardContent>
                <CardFooter className="pt-0 pb-6">
                  <Button 
                    className={`w-full text-white ${category.buttonBg} hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02]`}
                    onClick={() => document.getElementById('whatsapp-order')?.scrollIntoView({behavior: 'smooth'})}
                  >
                    اطلب الآن
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductCategories;
