import { doc, updateDoc } from 'firebase/firestore';
import { useCallback, useState } from 'react';
import { ZodError } from 'zod';
import { db } from '~/lib/firebase.config';
import { TaskStatusType } from '~/lib/types';

const useToggleTask = () => {
  const [isPending, setIsPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | ZodError | Error | null>(
    null
  );
  const toggleStatusTask = useCallback(
    async (taskId: string, status: TaskStatusType) => {
      try {
        setIsPending(true);
        await updateDoc(doc(db, 'tasks', taskId), {
          status: status,
        });
        console.log('Status updated');
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
    },
    []
  );

  return {
    toggleStatusTask,
    isPending,
    errorMsg,
  };
};

export default useToggleTask;
