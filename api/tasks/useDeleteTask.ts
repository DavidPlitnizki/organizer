import { deleteDoc, doc } from 'firebase/firestore';
import { useCallback, useState } from 'react';
import { db } from '~/lib/firebase.config';
import { ZodError } from 'zod';

const useDeleteTask = () => {
  const [isPending, setIsPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | ZodError | Error | null>(
    null
  );
  const deleteTask = useCallback(async (taskId: string) => {
    try {
      setIsPending(true);
      await deleteDoc(doc(db, 'tasks', taskId));
      console.log('Task deleted');
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
    deleteTask,
    isPending,
    errorMsg,
  };
};

export default useDeleteTask;
