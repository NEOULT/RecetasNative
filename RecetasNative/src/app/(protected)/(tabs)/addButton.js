import { StyleSheet, View, Text, TextInput, ScrollView} from 'react-native';
import IngredientItem from '../../../components/IngredientItem';
import ImageSelector from '../../../components/common/ImagePicker';
import StepItem from '../../../components/StepItem';
import ThemedText from '../../../components/common/ThemedText';
import InputV1 from '../../../components/common/InputV1';
import SelectPicker from '../../../components/common/SelectPicker';
import ThemedButton from '../../../components/common/ThemedButton';
import { useForm, Controller, useFieldArray } from 'react-hook-form';


export default function AddScreen() {

  const { control, handleSubmit, } = useForm({
    defaultValues: {
      recipeImage: null,
      title: '',
      description: '',
      time: 0,
      timeUnit: 0,
      servings: 0,
      difficulty: '',
      visibility: '',
      ingredients:[{ name: '', ingredientQuantity: 0, unit: 0, unitQuantity: 0}],
      steps: [{ stepImage: null, description: '' }],
    }
  });

  const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
    control,
    name: 'ingredients',
  });

  const { fields: stepFields, append: appendStep, remove: removeStep } = useFieldArray({
    control,
    name: 'steps',
  });

  const onSubmit = (data) => {
    console.log('Datos del formulario:', data);
  }

  return (

    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        
        <Controller
          control={control}
          name="recipeImage"
          render={({ field: { value, onChange } }) => (
            <ImageSelector
              width={'100%'}
              height={160}
              value={value}
              onChange={onChange}
            />
          )}
        />

        <ThemedButton title="Guardar" onPress={handleSubmit(onSubmit)}/>

        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, value } }) => (
            <InputV1
              label="Titulo:"
              placeholder="Ingrese el titulo"
              width="99%"
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <InputV1
              label="Descripcion:"
              placeholder="Ingrese la descripcion"
              width="99%"
              height={100}
              value={value}
              onChangeText={onChange}
              multiline={true}
            />
          )}
        />

        <View style={styles.row}>
          <View style={styles.column}>
            <ThemedText>Tiempo de Preparación:</ThemedText>
            <View style={styles.subRow}>
              <Controller
                control={control}
                name="time"
                render={({ field: { onChange, value } }) => (
                  <InputV1
                    placeholder="Cant"
                    width="35%"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="numeric"
                  />
                )}
              />
              <ThemedText style={styles.dash}>-</ThemedText>
              <Controller
                control={control}
                name="timeUnit"
                render={({ field: { onChange, value } }) => (
                  <SelectPicker
                    width="45%"
                    placeholder="Min"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </View>
          </View>
          <Controller
            control={control}
            name="servings"
            render={({ field: { onChange, value } }) => (
              <InputV1
                label="Porciones:"
                placeholder="Unidades"
                width="35%"
                value={value}
                onChangeText={onChange}
                keyboardType="numeric"
              />
            )}
          />
        </View>

        <View style={styles.row}>
          <Controller
            control={control}
            name="difficulty"
            render={({ field: { onChange, value } }) => (
              <SelectPicker
                width="45%"
                placeholder="Medio"
                label="Dificultad:"
                value={value}
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="visibility"
            render={({ field: { onChange, value } }) => (
              <SelectPicker
                width="45%"
                placeholder="Privado"
                label="Visibilidad:"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </View>


        <ThemedText type='subtitle1' style={{alignSelf: 'right', padding: 15}}>Ingredientes:</ThemedText>
        <View style={styles.listContainer}>
          {ingredientFields.map((field, index) => (
            <Controller
              key={field.id}
              control={control}
              name={`ingredients.${index}`}
              render={({ field: { value, onChange } }) => (
                <IngredientItem
                  value={value}
                  onChange={onChange}
                  onPressDelete={() => removeIngredient(index)}
                />
              )}
            />
          ))}
          <ThemedButton
            title="Agregar ingrediente"
            onPress={() => appendIngredient({ nombre: '', cantidad: '', unidad: '', tipo: '' })}
          />
        </View>

        <View style={styles.listContainer}>
          {stepFields.map((field, index) => (
            <Controller
              key={field.id}
              control={control}
              name={`steps.${index}`}
              render={({ field: { value, onChange } }) => (
                <StepItem
                  value={value}
                  onChange={onChange}
                  onPressDelete={() => removeStep(index)}
                />
              )}
            />
          ))}
          <ThemedButton
            title="Agregar paso"
            onPress={() => appendStep({ description: '', stepImage: null })}
          />
        </View>

      </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({

  scroll: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 20,
    paddingHorizontal:20,
    paddingVertical: 20,
  },
  column:{
    flex: 1,
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    textAlign: 'right',
    gap: 10,
    justifyContent: 'space-between',
  },
  subRow: {
    flexDirection: 'row',
    gap: 5,
  
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