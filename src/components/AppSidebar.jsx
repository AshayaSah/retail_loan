import React from "react";
import { Calendar, Check, Home, Inbox, Search, Settings } from "lucide-react";
// import Logo from "@/assets/logo.png";
import CAS from "@/assets/CAS.jpg"
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
  return (
    <Sidebar varient="floating" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarTrigger />
          <img src={CAS} alt="" />
          {/* <ModeToggle></ModeToggle> */}
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-">
            Home Loan Form
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {stepper.map((item) => (
                <SidebarMenuItem key={item.value}>
                  <SidebarMenuButton asChild>
                    <div
                      className={`${
                        item.state
                          ? "text-primary text-xl"
                          : "text-muted-foreground"
                      }`}
                    >
                      <item.icon />
                      <span>{item.value}</span>
                      {item.state && <Check></Check>}
                    </div>
                  </SidebarMenuButton>
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
