import { ActivityIndicator, View } from "react-native";
import { useColorScheme } from "~/lib/useColorScheme";
export function Loader() {
  const { isDarkColorScheme } = useColorScheme();
  return (
    <View className="flex-1 justify-center items-center dark:bg-black">
      <ActivityIndicator
        size="large"
        color={isDarkColorScheme ? "white" : "black"}
      />
    </View>
  );
}
