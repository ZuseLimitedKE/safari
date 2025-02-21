import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import FormInput from "../form/FormInput";
import { Mail } from "lucide-react-native";
import { loginSchema } from "~/types/zod";
import { FormButton } from "./FormButton";
type FormData = z.infer<typeof loginSchema>;
export function SignUp() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = async (data: FormData) => { };
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
      <FormButton title="Login" handlePress={handleSubmit(onSubmit)} />
    </View>
  );
}
