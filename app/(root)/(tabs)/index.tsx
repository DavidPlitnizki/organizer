import { FlatList, Platform } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ModalTask from '~/widgets/ModalTask';
import CardTask from '~/widgets/CardTask';
import SearchCard from '~/widgets/SearchCard';
import { View } from 'react-native';
import { auth } from '~/lib/firebase.config';
import { useIsFocused } from '@react-navigation/native';
import { TaskStatusType } from '~/lib/types';
import useGetTasks from '~/api/tasks/usGetTasks';
import useToggleTask from '~/api/tasks/useToggleTask';
import useDeleteTask from '~/api/tasks/useDeleteTask';

export default function Home() {
  const { getData, tasks, setTasks } = useGetTasks();
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
  const [modalVisible, setModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
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

  const onDeleteTask = useCallback(
    async (taskId: string) => {
      storeTaskIdsManipulate(taskId);
      await deleteTask(taskId);
      if (!deleteErrorMsg) {
        removeTaskIdsManipulate(taskId);
      }
    },
    [deleteErrorMsg, deleteTask, removeTaskIdsManipulate]
  );

  const filteredData = useMemo(() => {
    return tasks.filter((el) =>
      el.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, tasks]);

  const isPendingTaskState = useCallback(
    (id: string) => {
      return (
        pendingToggleTask ||
        (pendingDeleteTask && loadingStateTaskIds.includes(id))
      );
    },
    [loadingStateTaskIds, pendingDeleteTask, pendingToggleTask]
  );

  const paddingBottom = Platform.OS === 'ios' ? 'pb-28' : 'pb-24';

  return (
    <View className={`relative px-2 mt-4 h-full ${paddingBottom}`}>
      <SearchCard setValue={setSearchValue} setModalVisible={setModalVisible} />
      <FlatList
        className="mt-2"
        data={filteredData}
        renderItem={({ item }) => (
          <CardTask
            toggleStatus={onToggleStatusTask}
            deleteTask={onDeleteTask}
            isLoading={isPendingTaskState(item.id)}
            task={item}
          />
        )}
        keyExtractor={(item) => item.id}
      />

      <ModalTask
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
}
