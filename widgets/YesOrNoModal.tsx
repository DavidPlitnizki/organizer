import { View, Modal } from 'react-native';
import React, { memo } from 'react';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

interface YesOrNoModalProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  onCancel?: () => void;
  onSuccess: () => void;
  cancelText?: string;
  cancelColor?: string;
  successText?: string;
  successColor?: string;
}

const YesOrNoModal = memo(
  ({
    modalVisible,
    setModalVisible,
    onSuccess,
    onCancel = () => {},
    cancelText = 'No',
    successText = 'Yes',
  }: YesOrNoModalProps) => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="bg-popover border-t-hairline shadow p-4 absolute w-full h-[15%] bottom-0">
          <View className="flex-row justify-center">
            <Text className="font-rubik-semibold text-2xl">Are You Sure!</Text>
          </View>
          <View className="flex-1 flex-row justify-evenly items-end mb-4">
            <Button
              className="rounded-xl shadow-sm bg-destructive"
              onPress={() => {
                setModalVisible(!modalVisible);
                onCancel();
              }}
            >
              <Text className="font-rubik-semibold text-black">
                {cancelText}
              </Text>
            </Button>
            <Button
              className="rounded-xl shadow-sm"
              onPress={() => {
                setModalVisible(!modalVisible);
                onSuccess();
              }}
            >
              <Text className="font-rubik-semibold">{successText}</Text>
            </Button>
          </View>
        </View>
      </Modal>
    );
  }
);

YesOrNoModal.displayName = 'YesOrNoModal';

export default YesOrNoModal;
