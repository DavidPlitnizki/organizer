import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import IconLogoWhite from '../../assets/images/icon-wh.png';
import IconLogoBlack from '../../assets/images/icon-bl.png';
import { Eye as EyeIcon } from '~/lib/icons/EyeIcon';
import { EyeOff as EyeOffIcon } from '~/lib/icons/EyeOffIcon';
import { OctagonAlert as AlertIcon } from '~/lib/icons/AlertIcon';
import { useColorScheme } from '../../lib/useColorScheme';
import { router } from 'expo-router';
import { Input } from '~/components/ui/input';
import { useTheme } from '@react-navigation/native';
import { Button } from '~/components/ui/button';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '~/lib/firebase.config';

const signupSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignUpFormDataType = z.infer<typeof signupSchema>;

const SignUp = () => {
  const { isDarkColorScheme } = useColorScheme();
  const { colors } = useTheme();
  const [isSecureText, setIsSecureText] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [responseErrorMsg, setResponseErrorMsg] = useState('');
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormDataType>({
    resolver: zodResolver(signupSchema),
  });

  const toggleIsSecureText = () => {
    setIsSecureText((prev) => !prev);
  };

  const onSubmit = async (data: SignUpFormDataType) => {
    setResponseErrorMsg('');
    setIsPending(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: data.username,
        });
        router.replace('/(root)/(tabs)');
      }
    } catch (error: any) {
      if (error.code) {
        switch (error.code) {
          case 'auth/weak-password':
            setResponseErrorMsg('Password should be at least 6 characters.');
            break;
          case 'auth/email-already-in-use':
            setResponseErrorMsg(
              'This email is already in use. Please try another.'
            );
            break;
          case 'auth/invalid-email':
            setResponseErrorMsg('Please enter a valid email address.');
            break;
          case 'auth/missing-email':
            setResponseErrorMsg('Please provide an email address.');
            break;
          case 'auth/operation-not-allowed':
            setResponseErrorMsg(
              'Email/password accounts are not enabled. Please enable it.'
            );
            break;
          default:
            setResponseErrorMsg('An unknown error occurred. Please try again.');
        }
      } else {
        setResponseErrorMsg('An error occurred. Please try again.');
      }
      console.log('Error Code:', error.code);
      console.log('Error Message:', error.message);
    } finally {
      setIsPending(false);
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
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Username..."
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="username"
            />
            {errors.username && (
              <Text className="text-destructive font-rubik-medium">
                {errors.username.message}
              </Text>
            )}
          </View>
          <View>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Email..."
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="email"
            />
            {errors.email && (
              <Text className="text-destructive font-rubik-medium">
                {errors.email.message}
              </Text>
            )}
          </View>
          <View>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="flex flex-row justify-between items-center">
                  <Input
                    secureTextEntry={isSecureText}
                    placeholder="Password..."
                    aria-labelledby="password"
                    className="w-10/12"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                  <TouchableOpacity onPress={toggleIsSecureText}>
                    {isSecureText ? (
                      <EyeOffIcon color={colors.primary} />
                    ) : (
                      <EyeIcon color={colors.primary} />
                    )}
                  </TouchableOpacity>
                </View>
              )}
              name="password"
            />
            {errors.password && (
              <Text className="text-destructive font-rubik-medium">
                {errors.password.message}
              </Text>
            )}
          </View>
          <View className="flex flex-row items-center">
            {responseErrorMsg.length ? (
              <>
                <AlertIcon className="text-destructive mr-2 items-center" />
                <Text className="text-destructive font-rubik-semibold text-base">
                  {responseErrorMsg}
                </Text>
              </>
            ) : null}
          </View>
          <Button onPress={handleSubmit(onSubmit)} disabled={isPending}>
            <Text className="text-accent font-rubik-semibold">Create User</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
