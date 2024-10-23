import {Button, Text, View} from 'react-native';
import React from 'react';
import {TabScreensProps} from '@/types/navigation';
import {getCurrentUserInfo, signOut} from '@/services/firebase';
import {useQuery} from '@tanstack/react-query';

const ProfileScreen = ({}: TabScreensProps<'Profile'>) => {
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
        title="Logout"
        onPress={() => {
          signOut().then(() => {
            refetch();
          });
        }}
      />
    </View>
  );
};

export default ProfileScreen;
