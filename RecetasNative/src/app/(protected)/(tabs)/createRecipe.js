import { StyleSheet, View, Text, TextInput, ScrollView, KeyboardAvoidingView} from 'react-native';
import IngredientItem from '../../../components/IngredientItem';
import ImageSelector from '../../../components/common/ImagePicker';
import StepItem from '../../../components/StepItem';
import ThemedText from '../../../components/common/ThemedText';
import InputV1 from '../../../components/common/InputV1';
import SelectPicker from '../../../components/common/SelectPicker';
import ThemedButton from '../../../components/common/ThemedButton';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { useTheme } from '../../../styles/theme/ThemeContext';
import ThemedSwitch from '../../../components/common/ThemedSwitch';
import { ApiService } from '../../../services/ApiService';
import { useApiMessage } from '../../../hooks/useApiMessage';
import { difficultyOptions, unitTimeOptions } from '../../../constants/options';
import InfoBox from '../../../components/common/InfoBox';
import { useEffect, useRef, useState } from 'react';
import { convertTimeToIso, convertIsoToTime} from '../../../hooks/useTimeIso.js';
import PlusPicker from '../../../components/PlusPicker';
import CategoryTag from '../../../components/CategoryTag.js'
import { getUserId } from '../../../hooks/useGetUserId.js';
import { useLocalSearchParams } from 'expo-router';
const api = new ApiService();

export default function CreateRecipeScreen({}) {

  const { info, callApiWithMessage, clearInfo } = useApiMessage();   
  
  const [categories, setCategories] = useState([]); 

  const { colors } = useTheme();

  const { recipeId , recipe} = useLocalSearchParams();

  let recipeValues = null;

  if (recipe){

    const recipe2 = JSON.parse(recipe);

    const {time, unit} = convertIsoToTime(recipe2.preparation_time);
    

    console.log('recipe2:', recipe2);

    console.log(recipe2.ingredients);
    
    
    recipeValues = {

      //Falta arreglar la imagen
        images: [{ url: recipe2.images[0]?.url }],
        title: recipe2.title,
        description: recipe2.description,
        time: Number(time),
        timeUnit: unit,
        servings: Number(recipe2.servings),
        difficulty: recipe2.difficulty,
        isPublic: recipe2.isPublic,
        ingredients: Array.isArray(recipe2.ingredients)
        ? recipe2.ingredients.map(ing => ({
            ingredient_name: ing.ingredient_name,
            unit: ing.unit,
            unit_quantity: Number(ing.unit_quantity)
          }))
        : [],
        steps: Array.isArray(recipe2.steps)
          ? recipe2.steps.map(step => ({
              stepImage: step.stepImage,
              description: step.description
            }))
          : [],
        categories: Array.isArray(recipe2.categories)
          ? recipe2.categories.map(cat => cat._id || cat)
          : [],
        }
  }
 //Aca uso useRef para evitar que el efecto se ejecute en el primer renderizado y solo lo haga escuchando al info y los otros componentes
  
  useEffect(() => {

    const fetchCategories = async () => {
      try {
        const response = await callApiWithMessage(() => api.getCategories());
        clearInfo();
        setCategories(response.data.categories || []);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    }

    fetchCategories();
  }, []);

  const didMount = useRef(false);
  
  useEffect(() => {
      if (didMount.current) {
        if (info.message) {
          const timeout = setTimeout(clearInfo, 3000);
          return () => clearTimeout(timeout);
        }
    } else {
      didMount.current = true;
    }
  }, [info.message, clearInfo]);

  const handleAddCategory = (name) => {
    const cat = categories.find(c => c.name === name);
    if (!cat) return;
    const current = getValues('categories') || [];
    if (!current.includes(cat._id)) {
      setValue('categories', [...current, cat._id]);
    }
  };

  const handleRemoveCategory = (id) => {
    const current = getValues('categories') || [];
    setValue('categories', current.filter(cid => cid !== id));
  };

  //Estos son los valores por defecto del formulario, que se pueden modificar y llenarlos en caso de
  //querer editar una receta existente
  const { control, handleSubmit, getValues, setValue, reset } = useForm({
    defaultValues: (recipeValues) ? recipeValues : {

      images: [{url: ""}],
      title: '',
      description: '',
      time: 0,
      timeUnit: '',
      servings: 0,
      difficulty: '',
      isPublic: false,
      ingredients:[{ ingredient_name: '', unit: '', unit_quantity: 0}],
      steps: [{ stepImage: '', description: '' }],
      categories: [],
    }
  });

  useEffect(() => {
    if (recipeValues) {
      reset(recipeValues);
    }else{
      reset();
    }
  }, [recipe]);

  const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
    control,
    name: 'ingredients',
  });

  const { fields: stepFields, append: appendStep, remove: removeStep } = useFieldArray({
    control,
    name: 'steps',
  });

  const onSubmit = async (data) => {

    //Faltan por implementar
    data.user_id = await getUserId();
    data.preparation_time =`${convertTimeToIso(data.time, data.timeUnit)}`;
    

    //Estos los elimino porque no son necesarios en el backend, solo para construir el preparation_time
    delete data.time
    delete data.timeUnit

    //Esta funcion elimina los campos que son null o undefined porque el backend no los acepta
    const cleanData = removeNullFields(data);

    try{

      let response = null;
      
      if (recipeValues) {
        response = await callApiWithMessage(() => api.updateRecipe(recipeId, cleanData));
      }else{
        response = await callApiWithMessage(() => api.createRecipe(cleanData));
      }

      if(response.success && recipeValues){
        console.log('Receta actualizada exitosamente:');
      }else{
        console.log('Receta creada exitosamente:');
      }


    }catch(e){
      console.error('Error al enviar el formulario:', e);
    }
    console.log('Datos del formulario:', data);
  }


  function removeNullFields(obj) {
  if (Array.isArray(obj)) {
    return obj.map(removeNullFields);
  } else if (obj && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj)
        .filter(([_, v]) => v !== null && v !== undefined && v !== '')
        .map(([k, v]) => [k, removeNullFields(v)])
    );
  }
  return obj;
}

  return (
  <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={120}>
    <InfoBox 
      message={info.message} 
      type={info.type} 
      onHide={clearInfo} 
      duration={2000} 
    />
    <ScrollView style={[styles.scroll, { backgroundColor: colors.card}]}>
      <View style={styles.container}>
        
        <Controller
          control={control}
          name="images"
          render={({ field: { value, onChange } }) => (
            <ImageSelector
              width={'100%'}
              height={160}
              value={value[0]?.url}
              onChange={(newUri) => {
                onChange([{ url: newUri }]);
              }}
              uploadType="recipe_cover"
              uploadMetadata={{ userId: 123 }}
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
                    value={String(value)}
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
                    options={unitTimeOptions}
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
                value={String(value)}
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
                options={difficultyOptions}
              />
            )}
          />
          <Controller
            control={control}
            name="isPublic"
            render={({ field: { onChange, value } }) => (
              <ThemedSwitch title='Public:' width="40%" value={value} onValueChange={onChange}/>
            )}
          />
        </View>

        <Controller
          control={control}
          name="categories"
          defaultValue={[]}
          render={({ field: { value } }) => (
            <View style={styles.categoryTags}>
              <PlusPicker
                label="Categorías:"
                width="45%"
                options={categories
                  .filter(cat => !(value || []).includes(cat._id))
                  .map(cat => cat.name)}
                onSelect={handleAddCategory}
              />
              {(value || []).map(id => {
                const cat = categories.find(c => c._id === id);
                if (!cat) return null;
                return (
                  <CategoryTag
                    key={id}
                    category={cat.name}
                    style={{}}
                    onPressDelete={() => handleRemoveCategory(id)}
                  />
                );
              })}
            </View>
          )}
        />
        
        <ThemedText type='subtitle1' style={{alignSelf: 'left'}}>Ingredientes:</ThemedText>
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
            onPress={() => appendIngredient({ ingredient_name: '', unit: 0, unit_quantity: 0})}
          />
        </View>

        <ThemedText type='subtitle1' textAlign='left'>Preparación:</ThemedText>
        <View style={styles.listContainer}>
          {stepFields.map((field, index) => (
            <Controller
              key={field.id}
              control={control}
              name={`steps.${index}`}
              render={({ field: { value, onChange } }) => (
                <StepItem
                  step={field.id}
                  recipe={recipeId}
                  value={value}
                  onChange={onChange}
                  onPressDelete={() => removeStep(index)}
                />
              )}
            />
          ))}
          <ThemedButton
            title="Agregar paso"
            onPress={() => appendStep({ description: '', stepImage: '' })}
          />
        </View>

      </View>
    </ScrollView>
  </KeyboardAvoidingView>

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
  categoryTags:{
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
  }
  
});