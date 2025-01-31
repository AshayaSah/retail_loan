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

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider defaultOpen={true}>
        {/* <AppSidebar /> */}
        <main className="w-full">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/form" element={<Form />} />
            <Route path="/" element={<Homepage />} />
          </Routes>
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default App;
