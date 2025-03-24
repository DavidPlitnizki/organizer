import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
