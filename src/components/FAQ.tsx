
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from 'framer-motion';

const FAQ = () => {
  return (
    <section className="py-12 px-4 bg-secondary/30">
      <motion.div 
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="section-title mb-10 text-center">الأسئلة الشائعة</h2>
        <Accordion type="single" collapsible className="w-full mx-auto rounded-lg">
          <AccordionItem value="payment" className="border-b border-border/70">
            <AccordionTrigger className="hover:bg-secondary/50 px-4 py-4 rounded-t-lg text-right font-medium">
              ما هي طرق الدفع المتاحة؟
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-right">
              نقبل الدفع نقداً عند الاستلام، وكذلك التحويل البنكي المسبق. للطلبات الكبيرة، يمكن ترتيب طرق دفع خاصة عبر التواصل معنا مباشرة.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="delivery" className="border-b border-border/70">
            <AccordionTrigger className="hover:bg-secondary/50 px-4 py-4 text-right font-medium">
              ما هي أوقات التوصيل؟
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-right">
              نوفر خدمة التوصيل من الساعة 10 صباحاً حتى 10 مساءً، والتوصيل خلال ساعتين من تأكيد الطلب. في أوقات الذروة، قد يستغرق التوصيل وقتاً إضافياً.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="discount" className="border-b border-border/70">
            <AccordionTrigger className="hover:bg-secondary/50 px-4 py-4 text-right font-medium">
              هل هناك خصومات على الكميات؟
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-right">
              نعم، نقدم خصومات خاصة على الطلبات بكميات كبيرة. يرجى التواصل معنا عبر واتساب لمعرفة التفاصيل والحصول على عروض مخصصة لاحتياجاتك.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="return" className="border-b border-border/70">
            <AccordionTrigger className="hover:bg-secondary/50 px-4 py-4 text-right font-medium">
              ما هي سياسة الاسترجاع؟
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-right">
              نحن نضمن جودة منتجاتنا. إذا كنت غير راضٍ عن المنتج لأي سبب، يرجى إبلاغنا فور استلام الطلب وسنعمل على حل المشكلة بما يرضيك.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="freshness" className="border-b-0">
            <AccordionTrigger className="hover:bg-secondary/50 px-4 py-4 rounded-b-lg text-right font-medium">
              كيف تضمنون طزاجة المنتجات؟
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-right">
              نحرص على تحضير المنتجات يومياً واختيار أفضل المكونات الطازجة. يتم تغليف المنتجات بطريقة تحافظ على جودتها وطزاجتها حتى وصولها إليك.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>
    </section>
  );
};

export default FAQ;
