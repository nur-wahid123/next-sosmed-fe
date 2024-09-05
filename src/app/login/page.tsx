"use client";

import { ChangeEvent, FormEvent, FormEventHandler, useState } from "react";
import { LoginForm } from "@/lib/Types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

const Page = () => {
  const [loginForm, setLoginForm] = useState(new LoginForm());
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(loginForm);
  };
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Card>
        <CardHeader>
          <CardTitle>Login Form</CardTitle>
          <CardDescription>Welcome Back, please login first</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Label htmlFor="username">Username</Label>
            <Input
              onChange={handleChange}
              type="text"
              id="username"
              name="username"
              required
            />
            <Label htmlFor="password">Password</Label>
            <Input
              onChange={handleChange}
              type="password"
              id="password"
              name="password"
              required
            />
            <Input type="submit" />
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
export default Page;
