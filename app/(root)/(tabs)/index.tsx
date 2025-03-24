import { FlatList, View } from "react-native";
import React, { useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { DATA } from "~/mockData";
import ModalTask from "~/widgets/ModalTask";
import CardTask from "~/widgets/CardTask";
import { RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui/label";
import SearchCard from "~/widgets/SearchCard";

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
  const [searchValue, setSearchValue] = useState("");

  const filteredData = useMemo(() => {
    return DATA.filter((dInfo) =>
      dInfo.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue]);

  return (
    <SafeAreaView className="relative px-2 h-full pb-20">
      <SearchCard value={searchValue} setValue={setSearchValue} />
      <FlatList
        className="mt-4"
        data={filteredData}
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
