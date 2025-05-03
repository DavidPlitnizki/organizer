import { View, Modal } from 'react-native';
import React, { memo } from 'react';
import { Button, buttonVariants } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { VariantProps } from 'class-variance-authority';
import { Label } from '~/components/ui/label';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';

type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];

interface SortTaskModalProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  onCancel?: () => void;
  onSuccess: () => void;
  cancelText?: string;
  cancelColor?: string;
  successText?: string;
  successColor?: string;
  variantCancelButton?: ButtonVariant;
  variantSuccessButton?: ButtonVariant;
}

const RadioGroupItemWithLabel = ({
  value,
  onLabelPress,
}: {
  value: string;
  onLabelPress: () => void;
}) => {
  return (
    <View className={'flex-row gap-2 items-center'}>
      <RadioGroupItem
        className="native:w-8 native:h-8 border-2"
        aria-labelledby={`label-for-${value}`}
        value={value}
      />
      <Label
        nativeID={`label-for-${value}`}
        onPress={onLabelPress}
        className="font-rubik-semibold native:text-lg"
      >
        {value}
      </Label>
    </View>
  );
};

const SortTaskModal = memo(
  ({
    modalVisible,
    setModalVisible,
    onSuccess,
    onCancel = () => {},
    cancelText = 'No',
    successText = 'Yes',
    variantCancelButton = 'secondary',
    variantSuccessButton = 'default',
  }: SortTaskModalProps) => {
    const [value, setValue] = React.useState('Comfortable');

    const onLabelPress = (label: string) => {
      return () => {
        setValue(label);
      };
    };

    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View className="bg-popover border-t-hairline shadow p-4 absolute w-full h-[50%] bottom-0">
          <View className="flex-row justify-center">
            <Text className="font-rubik-bold text-2xl">Sorting</Text>
          </View>

          <View className="flex-1 justify-center items-center p-6">
            <RadioGroup
              value={value}
              onValueChange={setValue}
              className="gap-6"
            >
              <RadioGroupItemWithLabel
                value="Default"
                onLabelPress={onLabelPress('Default')}
              />
              <RadioGroupItemWithLabel
                value="Comfortable"
                onLabelPress={onLabelPress('Comfortable')}
              />
              <RadioGroupItemWithLabel
                value="Compact"
                onLabelPress={onLabelPress('Compact')}
              />
            </RadioGroup>
          </View>

          <View className="flex-1 flex-row justify-end items-end gap-8 mb-4">
            <Button
              variant={variantCancelButton}
              className="rounded-xl shadow-sm border border-border"
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
              variant={variantSuccessButton}
              className="rounded-xl shadow-sm border border-border"
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

SortTaskModal.displayName = 'SortTaskModal';

export default SortTaskModal;
