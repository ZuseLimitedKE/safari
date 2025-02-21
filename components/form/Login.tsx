import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import FormInput from "../form/FormInput";
import { Mail } from "lucide-react-native";
import { loginSchema } from "~/types/zod";
import { FormButton } from "./FormButton";
import { useSignIn } from "@clerk/clerk-expo";
import { useState } from "react";
import { toast } from "sonner-native";
type FormData = z.infer<typeof loginSchema>;
export function Login() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = async (data: FormData) => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: data.email.trim(),
        password: data.password.trim(),
      });

      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      toast.error("sign in failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <View className="px-2 mt-1">
      <FormInput
        control={control}
        title="Email"
        name="email"
        icon={Mail}
        iconPosition="left"
        placeholder="enter your email"
      />
      <FormInput
        control={control}
        title="Password"
        name="password"
        placeholder="enter your password"
      />
      <FormButton
        title="Login"
        isLoading={loading}
        handlePress={handleSubmit(onSubmit)}
      />
    </View>
  );
}
