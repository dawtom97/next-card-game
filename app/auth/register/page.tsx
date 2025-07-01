"use client";
import { RegisterForm } from "@/components/Auth/RegisterForm";
import { GalleryVerticalEnd } from "lucide-react";

const RegisterPage = () => {

  return (
    <div>
      <div className="flex w-full flex-col gap-6 justify-center items-center bg-muted p-6 md:p-10 min-h-screen">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Acme Inc.
        </a>
        <RegisterForm/>
      </div>
    </div>
  );
};

export default RegisterPage;
