import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type TabParamsList = {
  Home: undefined;
  Explore: undefined;
  Appointments: undefined;
  Notifications: undefined;
  Profile: undefined;
};

export type AppStackParamsList = {
  Loading: undefined;
  Login: undefined;
  Registration: undefined;
  ResetPasswords: undefined;
  ChangePassword: undefined;
  Onboarding: undefined;
  Tab: NavigatorScreenParams<TabParamsList>;
};

export type AppStackScreenProps<
  S extends keyof AppStackParamsList = keyof AppStackParamsList,
> = NativeStackScreenProps<AppStackParamsList, S>;

export type TabScreensProps<T extends keyof TabParamsList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabParamsList, T>,
    NativeStackScreenProps<AppStackParamsList>
  >;
