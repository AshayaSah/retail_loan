import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogDescription
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const Prerequisits = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex align-middle justify-center mt-4 mb-0">
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>
          <Button className="h-[50px] text-lg px-6">
            Check Pre-requirements
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Pre-requirements</AlertDialogTitle>
            <AlertDialogDescription className="hidden">Necessary</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="mt-2">
            Before proceeding, please ensure you meet the following requirements:
            <ul className="list-disc list-inside">
              <li>You are at least 18 years old</li>
              <li>You have a valid email address</li>
              <li>You agree to our terms of service</li>
              <li>You have a stable internet connection</li>
              <li>You also need to have an account in CAS Bank</li>
            </ul>
          </div>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setIsOpen(false)}>
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Prerequisits;