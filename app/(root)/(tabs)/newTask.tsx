import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StatisticsPie from "~/widgets/StatisticsPie";

const NewTask = () => {
  return (
    <SafeAreaView className="relative px-2 h-full pb-20">
      <View>
        <Text>New One</Text>
      </View>
    </SafeAreaView>
  );
};

export default NewTask;
