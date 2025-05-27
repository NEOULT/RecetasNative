import {View, TextInput, StyleSheet} from 'react-native';
import ThemedText from './ThemedText';

export default function InputV1 ({ 
    label = null, 
    placeholder,
    width = 300,
    height = 33, 
    style, 
    value,
    onChangeText,
    ...props 
    })
    {
    
    return(
        <View style={[styles.inputContainer, {width}]}>
            {(label && <ThemedText>{label}</ThemedText>)}
            <TextInput
            placeholder={placeholder}
            placeholderTextColor="gray"
            value={value}
            onChangeText={onChangeText}
            style={[styles.input, style, {height}]}
            {...props}
            />
        </View>
    );
}
const styles = StyleSheet.create({
input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#B3B3B3",
    color: "black",
    backgroundColor:"white",
    fontSize: 16,
    paddingVertical: 3,
    paddingHorizontal: 8,
    paddingTop: 3,
    textAlignVertical: 'top',
},
inputContainer:{
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 10,
}
});