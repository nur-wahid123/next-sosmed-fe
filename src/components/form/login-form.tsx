"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Cookies from 'js-cookie'
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import axios from "axios";
import API_ENDPOINT from "../../../config/endpoint";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import React from "react";

const loginFormSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
});

export default function LoginForm() {
  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const toaster = useToast()
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    await axios.post(`${API_ENDPOINT.URL_LOGIN}`,loginForm.getValues())
    .then(res => {
      const twoHours = new Date(Date.now() + 2 * 60 * 60 * 1000)
      Cookies.set("token",res.data.data.access_token, { expires: twoHours })
      toaster.toast({
        title: "Success Login",
        description: "Login Sukses"
      })
      router.push("/dashboard")
    })
    .catch(err => {
      toaster.toast({
        title: "Error Login",
        description: err.response.data.message,
        variant: "destructive"
      })
      loginForm.setError("password", {
        type: "custom",
        message: "invalid credentials",
      });
    })
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login Form</CardTitle>
        <CardDescription>Welcome Back, please login first</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...loginForm}>
          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            <FormField
              control={loginForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Login</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
