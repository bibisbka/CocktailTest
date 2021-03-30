import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DrinksScreen from '../screens/DrinksScreen';
import FiltersScreen from '../screens/FiltersScreen';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppStateType} from '../redux/redux';
import {getFiltersList, setIndexArray} from '../redux/filters/slice';
import {getCocktailsList} from '../redux/cocktails/slice';
import Spinner from '../components/Spinner';
import {Image, TouchableOpacity} from 'react-native';

const MyCustomBackImage: React.FC = () => {
  return (
    <Image
      source={require('../assets/arrowBackButton.png')}
      style={{left: 20,}}
    />
  );
};

const Stack = createStackNavigator();
const StackNavigator = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {filters} = useSelector<AppStateType, AppStateType>(state => state);
  const {filtersList} = filters;
  useEffect(() => {
    dispatch(getFiltersList());
    dispatch(setIndexArray());
  }, []);
  const filtersArray = filtersList.map(f => f.strCategory);
  useEffect(() => {
    if (filtersList.length !== 0) {
      dispatch(getCocktailsList(filtersArray));
      dispatch(setIndexArray());
    }
  }, [filtersArray.length]);
  const length = useSelector<AppStateType, number>(
    state => state.cocktails.allCocktailsList.length,
  );
  return (
    <NavigationContainer>
      {length === 0 ? (
        <Spinner />
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            options={({navigation}) => ({
              title: 'Drinks',
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Filters');
                  }}>
                  <Image
                    source={require('../assets/filterIcon.png')}
                    style={{
                      right: 20,
                      width: 29,
                      height: 29,
                    }}
                  />
                </TouchableOpacity>
              ),
              headerStyle: {
                backgroundColor: '#FFFFFF',
                height: 100,
                shadowOffset: {width: 4, height: 4},
                shadowOpacity: 0.25,
              },
              headerTitleAlign: 'left',
              headerTitleStyle: {
                alignSelf: 'stretch',
                fontFamily: 'Roboto',
                fontWeight: '500',
                fontSize: 24,
                lineHeight: 28,
              },
            })}
            name={'Drinks'}
            component={DrinksScreen}
          />
          <Stack.Screen
            options={{
              title: 'Filters',
              headerBackImage: () => <MyCustomBackImage />,
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: '#FFFFFF',
                height: 100,
                shadowOffset: {width: 4, height: 4},
                shadowOpacity: 0.25,
              },
              headerTitleAlign: 'left',
              headerTitleStyle: {
                left: 15,
                fontFamily: 'Roboto',
                fontWeight: '500',
                fontSize: 24,
                lineHeight: 28,
              },
            }}
            name={'Filters'}
            component={FiltersScreen}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default StackNavigator;
