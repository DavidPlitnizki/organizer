import { View, Text } from 'react-native';
import React from 'react';
import PieChart from 'react-native-pie-chart';
import { Card, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';

const widthAndHeight = 140;

const series = [
  {
    value: 4,
    color: '#16a34a',
    label: { text: '4', fontSize: 14, fontWeight: 'bold' },
  },
  {
    value: 6,
    color: '#60a5fa',
    label: { text: '6', fontSize: 14, fontWeight: 'bold' },
  },
];

const StatisticsPie = () => {
  return (
    <Card
      className={`flex flex-row w-full my-2 px-4 items-center justify-between`}
    >
      <CardHeader className="flex flex-col px-1 max-w-72 h-48">
        <CardTitle className={`text-2xl font-rubik-bold `}>
          Tasks Statistics:
        </CardTitle>
        <View className="mt-6">
          <Text className="font-rubik-semibold text-lg pl-2">
            All Tasks - 10
          </Text>
          <Text className="font-rubik-semibold text-lg pl-2">
            Todo - 6 <View className="w-3 h-3 bg-blue-400" />
          </Text>
          <Text className="font-rubik-semibold text-lg pl-2">
            Done - 4 <View className="w-3 h-3 bg-green-600" />
          </Text>
        </View>
      </CardHeader>

      <CardFooter className="p-0 items-center justify-center gap-8">
        <PieChart widthAndHeight={widthAndHeight} series={series} cover={0.5} />
      </CardFooter>
    </Card>
  );
};

export default StatisticsPie;
