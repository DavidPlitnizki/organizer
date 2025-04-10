import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import IconLogoWhite from '../../assets/images/icon-wh.png';
import IconLogoBlack from '../../assets/images/icon-bl.png';
import { useColorScheme } from '../../lib/useColorScheme';
import { Link, router } from 'expo-router';
import { Input } from '~/components/ui/input';
import { Eye as EyeIcon } from '~/lib/icons/EyeIcon';
import { EyeOff as EyeOffIcon } from '~/lib/icons/EyeOffIcon';
import { useTheme } from '@react-navigation/native';
import { Button } from '~/components/ui/button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '~/lib/firebase.config';
import { OctagonAlert as AlertIcon } from '~/lib/icons/AlertIcon';

const signinSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignInFormDataType = z.infer<typeof signinSchema>;

const SignIn = () => {
  const { isDarkColorScheme } = useColorScheme();
  const { colors } = useTheme();
  const [isSecureText, setIsSecureText] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [responseErrorMsg, setResponseErrorMsg] = useState('');
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormDataType>({
    resolver: zodResolver(signinSchema),
  });

  const toggleIsSecureText = () => {
    setIsSecureText((prev) => !prev);
  };

  const onSubmit = async (data: SignInFormDataType) => {
    setResponseErrorMsg('');
    setIsPending(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      if (userCredential.user) {
        router.replace('/(root)/(tabs)');
      }
    } catch (error: any) {
      if (error.code) {
        switch (error.code) {
          case 'auth/invalid-email':
            setResponseErrorMsg('Please enter a valid email address.');
            break;
          case 'auth/user-disabled':
            setResponseErrorMsg('Your account has been disabled.');
            break;
          case 'auth/user-not-found':
            setResponseErrorMsg('No account found with this email address.');
            break;
          case 'auth/wrong-password':
            setResponseErrorMsg('Incorrect password. Please try again.');
            break;
          case 'auth/too-many-requests':
            setResponseErrorMsg(
              'Too many login attempts. Please try again later.'
            );
            break;
          case 'auth/network-request-failed':
            setResponseErrorMsg('Network error. Please check your connection.');
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
          className="w-full h-3/6"
          resizeMode="contain"
        />
        <View className="px-10 flex-col gap-6">
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
            <Text className="text-accent font-rubik-semibold">Sign In</Text>
          </Button>
          <Text className="text-lg font-rubik-light text-center mt-8 text-foreground">
            Don`t have an account?
            <Link
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
