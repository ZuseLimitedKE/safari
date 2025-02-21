import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { useAuth } from "@clerk/clerk-expo";
import { Button } from "~/components/ui/button";
export default function HomeScreen() {
  const { signOut } = useAuth();
  return (
    <View className="mt-20 flex-1">
      <Text>Home Screen</Text>
      <Button onPress={() => signOut()}>
        <Text>Sign out</Text>
      </Button>
    </View>
  );
}
