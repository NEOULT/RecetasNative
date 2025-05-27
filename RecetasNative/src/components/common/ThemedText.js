import { StyleSheet, Text } from 'react-native';
import { useTheme } from '../../styles/theme/ThemeContext.js'

export default function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}) {
  const { colors, fonts } = useTheme();

  const titleStyle = {
    fontFamily: fonts.title,
    color: colors.primary_color,
    fontSize: fonts.title_size,
  };

  const subtitle1Style = {
    fontFamily: fonts.subtitle1,
    color: colors.secundary_textcolor,
    fontSize: fonts.subtitle1_size,
  };

  const subtitle2Style = {
    fontFamily: fonts.subtitle2,
    color: colors.regular_textcolor,
    fontSize: fonts.subtitle2_size,
  };

  const defaultStyle = {
    fontFamily: fonts.default,
    color: colors.regular_textcolor,
    fontSize: fonts.default_size,
  };

  const detailsStyle = {
    fontFamily: fonts.details,
    color: colors.regular_textcolor,
    fontSize: fonts.details_size,
  };


  return (
    <Text
      style={[
        type === 'title' && {...titleStyle},
        type === 'subtitle1' && {...subtitle1Style},
        type === 'subtitle2' && {...subtitle2Style},
        type === 'default' && {...defaultStyle},
        type === 'details' && {...detailsStyle},
        style,
      ]}
      {...rest}
    />
  );
}
