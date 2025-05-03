import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '~/components/ui/button';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { Timestamp } from 'firebase/firestore';
import { auth } from '~/lib/firebase.config';
import { TaskStatusSchema, TaskType } from '~/lib/types';
import useCreateTask from '~/api/tasks/useCreateTask';
import { OctagonAlert as AlertIcon } from '~/lib/icons/AlertIcon';

const taskSchema = z.object({
  title: z.string().min(3, { message: 'Must be at least 3 characters' }),
  description: z.string().min(3, { message: 'Must be at least 3 characters' }),
});

type TaskFormDataType = z.infer<typeof taskSchema>;

const NewTask = () => {
  const { isPending, errorMsg, createNewTask } = useCreateTask();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormDataType>({
    resolver: zodResolver(taskSchema),
  });

  const onHandleSubmit = async (data: TaskFormDataType) => {
    console.log('data: ', data);
    if (!auth.currentUser?.email) {
      console.log('Missing user data');
      return;
    }

    const newTask: TaskType = {
      title: data.title,
      description: data.description,
      status: TaskStatusSchema.Values.active,
      createdAt: Timestamp.now(),
      owner: auth.currentUser.email,
    };
    await createNewTask(newTask);
    reset();
  };

  return (
    <View className="relative px-2 h-full pb-20">
      <View className="mt-4 gap-2">
        <Text className="text-center font-rubik-bold text-3xl text-foreground">
          Create New Task
        </Text>
      </View>

      <View className="px-10 my-4 flex flex-col h-4/5 justify-center gap-4">
        <View>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Title..."
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="title"
          />
          {errors.title && (
            <Text className="text-destructive font-rubik-medium">
              {errors.title.message}
            </Text>
          )}
        </View>
        <View>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Textarea
                className="min-h-[30%]"
                placeholder="Description..."
                value={value}
                onChangeText={onChange}
                aria-labelledby="textareaLabel"
              />
            )}
            name="description"
          />
          {errors.description && (
            <Text className="text-destructive font-rubik-medium">
              {errors.description.message}
            </Text>
          )}
        </View>

        <View className="flex flex-row items-center">
          {errorMsg ? (
            <>
              <AlertIcon className="text-destructive mr-2 items-center" />
              <Text className="text-destructive font-rubik-semibold text-base">
                {errorMsg.toString()}
              </Text>
            </>
          ) : null}
        </View>
        <Button onPress={handleSubmit(onHandleSubmit)} disabled={isPending}>
          <Text className="text-accent font-rubik-semibold">Create Task</Text>
        </Button>
      </View>
    </View>
  );
};

export default NewTask;
