import React, { useState } from "react";
import { Calendar, Check, Home, Inbox, Search, Settings } from "lucide-react";
// import Logo from "@/assets/logo.png";

import CAS from "@/assets/CAS.jpg";
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
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ModeToggle } from "./ModeToggle";
// import { Label } from "@radix-ui/react-dropdown-menu";
import { useNavigate } from "react-router-dom";

const AppSidebar = ({ stepper }) => {
  const navigate = useNavigate();

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirmNavigation = (confirmed) => {
    setShowConfirmation(false);
    if (confirmed) {
      navigate("/");
    }
  };

  return (
    <Sidebar varient="floating" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarTrigger />
          <button
            onClick={() => setShowConfirmation(true)}
            className="w-full bg-transparent border-none cursor-pointer focus:outline-none"
          >
            <img
              src={CAS}
              alt="CAS Logo"
              className="block mt-4 mx-auto min-w-[90%] transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </button>
          {/* <ModeToggle></ModeToggle> */}
          {/* Custom Confirmation Popup */}
          {showConfirmation && (
            <div className=" fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-10">
              <div className="bg-white  dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full shadow-xl relative z-[1001]">
                <h3 className="text-lg font-semibold mb-3 dark:text-white">
                  Leave this page?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-5">
                  Are you sure you want to return to the homepage?
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => handleConfirmNavigation(false)}
                    className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleConfirmNavigation(true)}
                    className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-bold bg-gray">
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
