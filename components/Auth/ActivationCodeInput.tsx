"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Input } from "../ui/input"
import { Label } from "@radix-ui/react-label"
import { useActivateMutation } from "@/redux/services/api"
import { useRouter } from "next/navigation"

const FormSchema = z.object({
  verifyCode: z.string().min(6, {
    message: "Your one-time code must be 6 numbers.",
  }),
})

export function ActivationCodeInput({className, ...props}: React.ComponentProps<"div">) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      verifyCode: "",
    },
  })

  const [email, setEmail] = useState("")
  const [activate] = useActivateMutation()
  const router = useRouter()

  
  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Form submitted with data:", email, data)

    activate({ email, verifyCode: data.verifyCode }).unwrap()
      .then((result) => {
        console.log("Activation successful:", result)
        toast.success("Account activated successfully!")
        router.push("/auth/login")
      })
      .catch((error) => {
        console.error("Activation failed:", error)
        toast.error("Failed to activate account. Please try again.")
      })
  }

  return (

    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Activate your account</CardTitle>
          <CardDescription className="text-muted-foreground">
            Please enter the 6-digit code sent to your email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <FormField
                control={form.control}
                name="verifyCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification Code</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By continuing, you agree to our <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </div>
    </div>

  )
}
