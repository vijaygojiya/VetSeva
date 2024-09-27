import {colors} from '@/styles';
import {useTheme} from '@react-navigation/native';

export type ExtendedTheme = {
  dark: boolean;
  colors: typeof colors;
};
//@ts-ignore
const useAppTheme: () => ExtendedTheme = useTheme;

export default useAppTheme;
