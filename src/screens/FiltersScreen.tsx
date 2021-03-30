import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppStateType} from '../redux/redux';
import {
  FilterListObj,
  InitialFiltersStateType,
  applyFilters,
  Filters,
  setIndexArray,
  setInitialIndex,
} from '../redux/filters/slice';
import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/native';
import {removeCocktails} from '../redux/cocktails/slice';

const FiltersScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const renderItem = ({item}: {item: FilterListObj}) => {
    return (
      <View style={styles.checkBoxContainer}>
        <Text style={styles.title}>{item.strCategory}</Text>
        <CheckBox
          style={styles.checkBox}
          onCheckColor={'#272727'}
          hideBox={true}
          value={item.active}
          onValueChange={() => toggleFilter(item.strCategory)}
        />
      </View>
    );
  };
  const {filtersList} = useSelector<AppStateType, InitialFiltersStateType>(
    state => state.filters,
  );
  const [copiedFiltersList, setCopiedFiltersList] = useState(filtersList);
  const navigation = useNavigation();
  const navigateToDrinksScreen = () => navigation.navigate('Drinks');
  const toggleFilter = (filter: Filters) => {
    const index = copiedFiltersList.findIndex(i => filter === i.strCategory);
    if (index !== -1) {
      const updateFilter = Object.assign({}, copiedFiltersList[index], {
        active: !copiedFiltersList[index].active,
      });
      setCopiedFiltersList(
        copiedFiltersList.map((item, ind) => {
          if (ind === index) {
            return updateFilter;
          }
          return item;
        }),
      );
    }
  };
  const prevFilter = filtersList.map(f => f.active.toString()).join();
  const currentFilter = copiedFiltersList.map(f => f.active.toString()).join();
  const apply = () => {
    dispatch(applyFilters(copiedFiltersList));
    dispatch(setIndexArray());
    dispatch(setInitialIndex());
    navigateToDrinksScreen();
    dispatch(removeCocktails());
  };
  return (
    <View style={styles.container}>
      <FlatList
        initialNumToRender={filtersList.length}
        data={filtersList}
        renderItem={renderItem}
        keyExtractor={item => item.strCategory}
      />
      {prevFilter === currentFilter ? null : (
        <TouchableOpacity style={styles.button} onPress={apply}>
          <Text style={styles.buttonText}>Apply</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingTop: StatusBar.currentHeight,
    height: '100%',
  },
  checkBoxContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 30,
  },
  checkBox: {
    height: 35,
    width: 25,
    right: 35,
    top: -10,
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 16,
    marginBottom: 62,
    marginLeft: 20,
    color: '#7e7e7e',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    bottom: 110,
    width: 360,
    height: 53,
    backgroundColor: 'black',
  },
  buttonImg: {
    width: 360,
    height: 53,
  },
  buttonText: {
    alignSelf: 'center',
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 19,
    color: '#FFFFFF',
  },
});

export default FiltersScreen;
