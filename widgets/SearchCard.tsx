import React from 'react';
import { useTheme } from '@react-navigation/native';
import { View } from 'react-native';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { CircleEllipsis } from '~/lib/icons/CircleEllipsis';

interface IProps {
  value: string;
  setValue: (value: string) => void;
}

const SearchCard = ({ value, setValue }: IProps) => {
  const { colors } = useTheme();
  return (
    <Card className={`relative flex flex-col w-full`}>
      <View className="relative flex flex-row w-full justify-center items-center gap-4 py-4">
        <Input
          className="w-72"
          id="search"
          placeholder="Search Tasks..."
          value={value}
          onChangeText={setValue}
          aria-labelledby="inputLabel"
          aria-errormessage="inputError"
        />
        <Button variant={'ghost'} className="rounded-full m-0 p-0 w-12">
          <CircleEllipsis size={32} color={colors.text} />
        </Button>
      </View>
    </Card>
  );
};

export default SearchCard;
