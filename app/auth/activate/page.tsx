import { ActivationCodeInput } from "@/components/Auth/ActivationCodeInput";
import { GalleryVerticalEnd } from "lucide-react";
import React from "react";

const ActivationPage = () => {
  return (
    <div className="bg-red-400">
      <div className="flex flex-col gap-6 justify-center items-center bg-muted p-6 md:p-10 min-h-screen">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Acme Inc.
        </a>
        <h1 className="text-4xl font-bold mb-4">Activation Page</h1>
        <div className="container mx-auto flex justify-center">
          <ActivationCodeInput />
        </div>
      </div>
    </div>
  );
};

export default ActivationPage;
