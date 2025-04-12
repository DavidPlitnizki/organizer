import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button } from '~/components/ui/button';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '~/lib/firebase.config';
import { TaskType } from '~/lib/types';

const taskSchema = z.object({
  title: z.string().min(3, { message: 'Must be at least 3 characters' }),
  description: z.string().min(3, { message: 'Must be at least 3 characters' }),
});

type TaskFormDataType = z.infer<typeof taskSchema>;

const NewTask = () => {
  const [isPending, setIsPending] = useState(false);
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
    setIsPending(true);
    const now = new Date();
    const formatted = now.toLocaleString();

    const newTask: TaskType = {
      title: data.title,
      description: data.description,
      status: 'in progress',
      createdAt: formatted,
      owner: auth.currentUser.email,
    };

    try {
      const docRef = await addDoc(collection(db, 'tasks'), newTask);
      console.log('Card written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding card: ', e);
    } finally {
      setIsPending(false);
      reset();
    }
  };

  return (
    <View className="relative px-2 h-full pb-20">
      <View className="mt-4 gap-2">
        <Text className="font-rubik-bold text-3xl">Create New Task</Text>
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
            render={({ field: { onChange, onBlur, value } }) => (
              <Textarea
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

        {/* <View className="flex flex-row items-center">
          {responseErrorMsg.length ? (
            <>
              <AlertIcon className="text-destructive mr-2 items-center" />
              <Text className="text-destructive font-rubik-semibold text-base">
                {responseErrorMsg}
              </Text>
            </>
          ) : null}
        </View> */}
        <Button onPress={handleSubmit(onHandleSubmit)} disabled={isPending}>
          <Text className="text-accent font-rubik-semibold">Create Task</Text>
        </Button>
      </View>
    </View>
  );
};

export default NewTask;
