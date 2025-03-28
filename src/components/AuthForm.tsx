"use client";

import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { auth } from "@/firebase/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { signIn, signUp } from "@/lib/actions/auth.action";
import FormField from "./FormField";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (type === "sign-up") {
        const { name, email, password } = data;

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const result = await signUp({
          uid: userCredential.user.uid,
          name: name!,
          email,
          password,
        });

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        toast.success("Account created successfully. Please sign in.");
        router.push("/sign-in");
      } else {
        const { email, password } = data;

        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const idToken = await userCredential.user.getIdToken();
        if (!idToken) {
          toast.error("Sign in Failed. Please try again.");
          return;
        }

        await signIn({
          email,
          idToken,
        });

        toast.success("Signed in successfully.");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was an error: ${error}`);
    }
  };

  const isSignIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[566px] backdrop-blur-sm">
      <div className="flex flex-col gap-8 card py-16 px-12 bg-gradient-to-br from-slate-800/40 to-slate-900/40 hover:from-slate-800/50 hover:to-slate-900/50 transition-all duration-300">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex flex-row gap-3 items-center">
            <Image src="/brand-logo.png" alt="logo" height={38} width={44} className="drop-shadow-lg" />
            <h2 className="text-primary-100 tracking-wide font-semibold">NextHire</h2>
          </div>
          <h3 className="text-light-100 font-medium tracking-wide">Practice job interviews with AI</h3>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-7 mt-6 form"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
                type="text"
              />
            )}

            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email address"
              type="email"
            />

            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />

            <Button className="btn w-full" type="submit">
              {isSignIn ? "Sign In" : "Create an Account"}
            </Button>
          </form>
        </Form>

        <p className="text-center text-light-100">
          {isSignIn ? "No account yet?" : "Have an account already?"}
          <Link
            href={!isSignIn ? "/sign-in" : "/sign-up"}
            className="font-semibold text-primary-100 hover:text-primary-50 transition-colors ml-1"
          >
            {!isSignIn ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
