import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import IconLogoWhite from '../../assets/images/icon-wh.png';
import IconLogoBlack from '../../assets/images/icon-bl.png';
import { useColorScheme } from '../../lib/useColorScheme';
import { Link, router } from 'expo-router';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Eye as EyeIcon } from '~/lib/icons/EyeIcon';
import { EyeOff as EyeOffIcon } from '~/lib/icons/EyeOffIcon';
import { useTheme } from '@react-navigation/native';
import { Button } from '~/components/ui/button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '~/lib/firebase.config';

const SignIn = () => {
  const { isDarkColorScheme } = useColorScheme();
  const { colors } = useTheme();
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [isSecureText, setIsSecureText] = useState(true);

  const onChangeEmailValue = (text: string) => {
    setEmailValue(text);
  };
  const onChangePasswordValue = (text: string) => {
    setPasswordValue(text);
  };

  const toggleIsSecureText = () => {
    setIsSecureText((prev) => !prev);
  };

  const onHandleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailValue,
        passwordValue
      );
      if (userCredential) {
        const user = userCredential.user;
        if (user) {
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
          className="w-full h-3/6"
          resizeMode="contain"
        />
        <View className="px-10 flex-col gap-6">
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
              aria-errormessage="inputError"
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
                aria-errormessage="inputError"
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
          <Button onPress={onHandleSignIn}>
            <Text className="text-accent font-rubik-semibold">Sign In</Text>
          </Button>
          <Text className="text-lg font-rubik-light text-center mt-8 text-foreground">
            Do not have account?
            <Link
              replace
              href="/(auth)/sign-up"
              className="text-primary font-rubik-medium"
            >
              {'  '}
              Create Account
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
