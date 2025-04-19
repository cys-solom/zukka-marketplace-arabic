
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock category data for the demo
const mockCategories = [
  { id: "1", name: "اللحوم الطازجة", productCount: 10, active: true },
  { id: "2", name: "الوجبات الجاهزة", productCount: 8, active: true },
  { id: "3", name: "أدوات المطبخ", productCount: 5, active: true },
  { id: "4", name: "البهارات", productCount: 0, active: false },
];

const CategoryList = () => {
  const [categories, setCategories] = useState(mockCategories);
  const { toast } = useToast();

  const handleDeleteCategory = (id: string) => {
    const category = categories.find(c => c.id === id);
    
    if (category?.productCount && category.productCount > 0) {
      toast({
        title: "لا يمكن حذف التصنيف",
        description: `التصنيف "${category.name}" يحتوي على منتجات. قم بحذف المنتجات أو نقلها لتصنيف آخر أولاً.`,
        variant: "destructive",
      });
      return;
    }
    
    if (confirm(`هل أنت متأكد من حذف التصنيف "${category?.name}"؟`)) {
      setCategories(prev => prev.filter(category => category.id !== id));
      
      toast({
        title: "تم حذف التصنيف",
        description: `تم حذف "${category?.name}" بنجاح`,
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>التصنيفات</CardTitle>
        <Button onClick={() => alert('إضافة تصنيف جديد')}>
          إضافة تصنيف
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>اسم التصنيف</TableHead>
                <TableHead>عدد المنتجات</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead className="text-left">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center h-24">
                    لا توجد تصنيفات
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Package className="ml-2 h-4 w-4 text-muted-foreground" />
                        {category.name}
                      </div>
                    </TableCell>
                    <TableCell>{category.productCount} منتج</TableCell>
                    <TableCell>
                      <Badge variant={category.active ? "default" : "outline"}>
                        {category.active ? "نشط" : "مخفي"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => alert(`تعديل التصنيف: ${category.name}`)}
                          title="تعديل التصنيف"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteCategory(category.id)}
                          title="حذف التصنيف"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryList;
