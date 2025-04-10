import { FlatList, Platform } from 'react-native';
import React, { useMemo, useState } from 'react';
import { DATA } from '~/mockData';
import ModalTask from '~/widgets/ModalTask';
import CardTask from '~/widgets/CardTask';
import SearchCard from '~/widgets/SearchCard';
import { View } from 'react-native';

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const filteredData = useMemo(() => {
    return DATA.filter((dInfo) =>
      dInfo.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue]);

  const paddingBottom = Platform.OS === 'ios' ? 'pb-28' : 'pb-24';

  return (
    <View className={`relative px-2 mt-4 h-full ${paddingBottom}`}>
      <SearchCard setValue={setSearchValue} setModalVisible={setModalVisible} />
      <FlatList
        className="mt-2"
        data={filteredData}
        renderItem={({ item }) => <CardTask title={item.title} />}
        keyExtractor={(item) => item.id}
      />

      <ModalTask
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
}
