import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import FormInput from "../form/FormInput";
import { verificationSchema } from "~/types/zod";
import { FormButton } from "./FormButton";
import { useSignUp } from "@clerk/clerk-expo";
import { useState } from "react";
import { toast } from "sonner-native";
type FormData = z.infer<typeof verificationSchema>;
export function VerificationForm() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(verificationSchema),
  });
  const onSubmit = async (data: FormData) => {
    if (!isLoaded) {
      return;
    }

    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: data.verification_code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      console.log(err.errors[0].message);
      toast.error("unable to complete sign up");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <FormInput
        control={control}
        title="Verification code"
        name="verification_code"
        placeholder="enter the code"
      />
      <FormButton
        title="Verify"
        isLoading={loading}
        handlePress={handleSubmit(onSubmit)}
      />
    </>
  );
}
