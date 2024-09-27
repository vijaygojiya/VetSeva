import {fonts, fontSize, spacing} from '@/styles';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  welcomeImg: {
    alignSelf: 'center',
    marginVertical: spacing.sm,
  },
  title: {
    textAlign: 'center',
    fontFamily: fonts.medium,
    fontSize: fontSize.extraLarge,
    marginTop: -spacing.xs,
  },

  footerText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.small,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  createAccountText: {
    fontFamily: fonts.medium,
  },
  spacer: {flex: 1},
});
export default styles;
