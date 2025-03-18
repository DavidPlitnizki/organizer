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

const widthAndHeight = 120;

const series = [
  { value: 430, color: "#fbd203", label: { text: "A", fontWeight: "bold" } },
  {
    value: 321,
    color: "#ffb300",
    label: { text: "mobile", fontSize: 8 },
  },
  {
    value: 185,
    color: "#ff9100",
    label: { text: "%22", fontSize: 8 },
  },
];

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const { colors } = useTheme();
  return (
    <SafeAreaView className="relative px-2 h-full pb-20">
      <Card
        className={`flex flex-row w-full my-2 px-4 items-center justify-between`}
      >
        <CardHeader className="flex flex-col px-1 max-w-72">
          <CardTitle className={`text-xl text-text font-rubik-bold `}>
            Statistics
          </CardTitle>
          <CardDescription>
            <View className="flex-1 items-center">
              <PieChart
                widthAndHeight={widthAndHeight}
                series={series}
                cover={0.5}
              />
            </View>
          </CardDescription>
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
