// import {fonts} from '@/styles';
import {fonts, fontSize, spacing} from '@/styles';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    marginTop: spacing.xxs,
  },
  labelText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.tiny,
    marginStart: spacing.xs,
    marginBottom: spacing.xxxs,
  },
  textInput: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: fontSize.small,
    paddingVertical: spacing.sm,
    textAlignVertical: 'center',
    paddingHorizontal: spacing.xs,
  },
  rowContainer: {
    paddingHorizontal: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
  },
  error: {
    fontSize: fontSize.tiny,
    fontFamily: fonts.regular,
    marginTop: spacing.xxxs,
    marginStart: spacing.xs,
  },
});

export default styles;
