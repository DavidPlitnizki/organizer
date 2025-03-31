import React, { memo, useEffect, useRef, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { View } from 'react-native';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { CircleEllipsis } from '~/lib/icons/CircleEllipsis';

interface IProps {
  setValue: (value: string) => void;
  setModalVisible: (value: boolean) => void;
}

const SearchCard = memo(({ setValue, setModalVisible }: IProps) => {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 300);
  }, [inputValue]);

  useEffect(() => {
    setValue(debouncedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <Card className={'relative flex flex-col w-full bg-secondary'}>
      <View className="relative flex flex-row w-full justify-center items-center gap-4 py-4">
        <Input
          style={{ borderColor: isFocused ? colors.primary : colors.text }}
          className="w-72"
          id="search"
          placeholder="Search Tasks..."
          value={inputValue}
          onChangeText={setInputValue}
          aria-labelledby="inputLabel"
          aria-errormessage="inputError"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <Button
          variant={'ghost'}
          className="rounded-full m-0 p-0 w-12 active:scale-95"
          onPress={() => setModalVisible(true)}
        >
          <CircleEllipsis size={32} color={colors.text} />
        </Button>
      </View>
    </Card>
  );
});

SearchCard.displayName = 'SearchCard';

export default SearchCard;
