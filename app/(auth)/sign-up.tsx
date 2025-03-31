import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import IconLogoWhite from '../../assets/images/icon-wh.png';
import IconLogoBlack from '../../assets/images/icon-bl.png';
import { Eye as EyeIcon } from '~/lib/icons/EyeIcon';
import { EyeOff as EyeOffIcon } from '~/lib/icons/EyeOffIcon';
import { OctagonAlert as AlertIcon } from '~/lib/icons/AlertIcon';
import { useColorScheme } from '../../lib/useColorScheme';
import { Link, router } from 'expo-router';
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import { useTheme } from '@react-navigation/native';
import { Button } from '~/components/ui/button';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '~/lib/firebase.config';

const SignUp = () => {
  const { isDarkColorScheme } = useColorScheme();
  const { colors } = useTheme();
  const [usernameValue, setUsernameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [isSecureText, setIsSecureText] = useState(true);

  const onChangeUsernameValue = (text: string) => {
    setUsernameValue(text);
  };

  const onChangeEmailValue = (text: string) => {
    setEmailValue(text);
  };
  const onChangePasswordValue = (text: string) => {
    setPasswordValue(text);
  };

  const toggleIsSecureText = () => {
    setIsSecureText((prev) => !prev);
  };

  const onHandleSubmit = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailValue,
        passwordValue
      );
      if (userCredential) {
        const user = userCredential.user;
        if (user) {
          await updateProfile(user, {
            displayName: usernameValue,
          });
          router.replace('/(root)/(tabs)');
        }
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <SafeAreaView className="h-full">
      <ScrollView contentContainerClassName="h-full">
        <Image
          source={isDarkColorScheme ? IconLogoBlack : IconLogoWhite}
          className="w-full h-2/5"
          resizeMode="contain"
        />

        <View className="px-10 flex-col gap-6">
          <View>
            <Label nativeID="email" className="font-rubik-semibold mb-2">
              Username
            </Label>
            <Input
              placeholder="Username..."
              value={usernameValue}
              onChangeText={onChangeUsernameValue}
              aria-labelledby="username"
            />
          </View>
          <View>
            <Label nativeID="email" className="font-rubik-semibold mb-2">
              Email
            </Label>
            <Input
              keyboardType="email-address"
              placeholder="Email..."
              value={emailValue}
              onChangeText={onChangeEmailValue}
              aria-labelledby="email"
            />
          </View>
          <View>
            <Label nativeID="password" className="font-rubik-semibold mb-2">
              Password
            </Label>
            <View className="flex flex-row justify-between items-center">
              <Input
                secureTextEntry={isSecureText}
                placeholder="Password..."
                value={passwordValue}
                onChangeText={onChangePasswordValue}
                aria-labelledby="password"
                className="w-10/12"
              />

              <TouchableOpacity onPress={toggleIsSecureText}>
                {isSecureText ? (
                  <EyeIcon color={colors.primary} />
                ) : (
                  <EyeOffIcon color={colors.primary} />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex flex-row">
            <AlertIcon className="text-destructive mr-2 items-center" />
            <Text className="text-destructive font-rubik-semibold text-lg">
              Error
            </Text>
          </View>
          <Button onPress={onHandleSubmit}>
            <Text className="text-accent font-rubik-semibold">Create User</Text>
          </Button>
        </View>
        <Text className="text-lg font-rubik-light text-center mt-4 text-foreground">
          Have account?
          <Link
            replace
            href="/(auth)/sign-in"
            className="text-primary font-rubik-medium"
          >
            {'  '}
            Log in
          </Link>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
