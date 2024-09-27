import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import styles from './styles';
import {useAppTheme} from '@/hooks';

interface AppButtonProps extends PressableProps {
  title: string;
  isLoading?: boolean;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
}

const AppButton: FC<AppButtonProps> = ({
  title = '',
  isLoading = false,
  disabled,
  containerStyle = {},
  titleStyle = {},

  ...rest
}) => {
  const {colors} = useAppTheme();

  return (
    <Pressable
      disabled={disabled || isLoading}
      {...rest}
      style={[
        styles.container,
        {backgroundColor: disabled ? colors.primary400 : colors.tint},
        containerStyle,
      ]}>
      {isLoading ? (
        <ActivityIndicator size={28} color={colors.neutral200} />
      ) : (
        <Text style={[styles.title, {color: colors.neutral200}, titleStyle]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
};

export default AppButton;
