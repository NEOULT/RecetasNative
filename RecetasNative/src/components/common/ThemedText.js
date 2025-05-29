import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../styles/theme/ThemeContext.js'

export default function ThemedText({
  style,
  icon,
  textAlign = 'justify',
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

  const subtitle3Style = {
    fontFamily: fonts.subtitle3,
    color: colors.regular_textcolor,
    fontSize: fonts.subtitle3_size,
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
    <View style={[icon ? { flexDirection: 'row', alignItems: 'center', gap: 5 } : null,]}>
      {icon && (
        icon
        )}
      <Text
      style={[
        type === 'title' && {...titleStyle},
        type === 'subtitle1' && {...subtitle1Style},
        type === 'subtitle2' && {...subtitle2Style},
        type === 'subtitle3' && {...subtitle3Style},
        type === 'default' && {...defaultStyle},
        type === 'details' && {...detailsStyle},
        style,
        {textAlign: textAlign}
      ]}
      {...rest}
      />
    </View>
    
  );
}
