import { FlatList, Platform } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ModalTask from '~/widgets/ModalTask';
import CardTask from '~/widgets/CardTask';
import SearchCard from '~/widgets/SearchCard';
import { View } from 'react-native';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { auth, db } from '~/lib/firebase.config';
import { useIsFocused } from '@react-navigation/native';
import { TaskDataWithID, TaskSchema, TaskStatusType } from '~/lib/types';

export default function Home() {
  const [tasks, setTasks] = useState<TaskDataWithID[]>([]);
  // const [isPending, setIsPending] = useState(false);
  // const [isError, setIsError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    const getData = async (email: string) => {
      const q = query(collection(db, 'tasks'), where('owner', '==', email));
      try {
        const querySnapshot = await getDocs(q);
        const tasks: TaskDataWithID[] = [];
        querySnapshot.docs.forEach((doc) => {
          console.log('doc: ', doc.data());
          const result = TaskSchema.safeParse(doc.data());
          if (result.success) {
            tasks.push({ id: doc.id, ...result.data });
          } else {
            console.warn('Invalid task data:', result.error);
          }
        });
        console.log('My tasks:', tasks);
        setTasks(tasks);
      } catch (e) {
        console.error('Error fetching tasks:', e);
      }
    };
    if (auth.currentUser?.email && isFocused) {
      getData(auth.currentUser.email);
    }
  }, [isFocused]);

  const onToggleStatusTask = useCallback(
    async (taskId: string, status: TaskStatusType) => {
      try {
        await updateDoc(doc(db, 'tasks', taskId), {
          status: status,
        });
        console.log('Status updated');
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
      } catch (error) {
        console.error('Error updating status:', error);
      }
    },
    [tasks]
  );

  const onDeleteTask = useCallback(
    async (taskId: string) => {
      try {
        await deleteDoc(doc(db, 'tasks', taskId));
        console.log('Task deleted');
        const filteredTasks = tasks.filter((item) => item.id !== taskId);
        setTasks(filteredTasks);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    },
    [tasks]
  );

  const filteredData = useMemo(() => {
    return tasks.filter((el) =>
      el.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, tasks]);

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
