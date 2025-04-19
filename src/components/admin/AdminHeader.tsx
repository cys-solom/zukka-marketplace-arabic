
import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import AdminSidebar from "./AdminSidebar";

const AdminHeader = () => {
  const { logout } = useAdminAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="border-b bg-card px-4 py-3 flex justify-between items-center">
      <div className="flex items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">القائمة</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="p-0 w-64">
            <AdminSidebar isMobile={true} />
          </SheetContent>
        </Sheet>
        <h1 className="text-lg font-semibold md:text-xl hidden md:block">
          لوحة تحكم زوكا
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="gap-1"
          onClick={logout}
        >
          <LogOut className="h-4 w-4 ml-1" />
          تسجيل الخروج
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
