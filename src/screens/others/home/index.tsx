import {Button, Text, View} from 'react-native';
import React from 'react';
import {AppStackScreenProps} from '@/types/navigation';
import {storageKeys} from '@/utils/constant';
import {useMMKVBoolean} from 'react-native-mmkv';

const HomeScreen = ({}: AppStackScreenProps<'Home'>) => {
  const [isLoggedIn, setLoggedIn] = useMMKVBoolean(storageKeys.isLoggedIn);

  return (
    <View>
      <Text>HomeScreen</Text>
      <Button
        title="Loguot"
        onPress={() => {
          setLoggedIn(false);
        }}
      />
    </View>
  );
};

export default HomeScreen;
