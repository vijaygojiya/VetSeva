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
  WelcomeSvg,
  UserSvg,
} from '@/assets';
import styles from './styles';
import {AppRouts} from '@/router';
import {useAppTheme} from '@/hooks';
import {storageKeys} from '@/utils/constant';
import {useMMKVBoolean} from 'react-native-mmkv';

const defaultValue = {
  name: '',
  email: '',
  password: '',
};
type inputKeys = keyof typeof defaultValue;

const LeftIcons = {
  name: UserSvg,
  email: MailSvg,
  password: LockOnSvg,
};

const inputConfigs: inputKeys[] = Object.keys(defaultValue) as inputKeys[];

const Registration = ({navigation}: AppStackScreenProps<'Registration'>) => {
  const {colors} = useAppTheme();
  const [_, setLoggedIn] = useMMKVBoolean(storageKeys.isLoggedIn);

  const [isSecureTextEntry, setSecureTextEntry] = useState(true);

  const [inputs, setInputs] = useState(defaultValue);
  const [errors, setErrors] = useState(defaultValue);

  const {t} = useTranslation('auth');
  const inputRefs = useRef<Record<inputKeys, null | TextInput>>({
    email: null,
    password: null,
    name: null,
  });

  const handleSubmit = useCallback(() => {
    setLoggedIn(true);
  }, [setLoggedIn]);

  const handleSubmitEditing = useCallback(
    (key: inputKeys) => {
      if (key === 'email') {
        inputRefs.current.password?.focus();
      } else if (key === 'name') {
        inputRefs.current.email?.focus();
      } else {
        handleSubmit();
      }
    },
    [handleSubmit],
  );
  return (
    <View style={styles.container}>
      <WelcomeSvg height={128} style={styles.welcomeImg} />
      <Text style={[styles.title, {color: colors.text}]}>
        Create new Account
      </Text>
      {inputConfigs.map((inputKey, index) => {
        const isPassword = inputKey === 'password';
        const LeftIcon = LeftIcons[inputKey];
        return (
          <AppTextInput
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
      <AppButton title="Create Account" onPress={handleSubmit} />

      <View style={styles.spacer} />

      <Pressable
        onPress={() => {
          navigation.navigate(AppRouts.Login);
        }}>
        <Text style={[styles.footerText, {color: colors.text}]}>
          Already have an account?{' '}
          <Text style={[styles.createAccountText, {color: colors.tint}]}>
            Login.
          </Text>
        </Text>
      </Pressable>
    </View>
  );
};

export default Registration;
