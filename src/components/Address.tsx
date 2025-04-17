import { MapPin, Clock, Phone } from 'lucide-react';
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
      {/* Modern gradient background */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)"
        }}
      ></div>
      
      {/* Subtle pattern overlay */}
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
          <h2 className="section-title text-center mx-auto">موقعنا وساعات العمل</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            نرحب بزيارتكم في موقعنا أو التواصل معنا عبر الهاتف
          </p>
        </motion.div>
        
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8"
        >
          <motion.div variants={itemVariants}>
            <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 border-none overflow-hidden group">
              <div className="h-2 bg-primary group-hover:bg-accent transition-colors duration-300"></div>
              <CardContent className="p-8 flex flex-col items-center text-center h-full">
                <div className="mb-6 w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center transform transition-transform group-hover:scale-110 duration-300">
                  <MapPin className="text-primary" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-primary">موقعنا</h3>
                <p className="text-foreground/80 text-lg">
                  شارع الملك فهد، حي العليا<br />
                  الرياض، المملكة العربية السعودية
                </p>
                <a 
                  href="https://maps.app.goo.gl/example" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-4 text-primary hover:text-accent underline transition-colors duration-300"
                >
                  الاتجاهات على الخريطة
                </a>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 border-none overflow-hidden group">
              <div className="h-2 bg-primary group-hover:bg-accent transition-colors duration-300"></div>
              <CardContent className="p-8 flex flex-col items-center text-center h-full">
                <div className="mb-6 w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center transform transition-transform group-hover:scale-110 duration-300">
                  <Clock className="text-primary" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-primary">ساعات العمل</h3>
                <p className="text-foreground/80 text-lg">
                  السبت - الخميس: 9:00 ص - 10:00 م<br />
                  الجمعة: 2:00 م - 10:00 م
                </p>
                <div className="mt-4 px-4 py-2 bg-primary/10 rounded-lg text-primary">
                  مفتوح الآن
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 border-none overflow-hidden group">
              <div className="h-2 bg-primary group-hover:bg-accent transition-colors duration-300"></div>
              <CardContent className="p-8 flex flex-col items-center text-center h-full">
                <div className="mb-6 w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center transform transition-transform group-hover:scale-110 duration-300">
                  <Phone className="text-primary" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-primary">اتصل بنا</h3>
                <p className="text-foreground/80 text-lg mb-4">
                  يسعدنا استقبال اتصالاتكم وطلباتكم
                </p>
                <a 
                  href="tel:01030557250"
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-accent transition-colors duration-300 flex items-center justify-center gap-2 font-bold"
                >
                  <Phone size={18} />
                  01030557250
                </a>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Address;
