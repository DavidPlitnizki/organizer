import { FlatList, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "~/components/ui/button";
import { Plus as PlusIcon } from "../../../lib/icons/PlusIcon";
import { useTheme } from "@react-navigation/native";
import { DATA } from "~/mockData";
import ModalTask from "~/widgets/ModalTask";
import CardTask from "~/widgets/CardTask";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import PieChart from "react-native-pie-chart";
import StatisticsPie from "~/widgets/StatisticsPie";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui/label";

function RadioGroupItemWithLabel({
  value,
  onLabelPress,
}: {
  value: string;
  onLabelPress: () => void;
}) {
  return (
    <View className={"flex-row gap-2 items-center"}>
      <RadioGroupItem aria-labelledby={`label-for-${value}`} value={value} />
      <Label nativeID={`label-for-${value}`} onPress={onLabelPress}>
        {value}
      </Label>
    </View>
  );
}

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const { colors } = useTheme();

  const [value, setValue] = React.useState("All");

  function onLabelPress(label: string) {
    return () => {
      setValue(label);
    };
  }
  return (
    <SafeAreaView className="relative px-2 h-full pb-20">
      <StatisticsPie />

      <Card
        className={`flex flex-row w-full my-2 px-4 items-center justify-between`}
      >
        <CardHeader className="flex flex-col px-1 max-w-72 h-48">
          <CardTitle className={`text-2xl font-rubik-bold `}>
            Task Filters:
          </CardTitle>
          <View className="flex-1 justify-center items-start pl-2">
            <RadioGroup
              value={value}
              onValueChange={setValue}
              className="gap-3"
            >
              <RadioGroupItemWithLabel
                value="All"
                onLabelPress={onLabelPress("All")}
              />
              <RadioGroupItemWithLabel
                value="Todo"
                onLabelPress={onLabelPress("Todo")}
              />
              <RadioGroupItemWithLabel
                value="Done"
                onLabelPress={onLabelPress("Done")}
              />
            </RadioGroup>
          </View>
        </CardHeader>

        <CardFooter className="p-0 items-center justify-center gap-8">
          <Button
            style={{ height: 48 }}
            className="rounded-xl w-16 h-16 shadow-md"
            onPress={() => setModalVisible(true)}
          >
            <PlusIcon color={colors.background} size={32} />
          </Button>
        </CardFooter>
      </Card>
      <FlatList
        className="mt-4"
        data={DATA}
        renderItem={({ item }) => <CardTask title={item.title} />}
        keyExtractor={(item) => item.id}
      />

      <ModalTask
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </SafeAreaView>
  );
}
