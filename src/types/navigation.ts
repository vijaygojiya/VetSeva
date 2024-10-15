import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type AppStackParamsList = {
  Login: undefined;
  Registration: undefined;
  ResetPasswords: undefined;
  ChangePassword: undefined;
  Home: undefined;
  Onboarding: undefined;
};

export type AppStackScreenProps<
  S extends keyof AppStackParamsList = keyof AppStackParamsList,
> = NativeStackScreenProps<AppStackParamsList, S>;
