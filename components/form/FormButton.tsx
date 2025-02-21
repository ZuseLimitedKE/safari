import { GestureResponderEvent } from "react-native";
import { ActivityIndicator } from "react-native";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
interface ButtonProps {
  title: string;
  handlePress: (e: GestureResponderEvent) => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
}
const FormButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}: ButtonProps) => {
  return (
    <Button
      onPress={handlePress}
      className={` my-4 flex flex-row items-center ${containerStyles} ${isLoading ? "opacity-50" : ""}`}
      disabled={isLoading}
    >
      <Text className={`  font-semibold text-lg ${textStyles}`}>{title}</Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </Button>
  );
};

export { FormButton };
