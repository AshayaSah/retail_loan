import React, { useEffect } from "react";
import AOS from "aos"; 
import "aos/dist/aos.css"; 
import { Calendar, Check, CircleCheck, Circle, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ModeToggle } from "./ModeToggle";

const AppSidebar = ({ stepper }) => {
  useEffect(() => {
    AOS.init(); 
  }, []);

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarTrigger />
          <ModeToggle />
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-500 text-xl mb-4">Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu >
              {stepper.map((item) => (
                <SidebarMenuItem 
                  key={item.value} 
                  data-aos="fade-up" // Add AOS animation
                >
                  <SidebarMenuButton asChild>
                    <div
                      className={`flex items-center justify-between ${
                        item.state
                          ? "text-primary text-xl"
                          : "text-muted-foreground"
                      }`}
                    >
                      <div className="flex items-center">
                        <item.icon className="mr-2 text-primary" />
                        <span>{item.value}</span>
                      </div>
                      {item.state ? (
                        <CircleCheck className="text-primary w-6 h-6" />
                      ) : (
                        <Circle className="text-gray-400 w-6 h-6" />
                      )}
                    </div>
                  </SidebarMenuButton >
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;