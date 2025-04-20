
import { MapPin, Clock, Phone, Truck } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';

const Address = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="address" className="py-24 relative">
      <div 
        className="absolute inset-0 -z-10"
        style={{
          background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)"
        }}
      ></div>
      
      <div 
        className="absolute inset-0 opacity-5 -z-10" 
        style={{
          backgroundImage: "url('https://www.transparenttextures.com/patterns/brushed-alum.png')",
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
          <h2 className="section-title text-center mx-auto">فروعنا وخدمة التوصيل</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            نخدمكم في فروعنا ونوصل طلباتكم إلى أي مكان
          </p>
        </motion.div>
        
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8"
        >
          {/* الفرع الأول */}
          <motion.div variants={itemVariants}>
            <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 border-none overflow-hidden group">
              <div className="h-2 bg-primary group-hover:bg-accent transition-colors duration-300"></div>
              <CardContent className="p-8 flex flex-col items-center text-center h-full">
                <div className="mb-6 w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center transform transition-transform group-hover:scale-110 duration-300">
                  <MapPin className="text-primary" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-primary">الفرع الأول</h3>
                <p className="text-foreground/80 text-lg mb-4">
                  فرع رئيسي<br />
                  بموقع مميز في المنطقة
                </p>
                <a 
                  href="#" 
                  className="mt-4 text-primary hover:text-accent underline transition-colors duration-300"
                >
                  عرض الموقع
                </a>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* الفرع الثاني */}
          <motion.div variants={itemVariants}>
            <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 border-none overflow-hidden group">
              <div className="h-2 bg-primary group-hover:bg-accent transition-colors duration-300"></div>
              <CardContent className="p-8 flex flex-col items-center text-center h-full">
                <div className="mb-6 w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center transform transition-transform group-hover:scale-110 duration-300">
                  <MapPin className="text-primary" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-primary">الفرع الثاني</h3>
                <p className="text-foreground/80 text-lg mb-4">
                  فرع فرعي<br />
                  في موقع آخر مميز
                </p>
                <a 
                  href="#" 
                  className="mt-4 text-primary hover:text-accent underline transition-colors duration-300"
                >
                  عرض الموقع
                </a>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* خدمة التوصيل */}
          <motion.div variants={itemVariants}>
            <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 border-none overflow-hidden group bg-gradient-to-br from-spice-light to-meat-light">
              <div className="h-2 bg-accent group-hover:bg-primary transition-colors duration-300"></div>
              <CardContent className="p-8 flex flex-col items-center text-center h-full">
                <div className="mb-6 w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center transform transition-transform group-hover:scale-110 duration-300">
                  <Truck className="text-accent" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-accent">خدمة التوصيل</h3>
                <p className="text-foreground/80 text-lg mb-4">
                  نوصل طلباتكم إلى أي مكان<br />
                  داخل نطاق خدمتنا
                </p>
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-foreground/70">
                    التوصيل مجاني للطلبات فوق 200 جنيه
                  </p>
                  <p className="text-sm text-foreground/70">
                    متوسط وقت التوصيل: 30-45 دقيقة
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Address;

