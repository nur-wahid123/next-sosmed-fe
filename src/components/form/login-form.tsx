"use client"
import { useForm } from 'react-hook-form'
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

const loginFormSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(3),
})
export default function LoginForm() {
    const loginForm = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        
    })

    const onSubmit = (data: z.infer<typeof loginFormSchema>) => {
        console.log(data)
    }
  return (
    <Card className='w-[350px]'>
        <CardHeader>
            <CardTitle>Login Form</CardTitle>
            <CardDescription>Welcome Back, please login first</CardDescription>
        </CardHeader>
        <CardContent>
    <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-8">
            <FormField 
                control={loginForm.control} 
                name="username"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input placeholder="username" {...field} />
                        </FormControl>
                        
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input placeholder='password' {...field} />
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
  )
}
