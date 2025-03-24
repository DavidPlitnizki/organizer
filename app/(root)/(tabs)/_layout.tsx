import React from 'react';
import { Tabs } from 'expo-router';
import { Home as HomeIcon } from '../../../lib/icons/HomeIcon';
import { NotepadText as PlannerIcon } from '../../../lib/icons/PlannerIcon';
import { View, Text } from 'react-native';
import { ElementType } from 'react';
import { useTheme } from '@react-navigation/native';
import { Plus as PlusIcon } from '../../../lib/icons/PlusIcon';
import { Button } from '~/components/ui/button';
import { useRouter } from 'expo-router';

const TabIcon = ({
  focused,
  icon,
  title,
}: {
  focused: boolean;
  icon: ElementType;
  title: string;
}) => {
  const { colors } = useTheme();
  const Icon = icon ?? <View />;
  return (
    <View className="flex-1 mt-3 flex flex-col items-center">
      <Icon color={focused ? colors.primary : colors.text} />
      <Text
        style={{ color: focused ? colors.primary : colors.text }}
        className={`${
          focused ? 'font-rubik-medium' : 'font-rubik'
        } text-md w-full text-center`}
      >
        {title}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  const router = useRouter();
  const { colors } = useTheme();
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          position: 'absolute',
          borderTopColor: colors.border,
          borderTopWidth: 1,
          minHeight: 70,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Home" icon={HomeIcon} />
          ),
        }}
      />
      <Tabs.Screen
        name="newTask"
        options={{
          title: 'Create',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Button
              className="rounded-full w-12 shadow-md top-3"
              onPress={() => router.push('/(root)/(tabs)/newTask')}
            >
              <PlusIcon color={colors.background} size={32} />
            </Button>
          ),
        }}
      />
      <Tabs.Screen
        name="planner"
        options={{
          title: 'Planner',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Planner" icon={PlannerIcon} />
          ),
        }}
      />
    </Tabs>
  );
};
export default TabsLayout;
