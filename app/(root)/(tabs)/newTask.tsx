import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '~/components/ui/button';
import { Card, CardHeader, CardTitle } from '~/components/ui/card';
import { Separator } from '~/components/ui/separator';

const NewTask = () => {
  return (
    <SafeAreaView className="relative px-2 h-full pb-20">
      <View className="mt-4 gap-2">
        <Text className="font-rubik-bold text-3xl">Create Routing Task</Text>
        <Text className="font-rubik-medium text-lg text-secondary-foreground">
          Choose custom one or take from template
        </Text>
      </View>

      <View>
        <Button className="">
          <Text className="text-accent font-rubik-semibold">CUSTOM</Text>
        </Button>

        <Separator className="my-4" />

        <ScrollView>
          <View>
            <Text>Morning</Text>
            <Card
              className={`flex flex-row w-full my-2 px-4 items-center justify-between`}
            >
              <CardHeader className="flex flex-col px-1 max-w-72">
                <CardTitle className={`text-xl text-text font-rubik-bold`}>
                  <Text>washing</Text>
                  <Text>10 min</Text>
                </CardTitle>
              </CardHeader>
            </Card>
            <Card
              className={`flex flex-row w-full my-2 px-4 items-center justify-between`}
            >
              <CardHeader className="flex flex-col px-1 max-w-72">
                <CardTitle className={`text-xl text-text font-rubik-bold`}>
                  <Text>washing</Text>
                  <Text>10 min</Text>
                </CardTitle>
              </CardHeader>
            </Card>
            <Card
              className={`flex flex-row w-full my-2 px-4 items-center justify-between`}
            >
              <CardHeader className="flex flex-col px-1 max-w-72">
                <CardTitle className={`text-xl text-text font-rubik-bold`}>
                  <Text>washing</Text>
                  <Text>10 min</Text>
                </CardTitle>
              </CardHeader>
            </Card>
          </View>
          <View>
            <Text>day</Text>
            <Card
              className={`flex flex-row w-full my-2 px-4 items-center justify-between`}
            >
              <CardHeader className="flex flex-col px-1 max-w-72">
                <CardTitle className={`text-xl text-text font-rubik-bold`}>
                  <Text>washing</Text>
                  <Text>10 min</Text>
                </CardTitle>
              </CardHeader>
            </Card>
            <Card
              className={`flex flex-row w-full my-2 px-4 items-center justify-between`}
            >
              <CardHeader className="flex flex-col px-1 max-w-72">
                <CardTitle className={`text-xl text-text font-rubik-bold`}>
                  <Text>washing</Text>
                  <Text>10 min</Text>
                </CardTitle>
              </CardHeader>
            </Card>
            <Card
              className={`flex flex-row w-full my-2 px-4 items-center justify-between`}
            >
              <CardHeader className="flex flex-col px-1 max-w-72">
                <CardTitle className={`text-xl text-text font-rubik-bold`}>
                  <Text>washing</Text>
                  <Text>10 min</Text>
                </CardTitle>
              </CardHeader>
            </Card>
          </View>
          <View>
            <Text>evning</Text>
            <Card
              className={`flex flex-row w-full my-2 px-4 items-center justify-between`}
            >
              <CardHeader className="flex flex-col px-1 max-w-72">
                <CardTitle className={`text-xl text-text font-rubik-bold`}>
                  <Text>washing</Text>
                  <Text>10 min</Text>
                </CardTitle>
              </CardHeader>
            </Card>
            <Card
              className={`flex flex-row w-full my-2 px-4 items-center justify-between`}
            >
              <CardHeader className="flex flex-col px-1 max-w-72">
                <CardTitle className={`text-xl text-text font-rubik-bold`}>
                  <Text>washing</Text>
                  <Text>10 min</Text>
                </CardTitle>
              </CardHeader>
            </Card>
            <Card
              className={`flex flex-row w-full my-2 px-4 items-center justify-between`}
            >
              <CardHeader className="flex flex-col px-1 max-w-72">
                <CardTitle className={`text-xl text-text font-rubik-bold`}>
                  <Text>washing</Text>
                  <Text>10 min</Text>
                </CardTitle>
              </CardHeader>
            </Card>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default NewTask;
