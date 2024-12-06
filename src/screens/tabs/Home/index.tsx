import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  RefreshControl,
} from 'react-native';
import React, {useCallback, useRef} from 'react';
import {TabScreensProps} from '@/types/navigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useScrollToTop} from '@react-navigation/native';
import styles from './styles';
import {DoctorListHeader, DoctorListItem} from '@/components';
import {IDoctor} from '@/types/appTypes';
import {useAppTheme, useRefreshByUser} from '@/hooks';
import {randomUserImage} from '@/utils';
import {useQuery} from '@tanstack/react-query';

const renderItem: ListRenderItem<IDoctor> = ({item}) => {
  return <DoctorListItem {...item} />;
};
const renderListHeader = () => {
  return <DoctorListHeader />;
};
const HomeScreen = ({}: TabScreensProps<'Home'>) => {
  const ref = useRef<FlatList | null>(null);

  const {colors} = useAppTheme();

  const {data, refetch, isLoading} = useQuery({
    queryKey: ['doctor-list'],
    queryFn: getDoctor,
  });

  const {isRefetchingByUser, refetchByUser} = useRefreshByUser(refetch);

  useScrollToTop(ref);

  const renderListEmpty = useCallback(() => {
    if (isLoading) {
      return <ActivityIndicator color={colors.primary500} />;
    }
  }, [colors.primary500, isLoading]);
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <FlatList
        ref={ref}
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingByUser}
            colors={[colors.primary500]}
            onRefresh={refetchByUser}
          />
        }
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={renderListEmpty}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        data={data}
        renderItem={renderItem}
        contentContainerStyle={styles.listContentContainer}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const getDoctor = () => {
  return new Promise<Array<IDoctor>>(res => {
    setTimeout(() => {
      res(doctors);
    }, 900);
  });
};

export const doctors: IDoctor[] = [
  {
    id: '1',
    profilePicture: randomUserImage,
    name: 'Dr. Rajesh Patel',
    email: 'rajesh.patel@example.com',
    phone: '+91 9876543210',
    bio: 'Experienced in livestock and poultry health management.',
    specialization: 'Livestock',
    licenseNumber: 'GJ123456',
    startDate: new Date('2024-04-15'),
    location: {name: 'Ahmedabad, Gujarat', latitude: 23.0225, longitude: 72.5714},
    address: '123 Veterinary Lane, Ahmedabad, Gujarat',
    rating: 4.8,
    totalReviews: 120,
    createdAt: new Date(),
    updatedAt: new Date(),
    isVerified: false,
  },
  {
    id: '2',
    profilePicture: randomUserImage,
    name: 'Dr. Kavita Joshi',
    email: 'kavita.joshi@example.com',
    phone: '+91 9123456780',
    bio: 'Passionate about animal wellness and prevention care.',
    specialization: 'Small Animals',
    licenseNumber: 'GJ654321',
    startDate: new Date('2015-06-20'),
    location: {name: 'Surat, Gujarat', latitude: 21.1702, longitude: 72.8311},
    address: '45 Pet Care St, Surat, Gujarat',
    rating: 4.7,
    totalReviews: 98,
    createdAt: new Date(),
    updatedAt: new Date(),
    isVerified: false,
  },
  {
    id: '3',
    profilePicture: randomUserImage,
    name: 'Dr. Manish Desai',
    email: 'manish.desai@example.com',
    phone: '+91 9823456781',
    bio: 'Specialist in dairy and cattle health services.',
    specialization: 'Dairy Cattle',
    licenseNumber: 'GJ789012',
    startDate: new Date('2008-09-10'),
    location: {name: 'Vadodara, Gujarat', latitude: 22.3072, longitude: 73.1812},
    address: '78 Dairy Lane, Vadodara, Gujarat',
    rating: 4.5,
    totalReviews: 85,
    createdAt: new Date(),
    updatedAt: new Date(),
    isVerified: false,
  },
  {
    id: '4',
    profilePicture: randomUserImage,
    name: 'Dr. Sneha Shah',
    email: 'sneha.shah@example.com',
    phone: '+91 9934567892',
    bio: 'Dedicated to improving animal health through preventive care.',
    specialization: 'Poultry',
    licenseNumber: 'GJ234567',
    startDate: new Date('2016-11-05'),
    location: {name: 'Rajkot, Gujarat', latitude: 22.3039, longitude: 70.8022},
    address: '55 Poultry Drive, Rajkot, Gujarat',
    rating: 4.6,
    totalReviews: 105,
    createdAt: new Date(),
    updatedAt: new Date(),
    isVerified: false,
  },
  {
    id: '5',
    profilePicture: randomUserImage,
    name: 'Dr. Prakash Mehta',
    email: 'prakash.mehta@example.com',
    phone: '+91 9124567890',
    bio: 'Expert in animal surgery and trauma care.',
    specialization: 'Surgery',
    licenseNumber: 'GJ345678',
    startDate: new Date('2009-01-15'),
    location: {name: 'Bhavnagar, Gujarat', latitude: 21.7645, longitude: 72.1519},
    address: '22 Vet Surgery Rd, Bhavnagar, Gujarat',
    rating: 4.9,
    totalReviews: 150,
    createdAt: new Date(),
    updatedAt: new Date(),
    isVerified: false,
  },
  {
    id: '6',
    profilePicture: randomUserImage,
    name: 'Dr. Anjali Patel',
    email: 'anjali.patel@example.com',
    phone: '+91 9934876541',
    bio: 'Focused on community health for rural livestock.',
    specialization: 'Community Livestock',
    licenseNumber: 'GJ456789',
    startDate: new Date('2013-03-18'),
    location: {name: 'Jamnagar, Gujarat', latitude: 22.4707, longitude: 70.0577},
    address: '12 Animal Care Rd, Jamnagar, Gujarat',
    rating: 4.7,
    totalReviews: 76,
    createdAt: new Date(),
    updatedAt: new Date(),
    isVerified: false,
  },
  {
    id: '7',
    profilePicture: randomUserImage,
    name: 'Dr. Vipul Chauhan',
    email: 'vipul.chauhan@example.com',
    phone: '+91 9987654321',
    bio: 'Experienced with complex medical cases in animal care.',
    specialization: 'Veterinary Medicine',
    licenseNumber: 'GJ567890',
    startDate: new Date('2011-05-22'),
    location: {name: 'Anand, Gujarat', latitude: 22.5645, longitude: 72.9289},
    address: '44 Vet Med Ave, Anand, Gujarat',
    rating: 4.3,
    totalReviews: 65,
    createdAt: new Date(),
    updatedAt: new Date(),
    isVerified: false,
  },
  {
    id: '8',
    profilePicture: randomUserImage,
    name: 'Dr. Mitesh Joshi',
    email: 'mitesh.joshi@example.com',
    phone: '+91 9898765432',
    bio: 'Dedicated to preventive healthcare for small animals.',
    specialization: 'Preventive Care',
    licenseNumber: 'GJ678901',
    startDate: new Date('2014-08-10'),
    location: {name: 'Mehsana, Gujarat', latitude: 23.588, longitude: 72.3693},
    address: '77 Preventive St, Mehsana, Gujarat',
    rating: 4.2,
    totalReviews: 45,
    createdAt: new Date(),
    updatedAt: new Date(),
    isVerified: false,
  },
  {
    id: '9',
    profilePicture: randomUserImage,
    name: 'Dr. Komal Trivedi',
    email: 'komal.trivedi@example.com',
    phone: '+91 9876547890',
    bio: 'Specializes in reproductive health for dairy cattle.',
    specialization: 'Reproductive Health',
    licenseNumber: 'GJ789012',
    startDate: new Date('2007-12-12'),
    location: {name: 'Bhuj, Gujarat', latitude: 23.2419, longitude: 69.6669},
    address: '33 Repro Care Blvd, Bhuj, Gujarat',
    rating: 4.8,
    totalReviews: 95,
    createdAt: new Date(),
    updatedAt: new Date(),
    isVerified: false,
  },
  {
    id: '10',
    profilePicture: randomUserImage,
    name: 'Dr. Nishant Rathod',
    email: 'nishant.rathod@example.com',
    phone: '+91 9865432109',
    bio: 'Committed to improving herd health and productivity.',
    specialization: 'Herd Health',
    licenseNumber: 'GJ890123',
    startDate: new Date('2012-09-15'),
    location: {name: 'Nadiad, Gujarat', latitude: 22.6939, longitude: 72.8611},
    address: '66 Herd St, Nadiad, Gujarat',
    rating: 4.6,
    totalReviews: 88,
    createdAt: new Date(),
    updatedAt: new Date(),
    isVerified: false,
  },
  {
    id: '11',
    profilePicture: randomUserImage,
    name: 'Dr. Suresh Kothari',
    email: 'suresh.kothari@example.com',
    phone: '+91 9845123456',
    bio: 'Expert in treating infectious diseases in animals.',
    specialization: 'Infectious Diseases',
    licenseNumber: 'GJ901234',
    startDate: new Date('2016-04-20'),
    location: {name: 'Porbandar, Gujarat', latitude: 21.6417, longitude: 69.6293},
    address: '24 Health Ave, Porbandar, Gujarat',
    rating: 4.5,
    totalReviews: 60,
    createdAt: new Date(),
    updatedAt: new Date(),
    isVerified: false,
  },
  {
    id: '12',
    profilePicture: randomUserImage,
    name: 'Dr. Rina Modi',
    email: 'rina.modi@example.com',
    phone: '+91 9932154786',
    bio: 'Passionate about nutritional care for cattle.',
    specialization: 'Nutrition',
    licenseNumber: 'GJ012345',
    startDate: new Date('2014-11-25'),
    location: {name: 'Junagadh, Gujarat', latitude: 21.5222, longitude: 70.4579},
    address: '12 Nutrition Rd, Junagadh, Gujarat',
    rating: 4.7,
    totalReviews: 80,
    createdAt: new Date(),
    updatedAt: new Date(),
    isVerified: false,
  },
  {
    id: '13',
    profilePicture: randomUserImage,
    name: 'Dr. Dinesh Bhatia',
    email: 'dinesh.bhatia@example.com',
    phone: '+91 9898541236',
    bio: 'Dedicated to rural veterinary services for small livestock.',
    specialization: 'Rural Veterinary Services',
    licenseNumber: 'GJ234567',
    startDate: new Date('2012-02-14'),
    location: {name: 'Patan, Gujarat', latitude: 23.85, longitude: 72.1},
    address: '34 Veterinary St, Patan, Gujarat',
    rating: 4.4,
    totalReviews: 53,
    createdAt: new Date(),
    updatedAt: new Date(),
    isVerified: false,
  },
  {
    id: '14',
    profilePicture: randomUserImage,
    name: 'Dr. Anita Mehta',
    email: 'anita.mehta@example.com',
    phone: '+91 9867452319',
    bio: 'Specialist in dermatology and skin treatments for animals.',
    specialization: 'Dermatology',
    licenseNumber: 'GJ345678',
    startDate: new Date('2009-07-18'),
    location: {name: 'Bhuj, Gujarat', latitude: 23.2419, longitude: 69.6669},
    address: '56 Skin Care Ln, Bhuj, Gujarat',
    rating: 4.6,
    totalReviews: 74,
    createdAt: new Date(),
    updatedAt: new Date(),
    isVerified: false,
  },
  {
    id: '15',
    profilePicture: randomUserImage,
    name: 'Dr. Bhavesh Solanki',
    email: 'bhavesh.solanki@example.com',
    phone: '+91 9812345678',
    bio: 'Experienced in advanced animal surgery.',
    specialization: 'Advanced Surgery',
    licenseNumber: 'GJ456789',
    startDate: new Date('2018-10-30'),
    location: {name: 'Gandhinagar, Gujarat', latitude: 23.2156, longitude: 72.6369},
    address: '99 Surgical Care Ave, Gandhinagar, Gujarat',
    rating: 4.9,
    totalReviews: 90,
    createdAt: new Date(),
    updatedAt: new Date(),
    isVerified: false,
  },
  {
    id: '16',
    profilePicture: randomUserImage,
    name: 'Dr. Hiral Shah',
    email: 'hiral.shah@example.com',
    phone: '+91 9876543210',
    bio: 'Expert in animal behavior and training consultations.',
    specialization: 'Animal Behavior',
    licenseNumber: 'GJ567890',
    startDate: new Date('2015-01-22'),
    location: {name: 'Amreli, Gujarat', latitude: 21.6032, longitude: 71.2221},
    address: '101 Animal Behavior St, Amreli, Gujarat',
    rating: 4.8,
    totalReviews: 67,
    createdAt: new Date(),
    updatedAt: new Date(),
    isVerified: false,
  },
  {
    id: '17',
    profilePicture: randomUserImage,
    name: 'Dr. Rakesh Chauhan',
    email: 'rakesh.chauhan@example.com',
    phone: '+91 9845123458',
    bio: 'Specializes in large animal orthopedics and joint care.',
    specialization: 'Orthopedics',
    licenseNumber: 'GJ678901',
    startDate: new Date('2012-03-16'),
    location: {name: 'Bhuj, Gujarat', latitude: 23.2419, longitude: 69.6669},
    address: '102 Ortho Care Ave, Bhuj, Gujarat',
    rating: 4.5,
    totalReviews: 75,
    createdAt: new Date(),
    updatedAt: new Date(),
    isVerified: false,
  },
  {
    id: '18',
    profilePicture: randomUserImage,
    name: 'Dr. Renu Bhatt',
    email: 'renu.bhatt@example.com',
    phone: '+91 9954321876',
    bio: 'Passionate about neonatal care and nutrition.',
    specialization: 'Neonatal Care',
    licenseNumber: 'GJ789012',
    startDate: new Date('2014-12-09'),
    location: {name: 'Dahod, Gujarat', latitude: 22.8324, longitude: 74.2595},
    address: '103 Newborn Care Blvd, Dahod, Gujarat',
    rating: 4.3,
    totalReviews: 62,
    createdAt: new Date(),
    updatedAt: new Date(),
    isVerified: false,
  },
  {
    id: '19',
    profilePicture: randomUserImage,
    name: 'Dr. Amit Trivedi',
    email: 'amit.trivedi@example.com',
    phone: '+91 9823546710',
    bio: 'Expert in emergency and trauma care for animals.',
    specialization: 'Emergency Medicine',
    licenseNumber: 'GJ890123',
    startDate: new Date('2017-05-04'),
    location: {name: 'Kutch, Gujarat', latitude: 23.7333, longitude: 69.3333},
    address: '104 Emergency Care Ln, Kutch, Gujarat',
    rating: 4.7,
    totalReviews: 84,
    createdAt: new Date(),
    updatedAt: new Date(),
    isVerified: false,
  },
  {
    id: '20',
    profilePicture: randomUserImage,
    name: 'Dr. Nisha Patel',
    email: 'nisha.patel@example.com',
    phone: '+91 9832165487',
    bio: 'Focuses on preventive and diagnostic imaging.',
    specialization: 'Diagnostic Imaging',
    licenseNumber: 'GJ012345',
    startDate: new Date('2019-07-11'),
    location: {name: 'Morbi, Gujarat', latitude: 22.8173, longitude: 70.8378},
    address: '105 Diagnostic Imaging Blvd, Morbi, Gujarat',
    rating: 4.6,
    totalReviews: 58,
    createdAt: new Date(),
    updatedAt: new Date(),
    isVerified: false,
  },
];
