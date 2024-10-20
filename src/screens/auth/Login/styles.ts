import {fonts, fontSize, spacing} from '@/styles';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  welcomeImg: {
    alignSelf: 'center',
    marginVertical: spacing.sm,
  },
  title: {
    textAlign: 'center',
    fontFamily: fonts.regular,
    fontSize: fontSize.extraLarge,
  },
  appName: {
    textAlign: 'center',
    fontFamily: fonts.medium,
    marginTop: -spacing.xs,
    fontSize: fontSize.extraLarge + 8,
  },
  footerText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.small,
    textAlign: 'center',
  },
  createAccountText: {
    fontFamily: fonts.medium,
  },
  spacer: {flex: 1},
});
export default styles;
