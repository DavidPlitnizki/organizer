import { FlatList, Platform } from 'react-native';
import React, { useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DATA } from '~/mockData';
import ModalTask from '~/widgets/ModalTask';
import CardTask from '~/widgets/CardTask';
import SearchCard from '~/widgets/SearchCard';

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const filteredData = useMemo(() => {
    return DATA.filter((dInfo) =>
      dInfo.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue]);

  const paddingBottom = Platform.OS === 'ios' ? 'pb-14' : 'pb-20';

  return (
    <SafeAreaView className={`relative px-2 h-full ${paddingBottom}`}>
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
    </SafeAreaView>
  );
}
