import {fonts, fontSize, spacing} from '@/styles';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingTop: spacing.md,
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
    fontFamily: fonts.medium,
    fontSize: fontSize.extraLarge,
    marginTop: -spacing.xs,
  },

  footerText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.small,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  createAccountText: {
    fontFamily: fonts.medium,
  },
  spacer: {flex: 1},
});
export default styles;
