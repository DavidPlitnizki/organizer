import React, { memo } from 'react';

import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { useColorScheme } from '~/lib/useColorScheme';

interface IProps {
  children: React.ReactNode;
}

const LoaderView = ({ children }: IProps) => {
  const { isDarkColorScheme } = useColorScheme();
  const AnimatedView = Animated.createAnimatedComponent(View);

  const opacityNumber = isDarkColorScheme ? 90 : 10;

  return (
    <AnimatedView
      className={`flex-1 w-full h-full justify-center items-center bg-card-foreground/${String(opacityNumber)}`}
      entering={FadeInDown.duration(0)}
      exiting={FadeOutDown.duration(150)}
    >
      {children}
    </AnimatedView>
  );
};

export default memo(LoaderView);
