import { ActivityIndicator, FlatList, Platform } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import YesOrNoModalProps from '~/widgets/YesOrNoModal';
import CardTask from '~/widgets/CardTask';
import SearchCard from '~/widgets/SearchCard';
import { View } from 'react-native';
import { auth } from '~/lib/firebase.config';
import { useIsFocused } from '@react-navigation/native';
import { TaskStatusType } from '~/lib/types';
import useGetTasks from '~/api/tasks/usGetTasks';
import useToggleTask from '~/api/tasks/useToggleTask';
import useDeleteTask from '~/api/tasks/useDeleteTask';
import { useTheme } from '@react-navigation/native';
import LoaderView from '~/widgets/LoaderView';
import { router } from 'expo-router';

export default function Home() {
  const { getData, tasks, setTasks, isPending } = useGetTasks();
  const {
    toggleStatusTask,
    errorMsg: toggleErrorMsg,
    isPending: pendingToggleTask,
  } = useToggleTask();
  const {
    deleteTask,
    errorMsg: deleteErrorMsg,
    isPending: pendingDeleteTask,
  } = useDeleteTask();
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedTaskID, setSelectedTaskID] = useState('');
  const [loadingStateTaskIds, setLoadingStateTaskIds] = useState<string[]>([
    '',
  ]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (auth.currentUser?.email && isFocused) {
      getData(auth.currentUser.email);
    }
  }, [getData, isFocused]);

  const storeTaskIdsManipulate = (taskId: string) => {
    setLoadingStateTaskIds((prev) => [...prev, taskId]);
  };

  const removeTaskIdsManipulate = useCallback(
    (taskId: string) => {
      const excludeId = loadingStateTaskIds.filter((id) => id !== taskId);
      setLoadingStateTaskIds(excludeId);
    },
    [loadingStateTaskIds]
  );

  const onToggleStatusTask = useCallback(
    async (taskId: string, status: TaskStatusType) => {
      storeTaskIdsManipulate(taskId);
      await toggleStatusTask(taskId, status);
      if (!toggleErrorMsg) {
        const updatedStatusTasks = tasks.map((item) => {
          if (item.id === taskId) {
            return {
              ...item,
              status,
            };
          }
          return item;
        });
        setTasks(updatedStatusTasks);
      }
      removeTaskIdsManipulate(taskId);
    },
    [removeTaskIdsManipulate, setTasks, tasks, toggleErrorMsg, toggleStatusTask]
  );

  const onAskDeletingTask = useCallback((taskId: string) => {
    setSelectedTaskID(taskId);
    setModalVisible(true);
  }, []);

  const onCancelDeletingTask = useCallback(() => {
    setSelectedTaskID('');
  }, []);

  const onDeleteTask = useCallback(async () => {
    if (!selectedTaskID) return;
    storeTaskIdsManipulate(selectedTaskID);
    await deleteTask(selectedTaskID);
    if (!deleteErrorMsg) {
      const removedTasks = tasks.filter((item) => item.id !== selectedTaskID);
      setTasks(removedTasks);
      removeTaskIdsManipulate(selectedTaskID);
    }
    setSelectedTaskID('');
  }, [
    deleteErrorMsg,
    deleteTask,
    removeTaskIdsManipulate,
    selectedTaskID,
    setTasks,
    tasks,
  ]);

  const filteredData = useMemo(() => {
    return tasks.filter((el) =>
      el.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, tasks]);

  const onpPressTask = useCallback((id: string) => {
    router.push({
      pathname: '/taskProperties/[id]',
      params: { id },
    });
  }, []);

  const isPendingTaskState = useCallback(
    (taskId: string) => {
      return (
        (pendingToggleTask || pendingDeleteTask) &&
        loadingStateTaskIds.find(
          (id) => id.toLowerCase() === taskId.toLowerCase()
        )
      );
    },
    [loadingStateTaskIds, pendingDeleteTask, pendingToggleTask]
  );

  const paddingBottom = Platform.OS === 'ios' ? 'pb-28' : 'pb-24';

  if (isPending) {
    return (
      <LoaderView>
        <ActivityIndicator size="large" color={colors.primary} />
      </LoaderView>
    );
  }

  return (
    <View className={`relative px-2 mt-4 h-full ${paddingBottom}`}>
      <SearchCard setValue={setSearchValue} setModalVisible={setModalVisible} />
      <FlatList
        className="mt-2"
        data={filteredData}
        renderItem={({ item }) => (
          <CardTask
            pressTask={onpPressTask}
            toggleStatus={onToggleStatusTask}
            deleteTask={onAskDeletingTask}
            isLoading={!!isPendingTaskState(item.id)}
            task={item}
          />
        )}
        keyExtractor={(item) => item.id}
      />

      <YesOrNoModalProps
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onCancel={onCancelDeletingTask}
        onSuccess={onDeleteTask}
        successText="Delete"
        cancelText="Cancel"
      />
    </View>
  );
}
