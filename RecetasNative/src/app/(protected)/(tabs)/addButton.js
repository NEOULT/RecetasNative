import { StyleSheet, View, Text, TextInput, ScrollView} from 'react-native';
import IngredientItem from '../../../components/IngredientItem';
import ImageSelector from '../../../components/common/ImagePicker';
import StepItem from '../../../components/StepItem';
import ThemedText from '../../../components/common/ThemedText';

export default function AddScreen() {

  const placeholderTextColor = "gray";

  return (

    <ScrollView style={{ flex: 1, marginBottom: 20 }}>
      <View style={styles.container}>

          <ImageSelector width={'100%'} height={160}/>

          <View style={styles.inputContainer}>
            <ThemedText>Titulo:</ThemedText>
            <TextInput
              placeholder="Ingrese el titulo"
              placeholderTextColor={placeholderTextColor}
              style={[styles.input, { width: "99%" }]}
              keyboardType="default"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <ThemedText>Descripcion:</ThemedText>
            <TextInput
              placeholder="Ingrese la descripcion"
              placeholderTextColor={placeholderTextColor}
              style={[styles.input, { width: "99%", height: 100 }]}
              keyboardType="default"
              autoCapitalize="none"
            />
          </View>

          <View style={{flexDirection: 'row' , width: '100%'}}>
            <View style={[styles.inputContainer, {width:'58%'}]}>
              <ThemedText>Tiempo de Preparacion:</ThemedText>
              <View style={{flexDirection: "row",alignItems: "center",gap: 13}}>
                <TextInput
                  placeholder="Unidades"
                  placeholderTextColor={placeholderTextColor}
                  style={[styles.input, { width: "35%" }]}
                  keyboardType="default"
                  autoCapitalize="none"
                />
                <ThemedText style={{ fontWeight: "bold", fontSize: 20 }}>-</ThemedText>
                <TextInput
                  placeholder="Unidades"
                  placeholderTextColor={placeholderTextColor}
                  style={[styles.input, { width: "55%" }]}
                  keyboardType="default"
                  autoCapitalize="none"
                />
              </View>
            </View>
            <View style={[styles.inputContainer]}>
              <ThemedText>Porciones:</ThemedText>
              <TextInput
                placeholder="Unidades"
                placeholderTextColor={placeholderTextColor}
                style={[styles.input, { width: "35%" }]}
                keyboardType="default"
                autoCapitalize="none"
              />
            </View>
            
          </View>

          <View style={{flexDirection: 'row' , width: '100%'}}>
              <View style={[styles.inputContainer, { width:'50%'}]}>
                <ThemedText>Dificultad:</ThemedText>
                <TextInput
                  placeholder="Unidades"
                  placeholderTextColor={placeholderTextColor}
                  style={[styles.input, { width: "99%" }]}
                  keyboardType="default"
                  autoCapitalize="none"
                />
              </View>

            <View style={[styles.inputContainer, { width:'50%'}]}>
                <ThemedText>Visibilidad:</ThemedText>
                <TextInput
                  placeholder="Unidades"
                  placeholderTextColor={placeholderTextColor}
                  style={[styles.input, { width: "99%" }]}
                  keyboardType="default"
                  autoCapitalize="none"
                />
            </View>
          </View>
        <ThemedText type='subtitle1'>Ingredientes:</ThemedText>
        <View style={{ gap: 20, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <IngredientItem />
          <IngredientItem />
          <IngredientItem />
          <IngredientItem />
          <IngredientItem />
        </View>

        <ThemedText type='subtitle1'>Preparacion:</ThemedText>
        <View style={{ gap: 20, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <StepItem />
          <StepItem />
          <StepItem />
          <StepItem />
          <StepItem />
        </View>

      </View>
     
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
    gap: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#B3B3B3",
    height: 33,
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
    justifyContent: 'right',
    // backgroundColor: '#FFEDDE',
    paddingHorizontal: 20,
    gap: 10,
    width: '100%',
  }
  
});