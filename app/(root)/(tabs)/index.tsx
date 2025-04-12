import { FlatList, Platform } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
// import { DATA } from '~/mockData';
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
// import { z } from 'zod';

export default function Home() {
  const [tasks, setTasks] = useState<any[]>([]);
  // const [isPending, setIsPending] = useState(false);
  // const [isError, setIsError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    const getData = async (email: string) => {
      // const snapshot = await getDocs(collection(db, 'tasks'));
      // const cards = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      // console.log(cards);

      // const TaskSchema = z.object({
      //   title: z.string(),
      //   description: z.string(),
      //   createdAt: z.date(),
      //   status: z.string(),
      //   owner: z.string(),
      // });
      // type TaskData = z.infer<typeof TaskSchema>;
      // type Task = TaskData & { id: string };

      const q = query(collection(db, 'tasks'), where('owner', '==', email));
      try {
        const querySnapshot = await getDocs(q);
        const tasks = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('My tasks:', tasks);
        setTasks(tasks);
        // return tasks;
      } catch (e) {
        console.error('Error fetching tasks:', e);
      }
    };
    if (auth.currentUser?.email && isFocused) {
      getData(auth.currentUser.email);
    }
  }, [isFocused]);

  const onToggleStatusTask = useCallback(
    async (taskId: string, status: string) => {
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
            taskData={item}
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
