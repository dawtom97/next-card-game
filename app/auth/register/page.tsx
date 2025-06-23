"use client";
import { Button } from "@/components/ui/button";
import React from "react";

const RegisterPage = () => {
  return (
    <div>
      <Button onClick={() => alert("Register button clicked!")}>
        Kliknij mnie
      </Button>
    </div>
  );
};

export default RegisterPage;
