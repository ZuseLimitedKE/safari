import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { View } from "react-native";
import { Text } from "../ui/text";
import { Label } from "../ui/label";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FormInput from "../form/FormInput";
import { Mail } from "lucide-react-native";
import { signUpSchema } from "~/types/zod";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FormButton } from "./FormButton";
type FormData = z.infer<typeof signUpSchema>;
export function SignUp() {
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      account_type: "",
    },
    resolver: zodResolver(signUpSchema),
  });
  const onSubmit = async (data: FormData) => { };
  return (
    <View className="px-2 mt-1">
      <FormInput
        name="full_name"
        title="Full Name"
        control={control}
        placeholder="e.g David Njoroge"
      />

      <Label nativeID="account_type_label" className="mt-4 mb-2">
        Account Type
      </Label>
      <Controller
        control={control}
        render={({ field: { onChange } }) => (
          <Select
            onValueChange={(option) => onChange(option?.value)}
            defaultValue={{ value: "customer", label: "Customer" }}
          >
            <SelectTrigger className="">
              <SelectValue
                className="text-foreground text-sm native:text-lg"
                placeholder="Select an account type"
              />
            </SelectTrigger>
            <SelectContent insets={contentInsets} className="">
              <SelectGroup>
                <SelectLabel>Account Type</SelectLabel>
                <SelectItem label="Customer" value="customer">
                  Customer
                </SelectItem>
                <SelectItem label="Driver" value="driver">
                  Driver
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
        name="account_type"
      />
      {errors.account_type && (
        <Text className="text-red-600 font-bold">
          {errors.account_type.message}
        </Text>
      )}
      <FormInput
        control={control}
        title="Email"
        name="email"
        icon={Mail}
        iconPosition="left"
        placeholder="e.g davidnjoroge@example.com"
      />
      <FormInput control={control} title="Password" name="password" />
      <FormButton title="Register" handlePress={handleSubmit(onSubmit)} />
    </View>
  );
}
