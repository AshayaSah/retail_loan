import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import BGImage from "../../../assets/bgImage.png";

const Heading = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative h-[50vh] md:h-[50vh] bg-cover bg-center flex items-end"
      style={{
        backgroundImage: `url(${BGImage})`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative z-10 p-6 md:p-10 w-full">
        {/* <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Welcome to Our Platform
        </h1>
        <p className="text-xl text-white mb-8">
          Discover amazing features and possibilities
        </p> */}
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogTrigger asChild>
            <Button>Check Pre-requirements</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Pre-requirements</AlertDialogTitle>
              <AlertDialogDescription>
                Before proceeding, please ensure you meet the following
                requirements:
                <ul className="list-disc list-inside mt-2">
                  <li>You are at least 18 years old</li>
                  <li>You have a valid email address</li>
                  <li>You agree to our terms of service</li>
                  <li>You have a stable internet connection</li>
                  <li>You also need to have an Account in Cas Bank</li>
                </ul>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              {/* <AlertDialogCancel>Close</AlertDialogCancel> */}
              <AlertDialogAction onClick={() => setIsOpen(false)}>
                Close
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Heading;
