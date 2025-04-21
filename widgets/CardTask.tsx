import React, { memo } from 'react';
import { useMemo } from 'react';
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
import { TaskDataWithID, TaskStatusSchema, TaskStatusType } from '~/lib/types';
import { Text } from '~/components/ui/text';
import { ActivityIndicator, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

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

interface TaskProps {
  task: TaskDataWithID;
  toggleStatus: (taskId: string, status: TaskStatusType) => void;
  deleteTask: (taskID: string) => void;
  isLoading: boolean;
}

const CardTask = memo(
  ({ task, toggleStatus, deleteTask, isLoading }: TaskProps) => {
    const { colors } = useTheme();
    const checked = task.status === TaskStatusSchema.Values.done;
    const randomNumber = useMemo(
      () => Math.floor(Math.random() * CARD_COLORS.length),
      []
    );

    const onDeleteTask = () => {
      deleteTask(task.id);
    };

    const onToggleStatus = () => {
      const status =
        task.status === TaskStatusSchema.Values.done
          ? TaskStatusSchema.Values.active
          : TaskStatusSchema.Values.done;
      toggleStatus(task.id, status);
    };

    return (
      <Card
        className={`relative flex-1 flex-row overflow-hidden w-full my-2 px-4 items-center justify-between ${checked ? 'bg-gray-300' : CARD_COLORS[randomNumber]}`}
      >
        {isLoading ? (
          <View className="absolute w-[120%] h-full flex-1 justify-center items-center bg-card-foreground/70">
            <ActivityIndicator size="large" color={colors.card} />
          </View>
        ) : null}
        <CardHeader className="flex flex-col px-1 max-w-72">
          <CardTitle className="mb-4">
            <View className="flex flex-row w-full justify-between items-center">
              <Text
                className={`text-xl text-text font-rubik-bold ${checked ? 'line-through text-muted-foreground' : ''}`}
              >
                {task.title}
              </Text>
              <Text
                className={`text-base text-text font-rubik-light ${checked ? 'line-through text-muted-foreground' : ''}`}
              >
                {task.createdAt.toDate().toLocaleString()}
              </Text>
            </View>
          </CardTitle>
          <CardDescription
            className={`${checked ? 'line-through text-muted-foreground' : ''}`}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            <Text className="text-md text-black font-rubik-medium">
              {task.description}
            </Text>
          </CardDescription>
        </CardHeader>

        <CardFooter className="p-0 h-full items-end justify-center gap-8 mb-4">
          <Checkbox
            className="mb-1.5"
            aria-labelledby="task_done"
            checked={checked}
            onCheckedChange={onToggleStatus}
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
