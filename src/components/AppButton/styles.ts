import {fonts, fontSize, spacing} from '@/styles';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: spacing.xs,
  },
  title: {
    fontFamily: fonts.regular,
    fontSize: fontSize.medium,
    letterSpacing: 0.5,
  },
});
export default styles;
