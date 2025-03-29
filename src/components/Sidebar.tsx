
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Database,
  GitBranch,
  BarChart,
  Settings,
  FileCode,
  MessageSquare,
  Bell,
  ChevronLeft,
  ChevronRight,
  GaugeCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  isCollapsed: boolean;
  isActive?: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  href,
  icon,
  title,
  isCollapsed,
  isActive = false,
}) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      )}
    >
      {icon}
      {!isCollapsed && <span>{title}</span>}
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "flex h-screen flex-col bg-card border-r border-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-14 items-center px-4 py-4 border-b">
        {!collapsed && (
          <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
            <GaugeCircle size={20} className="text-primary" />
            ModelMesh
          </h2>
        )}
        {collapsed && <GaugeCircle size={20} className="text-primary mx-auto" />}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "h-7 w-7 rounded-full p-0 text-muted-foreground hover:text-foreground ml-auto flex items-center justify-center",
          )}
        >
          {collapsed ? (
            <ChevronRight size={16} />
          ) : (
            <ChevronLeft size={16} />
          )}
        </button>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          <SidebarLink
            href="/"
            icon={<LayoutDashboard size={20} />}
            title="Dashboard"
            isCollapsed={collapsed}
            isActive={true}
          />
          <SidebarLink
            href="/data-sources"
            icon={<Database size={20} />}
            title="Data Sources"
            isCollapsed={collapsed}
          />
          <SidebarLink
            href="/models"
            icon={<GitBranch size={20} />}
            title="Models"
            isCollapsed={collapsed}
          />
          <SidebarLink
            href="/analytics"
            icon={<BarChart size={20} />}
            title="Analytics"
            isCollapsed={collapsed}
          />
          <SidebarLink
            href="/jobs"
            icon={<FileCode size={20} />}
            title="Jobs"
            isCollapsed={collapsed}
          />
        </nav>
      </div>
      <div className="mt-auto border-t py-2">
        <nav className="grid gap-1 px-2 py-1">
          <SidebarLink
            href="/settings"
            icon={<Settings size={20} />}
            title="Settings"
            isCollapsed={collapsed}
          />
          <SidebarLink
            href="/support"
            icon={<MessageSquare size={20} />}
            title="Support"
            isCollapsed={collapsed}
          />
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
