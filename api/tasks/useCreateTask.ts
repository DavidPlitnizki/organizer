import { addDoc, collection } from 'firebase/firestore';
import { useCallback, useState } from 'react';
import { ZodError } from 'zod';
import { db } from '~/lib/firebase.config';
import { TaskType } from '~/lib/types';

const useCreateTask = () => {
  const [isPending, setIsPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | ZodError | Error | null>(
    null
  );

  const createNewTask = useCallback(async (newTask: TaskType) => {
    try {
      setIsPending(true);
      const docRef = await addDoc(collection(db, 'tasks'), newTask);
      console.log('Task created: ', docRef.id);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error('Error create task:', e.message);
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
    errorMsg,
    createNewTask,
    isPending,
  };
};

export default useCreateTask;
