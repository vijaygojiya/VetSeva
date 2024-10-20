import {
  Pressable,
  PressableProps,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import React, {ReactNode, forwardRef, memo} from 'react';
import styles from './styles';
import {useAppTheme} from '@/hooks';

interface AppTextInputProps extends TextInputProps {
  rightIcon?: ReactNode | null;
  leftIcon?: ReactNode | null;
  label: string;
  onRightIconPress?: PressableProps['onPress'];
  error?: string;
}

const AppTextInput = forwardRef<TextInput, AppTextInputProps>(
  (
    {
      label,
      rightIcon = null,
      onRightIconPress,
      leftIcon = null,
      style,
      error = '',
      ...rest
    },
    ref,
  ) => {
    const {colors} = useAppTheme();
    return (
      <View style={[styles.container]}>
        <Text
          numberOfLines={1}
          style={[styles.labelText, {color: colors.text}]}>
          {label}
        </Text>
        <View style={[styles.rowContainer, {borderColor: colors.border}]}>
          {leftIcon}
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            ref={ref}
            placeholderTextColor={colors.neutral400}
            cursorColor={colors.tint}
            style={[styles.textInput, {color: colors.text}, style]}
            {...rest}
          />
          <Pressable
            hitSlop={5}
            disabled={!rightIcon}
            onPress={onRightIconPress}>
            {rightIcon}
          </Pressable>
        </View>
        <Text numberOfLines={2} style={[styles.error, {color: colors.error}]}>
          {error}
        </Text>
      </View>
    );
  },
);

export default memo(AppTextInput);
