import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {AppRouts} from '.';
import {LoginScreen, OnboardingScreen, RegistrationScreen} from '@/screens';
import {AppStackParamsList} from '@/types/navigation';
import {colors} from '@/styles';
import {useQuery} from '@tanstack/react-query';
import {getCurrentUserInfo} from '@/services/firebase';
import {useMMKVBoolean} from 'react-native-mmkv';
import {storageKeys} from '@/utils';
import TabNavigator from './TabNavigator';

const AppStack = createNativeStackNavigator<AppStackParamsList>();

const MainAppNavigation = () => {
  const [isGetStarted] = useMMKVBoolean(storageKeys.isGetStarted);

  const {data: isLoggedIn} = useQuery({
    queryKey: ['userDetail'],
    queryFn: async () => {
      return getCurrentUserInfo();
    },
    select: Boolean,
  });

  return (
    <NavigationContainer
      theme={{...DefaultTheme, colors: {...DefaultTheme.colors, ...colors}}}>
      <AppStack.Navigator
        screenOptions={{
          // animation: 'ios',
          statusBarStyle: 'dark',
          statusBarColor: colors.neutral100,
          headerShown: false,
        }}>
        {isLoggedIn ? (
          <AppStack.Screen name={AppRouts.Tab} component={TabNavigator} />
        ) : (
          <AppStack.Group>
            {isGetStarted ? (
              <>
                <AppStack.Screen
                  name={AppRouts.Login}
                  component={LoginScreen}
                />
                <AppStack.Screen
                  name={AppRouts.Registration}
                  component={RegistrationScreen}
                />
              </>
            ) : (
              <AppStack.Screen
                name={AppRouts.Onboarding}
                component={OnboardingScreen}
              />
            )}
          </AppStack.Group>
        )}
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default MainAppNavigation;
