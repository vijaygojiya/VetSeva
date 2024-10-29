export type IDoctor = {
  id: string;
  profilePicture?: string;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  specialization: string;
  licenseNumber?: string;
  startDate: Date;
  location: {
    name: string;
    latitude: number;
    longitude: number;
  };
  address: string;
  rating: number;
  totalReviews: number;
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
};
