
import { MapPin, Clock, Phone } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const Address = () => {
  return (
    <section id="address" className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="category-card bg-white">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">موقعنا</h3>
              <p className="text-foreground/80">
                شارع الملك فهد، حي العليا<br />
                الرياض، المملكة العربية السعودية
              </p>
            </CardContent>
          </Card>
          
          <Card className="category-card bg-white">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">ساعات العمل</h3>
              <p className="text-foreground/80">
                السبت - الخميس: 9:00 ص - 10:00 م<br />
                الجمعة: 2:00 م - 10:00 م
              </p>
            </CardContent>
          </Card>
          
          <Card className="category-card bg-white">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">اتصل بنا</h3>
              <p className="text-foreground/80 mb-2">
                هاتف: +966 500000000
              </p>
              <p className="text-foreground/80">
                واتساب: +966 500000000
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Address;
