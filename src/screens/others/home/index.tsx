import {Button, Text, View} from 'react-native';
import React from 'react';
import {AppStackScreenProps} from '@/types/navigation';
import {getCurrentUserInfo, signOut} from '@/services/firebase';
import {useQuery} from '@tanstack/react-query';

const HomeScreen = ({}: AppStackScreenProps<'Home'>) => {
  const {data, refetch} = useQuery({
    queryKey: ['userDetail'],
    queryFn: async () => {
      return getCurrentUserInfo();
    },
    enabled: false,
  });

  return (
    <View>
      <Text>{data?.displayName}</Text>
      <Button
        title="Loguot"
        onPress={() => {
          signOut().then(() => {
            refetch();
          });
        }}
      />
    </View>
  );
};

export default HomeScreen;
