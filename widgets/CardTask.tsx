import React from 'react';
import { View } from 'react-native';
import { useMemo, useState } from 'react';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Checkbox } from '~/components/ui/checkbox';
import { Trash2 as DeleteIcon } from '~/lib/icons/DeleteIcon';

const CARD_COLORS = [
  'bg-emerald-100',
  'bg-teal-100',
  'bg-cyan-100',
  'bg-sky-100',
  'bg-blue-100',
  'bg-indigo-100',
  'bg-violet-100',
  'bg-purple-100',
  'bg-fuchsia-100',
  'bg-pink-100',
  'bg-rose-100',
];

interface CardTaskProps {
  title: string;
}

const CardTask = ({ title }: CardTaskProps) => {
  const [checked, setChecked] = useState(false);
  const randomNumber = useMemo(
    () => Math.floor(Math.random() * CARD_COLORS.length),
    []
  );

  return (
    <Card
      className={`flex flex-row w-full my-2 px-4 items-center justify-between ${checked ? 'bg-gray-300' : CARD_COLORS[randomNumber]}`}
    >
      <CardHeader className="flex flex-col px-1 max-w-72">
        <CardTitle
          className={`text-xl text-text font-rubik-bold ${checked ? 'line-through text-muted-foreground' : ''}`}
        >
          {title}
        </CardTitle>
        <CardDescription
          className={`${checked ? 'line-through text-muted-foreground' : ''}`}
          numberOfLines={3}
          ellipsizeMode="tail"
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate,
          ducimus molestias. Illum voluptatem, fuga qui provident eligendi
          fugiat, praesentium quidem dolor atque iure necessitatibus ducimus
          quis vero quisquam debitis! Ipsum.
        </CardDescription>
      </CardHeader>

      <CardFooter className="p-0 items-center justify-center gap-8">
        <Button
          size={'sm'}
          variant={'outline'}
          className="p-2 border-destructive bg-white"
        >
          <DeleteIcon color={'red'} />
        </Button>
        <View className="flex flex-row">
          <Checkbox
            aria-labelledby="task_done"
            checked={checked}
            onCheckedChange={setChecked}
          />
        </View>
      </CardFooter>
    </Card>
  );
};

export default CardTask;
