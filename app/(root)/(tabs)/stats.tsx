import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatisticsPie from '~/widgets/StatisticsPie';

const Statistics = () => {
  return (
    <SafeAreaView className="relative px-2 h-full pb-20">
      <StatisticsPie />
    </SafeAreaView>
  );
};

export default Statistics;
