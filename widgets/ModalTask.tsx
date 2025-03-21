import { View, Modal, Alert } from "react-native";
import React, { useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

interface ModalTaskProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}

const ModalTask = ({ modalVisible, setModalVisible }: ModalTaskProps) => {
  const [inputValue, setInputValue] = useState("");
  const [textAreaValue, setTextAreaValue] = useState("");
  const textAreaRef = useRef(null);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View className="bg-popover border-t-hairline shadow p-4 absolute w-full h-[60%] bottom-0">
        <View className="flex-row justify-center">
          <Text className="font-rubik-semibold text-2xl">Create Task!</Text>
        </View>
        <View className="relative flex flex-col gap-4 mt-4">
          <View>
            <Label nativeID="title_task" className="font-rubik-medium">
              Title
            </Label>
            <Input
              id="title_task"
              placeholder="Write some stuff..."
              value={inputValue}
              onChangeText={setInputValue}
              aria-labelledby="inputLabel"
              aria-errormessage="inputError"
            />
          </View>
          <View>
            <Label nativeID="description_task" className="font-rubik-medium">
              Description
            </Label>
            <Textarea
              className="h-[60%]"
              id="description_task"
              ref={textAreaRef}
              placeholder="Write some stuff..."
              value={textAreaValue}
              onChangeText={setTextAreaValue}
              aria-labelledby="textareaLabel"
            />
          </View>
        </View>
        <View className="flex-1 flex-row justify-evenly items-end mb-4">
          <Button
            className="rounded-xl shadow-sm bg-destructive"
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text className="font-rubik-semibold text-black">Cancel</Text>
          </Button>
          <Button
            className="rounded-xl shadow-sm"
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text className="font-rubik-semibold">Save</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default ModalTask;
