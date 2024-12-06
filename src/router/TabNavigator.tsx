import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  AppointmentsScreen,
  ExploreScreen,
  HomeScreen,
  NotificationsScreen,
  ProfileScreen,
} from '@/screens';
import {TabParamsList} from '@/types/navigation';
import {useAppTheme} from '@/hooks';
import {StyleSheet} from 'react-native';
import {fonts, fontSize} from '@/styles';
import {
  BellSvg,
  CalendarClockSvg,
  ExploreSvg,
  HomeSvg,
  UserSvg,
} from '@/assets';

const Tab = createBottomTabNavigator<TabParamsList>();

const renderHomeTabIcon = ({
  color,
  size,
  focused,
}: {
  focused: boolean;
  color: string;
  size: number;
}) => {
  return (
    <HomeSvg
      stroke={color}
      height={size}
      width={size}
      strokeWidth={focused ? 2 : 1.5}
    />
  );
};
const renderProfileTabIcon = ({
  color,
  size,
  focused,
}: {
  focused: boolean;
  color: string;
  size: number;
}) => {
  return (
    <UserSvg
      stroke={color}
      height={size}
      width={size}
      strokeWidth={focused ? 2 : 1.5}
    />
  );
};
const renderExploreTabIcon = ({
  color,
  size,
  focused,
}: {
  focused: boolean;
  color: string;
  size: number;
}) => {
  return (
    <ExploreSvg
      stroke={color}
      height={size}
      width={size}
      strokeWidth={focused ? 2 : 1.5}
    />
  );
};

const renderAppointmentTabIcon = ({
  color,
  size,
  focused,
}: {
  focused: boolean;
  color: string;
  size: number;
}) => {
  return (
    <CalendarClockSvg
      stroke={color}
      height={size}
      width={size}
      strokeWidth={focused ? 2 : 1.5}
    />
  );
};

const renderNotificationsTabIcon = ({
  color,
  size,
  focused,
}: {
  focused: boolean;
  color: string;
  size: number;
}) => {
  return (
    <BellSvg
      stroke={color}
      height={size}
      width={size}
      strokeWidth={focused ? 2 : 1.5}
    />
  );
};
export default function TabNavigator() {
  const {colors} = useAppTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.primary500,
      }}>
      <Tab.Screen
        component={HomeScreen}
        name="Home"
        options={{
          tabBarIcon: renderHomeTabIcon,
        }}
      />
      <Tab.Screen
        component={ExploreScreen}
        name="Explore"
        options={{
          tabBarIcon: renderExploreTabIcon,
        }}
      />
      <Tab.Screen
        component={AppointmentsScreen}
        name="Appointments"
        options={{
          tabBarIcon: renderAppointmentTabIcon,
        }}
      />
      <Tab.Screen
        component={NotificationsScreen}
        name="Notifications"
        options={{
          tabBarIcon: renderNotificationsTabIcon,
        }}
      />
      <Tab.Screen
        component={ProfileScreen}
        name="Profile"
        options={{
          tabBarIcon: renderProfileTabIcon,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: fonts.medium,
    fontSize: fontSize.medium,
  },
  tabBarLabel: {
    fontFamily: fonts.regular,
  },
});
