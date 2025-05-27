import { StyleSheet, View, Text, TextInput, ScrollView} from 'react-native';
import IngredientItem from '../../../components/IngredientItem';
import ImageSelector from '../../../components/common/ImagePicker';
import StepItem from '../../../components/StepItem';
import ThemedText from '../../../components/common/ThemedText';
import InputV1 from '../../../components/common/InputV1';

export default function AddScreen() {

  return (

    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        
        <ImageSelector width={'100%'} height={160} />


        <InputV1 label="Titulo:" placeholder="Ingrese el titulo" width='99%'/>
        <InputV1 label="Descripcion:" placeholder="Ingrese la descripcion" width='99%' height='100' />

        <View style={styles.row}>
          <View style={{ flex: 1, gap: 10}}>
            <ThemedText style={{paddingLeft: 20}}>Tiempo de Preparación:</ThemedText>
            <View style={styles.subRow}>
              <InputV1 placeholder="Cant" width='45%'/>
              <ThemedText style={styles.dash}>-</ThemedText>
              <InputV1 placeholder="Min" width='55%'/>
            </View>
          </View>
          <InputV1 label="Porciones:" placeholder="Unidades" width='35%'/>
        </View>

        <View style={styles.row}>
            <InputV1 label="Dificultad:" placeholder="Seleccione una dificultad" width='50%'/>
            <InputV1 label="Visibilidad:" placeholder="Privada" width='50%'/>
        </View>

        <ThemedText type='subtitle1' style={{alignSelf: 'right', padding: 15}}>Ingredientes:</ThemedText>
        <View style={styles.listContainer}>
          {[...Array(5)].map((_, i) => <IngredientItem key={i} />)}
        </View>

        <ThemedText type='subtitle1'>Preparación:</ThemedText>
        <View style={styles.listContainer}>
          {[...Array(5)].map((_, i) => <StepItem key={i} />)}
        </View>

      </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({

  scroll: {
    flex: 1,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 20,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    textAlign: 'right',
  },
  subRow: {
    flexDirection: 'row',
  
  },
  dash: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  listContainer: {
    gap: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});