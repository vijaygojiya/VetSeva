import auth from '@react-native-firebase/auth';

const fireAuth = auth();

const createUserInFirebase = async ({
  email,
  password,
  name,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const {user} = await fireAuth.createUserWithEmailAndPassword(email, password);
  
  return user.updateProfile({displayName: name});
};

const signInUserWithFirebase = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return fireAuth.signInWithEmailAndPassword(email, password);
};
const getFireAuthToken = async () => {
  return await fireAuth.currentUser?.getIdToken();
};

const getCurrentUserInfo = () => {
  return fireAuth.currentUser;
};

const signOut = async () => {
  return fireAuth.signOut();
};

export {
  fireAuth,
  createUserInFirebase,
  getCurrentUserInfo,
  signInUserWithFirebase,
  getFireAuthToken,
  signOut,
};
