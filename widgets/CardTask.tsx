import React, { memo } from 'react';
import { useMemo } from 'react';
import { Button } from '~/components/ui/button';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Checkbox } from '~/components/ui/checkbox';
import { Trash2 as DeleteIcon } from '~/lib/icons/DeleteIcon';
import { ArchiveRestore as ArchiveIcon } from '~/lib/icons/ArchiveIcon';
import { TaskDataWithID, TaskStatusSchema, TaskStatusType } from '~/lib/types';
import { Text } from '~/components/ui/text';
import {
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  View,
} from 'react-native';
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
  pressTask: (value: string) => void;
  isLoading: boolean;
}

const MULTIPLIER = 0.25;
const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = -SCREEN_WIDTH * MULTIPLIER;

type ContextType = {
  startX: number;
};

const CardTask = memo(
  ({ task, toggleStatus, deleteTask, isLoading, pressTask }: TaskProps) => {
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

    const onPressHandle = () => {
      pressTask(task.id);
    };

    const translateX = useSharedValue(0);
    if (isLoading) {
      translateX.value = withSpring(0);
    }

    const gestureHandler = useAnimatedGestureHandler<
      PanGestureHandlerGestureEvent,
      ContextType
    >({
      onStart: (_, ctx) => {
        ctx.startX = translateX.value;
      },
      onActive: (event, ctx) => {
        translateX.value = ctx.startX + event.translationX;
      },
      onEnd: () => {
        if (Math.abs(translateX.value) > 0 && Math.abs(translateX.value) < 50) {
          translateX.value = withSpring(0);
          return;
        }
        if (translateX.value < -SWIPE_THRESHOLD) {
          // Swipe Left → Trigger Delete
          translateX.value = withSpring(-SCREEN_WIDTH * MULTIPLIER, {}, () => {
            // runOnJS(onDelete)();
          });
        } else if (translateX.value > SWIPE_THRESHOLD) {
          // Swipe Right → Trigger Favorite
          translateX.value = withSpring(SCREEN_WIDTH * MULTIPLIER, {}, () => {
            // runOnJS(onFavorite)();
          });
        } else {
          translateX.value = withSpring(0);
        }
      },
    });

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: translateX.value }],
    }));

    return (
      <>
        <Card className="absolute w-full overflow-hidden h-[87%] my-2 flex-1 flex flex-row justify-between items-center box-border shadow-none border-0">
          <View className="rounded-lg h-full w-1/4 bg-green-400 p-4 flex flex-col justify-center items-center">
            <Button
              size={'lg'}
              variant={'outline'}
              className="p-4 border-green-600 border-2 shadow"
              onPress={() => console.log('archive task')}
            >
              <ArchiveIcon color={'green'} />
            </Button>
          </View>
          <View className="rounded-lg h-full w-1/4 bg-red-400 p-4 flex flex-col justify-center items-center">
            <Button
              size={'lg'}
              variant={'outline'}
              className="p-4 border-destructive border-2 shadow"
              onPress={onDeleteTask}
            >
              <DeleteIcon color={'red'} />
            </Button>
          </View>
        </Card>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[animatedStyle]}>
            <TouchableOpacity onPress={onPressHandle} activeOpacity={0.8}>
              <Card
                className={`relative flex-1 flex-row overflow-hidden w-full my-2 px-4 items-center justify-between ${checked ? 'bg-gray-300' : CARD_COLORS[randomNumber]}`}
              >
                {isLoading ? (
                  <Animated.View
                    entering={FadeIn}
                    exiting={FadeOut}
                    className="absolute w-[120%] h-full flex-1 justify-center items-center bg-card-foreground/70"
                  >
                    <ActivityIndicator size="large" color={colors.card} />
                  </Animated.View>
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

                <CardFooter className="p-0 h-full items-center justify-center mr-2">
                  <Checkbox
                    className="scale-125"
                    aria-labelledby="task_done"
                    checked={checked}
                    onCheckedChange={onToggleStatus}
                  />
                </CardFooter>
              </Card>
            </TouchableOpacity>
          </Animated.View>
        </PanGestureHandler>
      </>
    );
  }
);

CardTask.displayName = 'CardTask';

export default CardTask;
