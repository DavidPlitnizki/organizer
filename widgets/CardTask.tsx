import React, { memo, useEffect } from 'react';
import { useMemo, useState } from 'react';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Checkbox } from '~/components/ui/checkbox';
import { Trash2 as DeleteIcon } from '~/lib/icons/DeleteIcon';
import { TaskStatus } from '~/lib/types';
import { Text } from '~/components/ui/text';
import { View } from 'react-native';

const CARD_COLORS = [
  'bg-emerald-100',
  'bg-teal-100',
  'bg-cyan-100',
  'bg-sky-100',
  'bg-blue-100',
  'bg-indigo-100',
  'bg-violet-100',
  'bg-purple-100',
  'bg-fuchsia-100',
  'bg-pink-100',
  'bg-rose-100',
];

interface CardTaskProps {
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  owner: string;
  id: string;
  toggleStatus: () => void;
  deleteTask: () => void;
}

const CardTask = memo(
  ({ taskData, toggleStatus, deleteTask }: CardTaskProps) => {
    const [checked, setChecked] = useState(taskData.status === 'done');
    const randomNumber = useMemo(
      () => Math.floor(Math.random() * CARD_COLORS.length),
      []
    );

    const onDeleteTask = () => {
      deleteTask(taskData.id);
    };

    useEffect(() => {
      console.log('here');
      const status = taskData.status === 'done' ? 'in progress' : 'done';
      toggleStatus(taskData.id, status);
    }, [checked]);

    // const onToggleStatusTask = () => {
    //   const status = taskData.status === 'done' ? 'in progress' : 'done';
    //   toggleStatus(taskData.id, status);
    // };

    return (
      <Card
        className={`flex flex-row w-full my-2 px-4 items-center justify-between ${checked ? 'bg-gray-300' : CARD_COLORS[randomNumber]}`}
      >
        <CardHeader className="flex flex-col px-1 max-w-72">
          <CardTitle className="mb-4">
            <View className="flex flex-row w-full justify-between items-center">
              <Text
                className={`text-xl text-text font-rubik-bold ${checked ? 'line-through text-muted-foreground' : ''}`}
              >
                {taskData.title}
              </Text>
              <Text
                className={`text-base text-text font-rubik-light ${checked ? 'line-through text-muted-foreground' : ''}`}
              >
                {taskData.createdAt}
              </Text>
            </View>
          </CardTitle>
          <CardDescription
            className={`${checked ? 'line-through text-muted-foreground' : ''}`}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            <Text className="text-md font-rubik-medium">
              {taskData.description}
            </Text>
          </CardDescription>
        </CardHeader>

        <CardFooter className="p-0 h-full items-end justify-center gap-8 mb-4">
          <Checkbox
            className="mb-1.5"
            aria-labelledby="task_done"
            checked={checked}
            onCheckedChange={setChecked}
          />
          <Button
            size={'sm'}
            variant={'outline'}
            className="p-2 border-destructive bg-white"
            onPress={onDeleteTask}
          >
            <DeleteIcon color={'red'} />
          </Button>
        </CardFooter>
      </Card>
    );
  }
);

CardTask.displayName = 'CardTask';

export default CardTask;
