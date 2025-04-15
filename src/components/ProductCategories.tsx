
import { useState, useEffect } from 'react';
import { Beef, Utensils, ShoppingBag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useInView } from 'react-intersection-observer';

const categories = [
  {
    id: 'meat',
    title: 'اللحوم',
    description: 'نقدم أجود أنواع اللحوم الطازجة المذبوحة على الطريقة الإسلامية، من لحوم الضأن والبقر بمختلف أنواعها وقطعياتها.',
    image: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
    icon: Beef,
    color: 'bg-meat-light',
    accent: 'text-meat-dark'
  },
  {
    id: 'spices',
    title: 'البهارات',
    description: 'مجموعة مختارة من أفخر أنواع البهارات الطازجة والمميزة، مطحونة ومعبأة بعناية لتحافظ على نكهتها ورائحتها.',
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
    icon: ShoppingBag,
    color: 'bg-spice-light',
    accent: 'text-spice-dark'
  },
  {
    id: 'tools',
    title: 'أدوات المطبخ',
    description: 'كل ما تحتاجه من أدوات وملحقات المطبخ عالية الجودة، من سكاكين وأواني وأدوات تقطيع وتقديم.',
    image: 'https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    icon: Utensils,
    color: 'bg-tool-light',
    accent: 'text-tool-dark'
  },
];

const ProductCategories = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="products" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mx-auto">منتجاتنا المميزة</h2>
        
        <div ref={ref} className="grid md:grid-cols-3 gap-8 mt-12">
          {categories.map((category, index) => (
            <Card 
              key={category.id}
              className={`category-card ${category.color} overflow-hidden ${inView ? 'animate-fade-in' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <category.icon className={category.accent} size={24} />
                  <h3 className="text-2xl font-bold mr-2">{category.title}</h3>
                </div>
                <p className="text-foreground/80">{category.description}</p>
              </CardContent>
              <CardFooter>
                <Button 
                  className={`w-full mt-4 ${category.accent.replace('text', 'bg')} hover:opacity-90 text-white`}
                >
                  تصفح القائمة
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
