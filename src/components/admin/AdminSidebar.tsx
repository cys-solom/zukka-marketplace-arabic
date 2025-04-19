
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Package, FolderOpen, Settings, Users, List } from "lucide-react";

interface AdminSidebarProps {
  isMobile?: boolean;
}

const AdminSidebar = ({ isMobile = false }: AdminSidebarProps) => {
  return (
    <aside className={cn(
      "bg-white shadow-md border-l flex flex-col h-full",
      isMobile ? "w-full" : "w-64 hidden md:flex"
    )}>
      <div className="p-4 border-b flex items-center justify-center">
        <h2 className="font-bold text-xl text-primary">زوكا للحوم</h2>
      </div>
      
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          <li>
            <NavLink 
              to="/admin" 
              end
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-muted-foreground"
              )}
            >
              <Home size={18} />
              <span>الرئيسية</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/products" 
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-muted-foreground"
              )}
            >
              <Package size={18} />
              <span>المنتجات</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/categories" 
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-muted-foreground"
              )}
            >
              <FolderOpen size={18} />
              <span>التصنيفات</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/settings" 
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-muted-foreground"
              )}
            >
              <Settings size={18} />
              <span>الإعدادات</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      
      <div className="p-4 border-t mt-auto">
        <p className="text-xs text-muted-foreground text-center">
          لوحة تحكم زوكا v1.0
        </p>
      </div>
    </aside>
  );
};

export default AdminSidebar;
