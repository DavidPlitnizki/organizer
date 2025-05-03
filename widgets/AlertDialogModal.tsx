import React, { memo } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '~/components/ui/alert-dialog';
import { Text } from '~/components/ui/text';

interface AlertDialogModalProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  onCancel?: () => void;
  onSuccess: () => void;
  cancelText?: string;
  cancelColor?: string;
  successText?: string;
  successColor?: string;
}

const AlertDialogModal = memo(
  ({
    modalVisible,
    setModalVisible,
    onSuccess,
    onCancel = () => {},
    cancelText = 'No',
    successText = 'Yes',
  }: AlertDialogModalProps) => {
    return (
      <AlertDialog open={modalVisible}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              task and remove task from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-row justify-end items-center">
            <AlertDialogCancel
              onPress={() => {
                onCancel();
                setModalVisible(false);
              }}
            >
              <Text className="font-rubik-semibold">{cancelText}</Text>
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive"
              onPress={() => {
                setModalVisible(false);
                onSuccess();
              }}
            >
              <Text className="font-rubik-semibold">{successText}</Text>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
);

AlertDialogModal.displayName = 'AlertDialogModal';

export default AlertDialogModal;
