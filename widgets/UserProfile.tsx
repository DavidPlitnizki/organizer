import React from 'react';
import { Text } from 'react-native';
import { Avatar, AvatarFallback } from '~/components/ui/avatar';
import { signOut } from 'firebase/auth';
import { auth } from '~/lib/firebase.config';

const UserProfile = () => {
  const user = auth.currentUser;
  const userSign = user?.displayName ? user.displayName.slice(0, 2) : '--';

  //temp sign out - should be remove in the future
  const onHandle = () => {
    signOut(auth);
  };

  return (
    <Avatar onTouchEnd={onHandle} alt={user?.displayName || 'user'}>
      <AvatarFallback className="bg-primary">
        <Text className="text-primary-foreground font-rubik-semibold uppercase">
          {userSign}
        </Text>
      </AvatarFallback>
    </Avatar>
  );
};

export default UserProfile;
