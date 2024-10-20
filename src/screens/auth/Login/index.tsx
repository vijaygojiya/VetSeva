import {Pressable, Text, TextInput, View} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {AppStackScreenProps} from '@/types/navigation';
import {useTranslation} from 'react-i18next';
import {AppButton, AppTextInput} from '@/components';
import {
  EyeClosedSvg,
  EyeOpenSvg,
  LockOnSvg,
  MailSvg,
  WelcomeBackSvg,
} from '@/assets';
import styles from './styles';
import {useAppTheme} from '@/hooks';
import {AppRouts} from '@/router';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ZodError} from 'zod';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {signInUserWithFirebase} from '@/services/firebase';
import {loginSchema, zodErrorSimplify} from '@/utils';

const defaultValue = {
  email: '',
  password: '',
};
type inputKeys = keyof typeof defaultValue;

const LeftIcons = {
  email: MailSvg,
  password: LockOnSvg,
};

const inputConfigs: inputKeys[] = Object.keys(defaultValue) as inputKeys[];

const LoginScreen = ({navigation}: AppStackScreenProps<'Login'>) => {
  const {colors} = useAppTheme();
  const [isSecureTextEntry, setSecureTextEntry] = useState(true);

  const [inputs, setInputs] = useState(defaultValue);
  const [errors, setErrors] = useState(defaultValue);

  const {t} = useTranslation('auth');
  const {bottom} = useSafeAreaInsets();
  const inputRefs = useRef<Record<inputKeys, null | TextInput>>({
    email: null,
    password: null,
  });

  const queryClient = useQueryClient();
  const {mutate, isPending} = useMutation({
    mutationFn: signInUserWithFirebase,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['userDetail']});
    },
    onError: e => {
      console.log('error while sign in with firebase', e);
    },
  });

  const handleSubmit = useCallback(() => {
    try {
      loginSchema.parse(inputs);
      mutate(inputs);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors = zodErrorSimplify<typeof defaultValue>(error);
        setErrors(validationErrors);
      }
    }
  }, [inputs, mutate]);

  const handleSubmitEditing = useCallback(
    (key: inputKeys) => {
      if (key === 'email') {
        inputRefs.current.password?.focus();
      } else {
        handleSubmit();
      }
    },
    [handleSubmit],
  );

  return (
    <KeyboardAwareScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      overScrollMode="never"
      keyboardShouldPersistTaps="handled"
      bottomOffset={10}
      contentContainerStyle={styles.content}
      disableScrollOnKeyboardHide={true}
      style={styles.container}>
      <WelcomeBackSvg height={218} style={styles.welcomeImg} />
      <Text style={[styles.title, {color: colors.text}]}>Welcome Back to</Text>
      <Text style={[styles.appName, {color: colors.tint}]}>Vet Seva</Text>

      {inputConfigs.map((inputKey, index) => {
        const isPassword = inputKey === 'password';
        const LeftIcon = LeftIcons[inputKey];
        return (
          <AppTextInput
            editable={!isPending}
            key={`login-form-field-${index}`}
            ref={ref => {
              const temp = inputRefs.current;
              inputRefs.current = {...temp, [inputKey]: ref};
            }}
            value={inputs[inputKey]}
            returnKeyType={index + 1 === inputConfigs.length ? 'done' : 'next'}
            onSubmitEditing={() => {
              handleSubmitEditing(inputKey);
            }}
            error={errors[inputKey]}
            onChangeText={text => {
              setInputs(prev => ({...prev, [inputKey]: text}));
              setErrors(prev => ({...prev, [inputKey]: ''}));
            }}
            leftIcon={<LeftIcon />}
            rightIcon={
              isPassword ? (
                isSecureTextEntry ? (
                  <EyeClosedSvg />
                ) : (
                  <EyeOpenSvg />
                )
              ) : null
            }
            secureTextEntry={isPassword && isSecureTextEntry}
            label={t(`labels.${inputKey}`)}
            placeholder={t(`placeholders.${inputKey}`)}
            onRightIconPress={() => {
              if (isPassword) {
                setSecureTextEntry(v => !v);
              }
            }}
          />
        );
      })}

      <AppButton isLoading={isPending} title="Login" onPress={handleSubmit} />

      <View style={styles.spacer} />

      <Pressable
        hitSlop={{top: 10, bottom: 5}}
        onPress={() => {
          navigation.navigate(AppRouts.Registration);
        }}>
        <Text
          style={[
            styles.footerText,
            {color: colors.text, marginBottom: bottom},
          ]}>
          Don't have an account?{' '}
          <Text style={[styles.createAccountText, {color: colors.tint}]}>
            create new account.
          </Text>
        </Text>
      </Pressable>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
