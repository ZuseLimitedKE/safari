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
import { useSignUp } from "@clerk/clerk-expo";
import { useState } from "react";
import { toast } from "sonner-native";

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
import { Stack } from "expo-router";
import Spinner from "react-native-loading-spinner-overlay";
import { VerificationForm } from "./Verification";
type FormData = z.infer<typeof signUpSchema>;
export function SignUp() {
  const [pendingVerification, setPendingVerification] = useState(false);
  const [loading, setLoading] = useState(false);
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
      username: "",
      email: "",
      password: "",
      account_type: "",
    },
    resolver: zodResolver(signUpSchema),
  });
  const { isLoaded, signUp } = useSignUp();
  const onSubmit = async (data: FormData) => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      await signUp.create({
        emailAddress: data.email.trim(),
        password: data.password.trim(),
        username: data.username.trim(),
        unsafeMetadata: {
          role: data.account_type.trim(),
        },
      });

      // Send verification Email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      // change the UI to verify the email address
      setPendingVerification(true);
    } catch (err: any) {
      console.log(err.errors[0].message);
      toast.error("unable to create your account");
    } finally {
      setLoading(false);
    }
  };
  // Verify the email address
  // const onPressVerify = async () => {
  //   if (!isLoaded) {
  //     return;
  //   }
  //   if (!code) {
  //     toast.error("enter the verification code");
  //   }
  //
  //   setLoading(true);
  //
  //   try {
  //     const completeSignUp = await signUp.attemptEmailAddressVerification({
  //       code,
  //     });
  //
  //     await setActive({ session: completeSignUp.createdSessionId });
  //   } catch (err: any) {
  //     console.log(err.errors[0].message);
  //     toast.error("unable to complete sign up", {
  //       style: {
  //         borderColor: "red",
  //       },
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  return (
    <View className="px-2 mt-1">
      <Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
      <Spinner visible={loading} />

      {!pendingVerification ? (
        <>
          <FormInput
            name="username"
            title="Username"
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
          <FormButton
            isLoading={loading}
            title="Register"
            handlePress={handleSubmit(onSubmit)}
          />
        </>
      ) : (
        <VerificationForm />
      )}
    </View>
  );
}
