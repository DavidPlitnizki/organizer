import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { useCallback, useState } from 'react';
import { ZodError } from 'zod';
import { db } from '~/lib/firebase.config';
import { TaskDataWithID, TaskSchema } from '~/lib/types';

const useGetTasks = () => {
  const [tasks, setTasks] = useState<TaskDataWithID[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | ZodError | Error | null>(
    null
  );

  const getData = useCallback(async (email: string, id?: string) => {
    try {
      setIsPending(true);
      const filters = [where('owner', '==', email)];
      if (id?.trim()) {
        filters.push(where(documentId(), '==', id));
      }
      const q = query(collection(db, 'tasks'), ...filters);
      const querySnapshot = await getDocs(q);
      const tasks: TaskDataWithID[] = [];
      querySnapshot.docs.forEach((doc) => {
        const result = TaskSchema.safeParse(doc.data());
        if (result.success) {
          tasks.push({ id: doc.id, ...result.data });
        } else {
          console.warn('Invalid task data:', result.error);
          setErrorMsg(result.error);
        }
      });
      setTasks(tasks);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error('Error fetching tasks:', e.message);
        setErrorMsg(e.message);
      } else {
        console.error('Unknown error:', e);
        setErrorMsg('An unknown error occurred.');
      }
    } finally {
      setIsPending(false);
    }
  }, []);

  return {
    getData,
    tasks,
    setTasks,
    isPending,
    errorMsg,
  };
};

export default useGetTasks;
