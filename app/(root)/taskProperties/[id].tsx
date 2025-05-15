import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { Text } from '~/components/ui/text';
import { useTheme } from '@react-navigation/native';
import useGetTasks from '~/api/tasks/usGetTasks';
import { auth } from '~/lib/firebase.config';
import { useIsFocused } from '@react-navigation/native';
import LoaderView from '~/widgets/LoaderView';
import { Separator } from '~/components/ui/separator';
import { Card } from '~/components/ui/card';
import { Checkbox } from '~/components/ui/checkbox';
import { Trash2 as DeleteIcon } from '~/lib/icons/DeleteIcon';
import { Button } from '~/components/ui/button';
import { H2, H4 } from '~/components/ui/typography';

const TaskProperties = () => {
  const { id } = useLocalSearchParams();
  const { colors } = useTheme();
  const { getData, tasks, isPending } = useGetTasks();
  const isFocused = useIsFocused();

  const isArrayOrString = (val: string | string[]): string => {
    return Array.isArray(val) ? (val.pop() ?? '') : val;
  };

  useEffect(() => {
    if (auth.currentUser?.email && isFocused) {
      let taskId: string = isArrayOrString(id);
      if (taskId.trim()) {
        getData(auth.currentUser.email, taskId);
      }
    }
  }, [getData, id, isFocused]);

  const checked = true;

  const onDeleteTask = () => {
    console.log('delete');
  };

  const onToggleStatus = () => {
    console.log('on toggle');
  };

  if (isPending) {
    return (
      <LoaderView>
        <ActivityIndicator size="large" color={colors.primary} />
      </LoaderView>
    );
  }

  console.log(tasks[0]);
  const task = tasks[0];

  if (!task) {
    return (
      <View>
        <Text>Something Wrong!!!</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerBackTitle: 'BACK',
          headerBackTitleStyle: {
            fontSize: 14,
            fontFamily: 'rubik-bold',
          },
        }}
      />
      <Card className="flex bg-indigo-100 relative p-4 mt-4 rounded-lg w-[92%] border shadow mx-auto">
        {/* Header */}
        <View>
          <H2>{task.title}</H2>
        </View>
        {/* Body */}
        <Separator className="bg-gray-900/35 my-4" />
        <ScrollView className="flex flex-col h-80 bg-secondary/75 rounded-lg p-4 border border-gray-300">
          <H4 className="font-rubik-medium">{task.description}</H4>
        </ScrollView>
        {/* bottom */}
        <View className="flex flex-row mt-8 items-center justify-end gap-12">
          <View className="scale-[2.3]">
            <Checkbox
              aria-labelledby="task_done"
              checked={checked}
              onCheckedChange={onToggleStatus}
            />
          </View>
          <Button
            size={'lg'}
            variant={'outline'}
            className="p-4 border-destructive bg-white"
            onPress={onDeleteTask}
          >
            <DeleteIcon color={'red'} />
          </Button>
        </View>
      </Card>
    </>
  );
};

export default TaskProperties;
