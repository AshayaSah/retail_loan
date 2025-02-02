import React from "react";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import Form from "./components/form/Form";
import { SidebarProvider } from "./components/ui/sidebar";
import AppSidebar from "./components/AppSidebar";
import Navbar from "./components/navbar/NavbarUpdated";
import { Route, Routes } from "react-router-dom";
import { LoginForm } from "./components/login-form";
import Homepage from "./components/homepage/Homepage";
import AuthProvider from "./components/auth/AuthProvider";
import { FrappeProvider } from "frappe-react-sdk";

const App = () => {
  return (
    <FrappeProvider url="http://192.168.10.41" socketPort="9000">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SidebarProvider defaultOpen={true}>
          {/* <AppSidebar /> */}
          <main className="w-full">
            <Routes>
              <Route path="/login" element={<AuthProvider />} />
              <Route path="/form" element={<Form />} />
              <Route path="/" element={<Homepage />} />
            </Routes>
          </main>
        </SidebarProvider>
      </ThemeProvider>
    </FrappeProvider>
  );
};

export default App;
