import React, {useEffect} from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  SectionList,
  StatusBar,
} from 'react-native';
import {AppDispatch, AppStateType} from '../redux/redux';
import {useDispatch, useSelector} from 'react-redux';
import {
  CocktailsListType,
  ResponseCocktailType,
  addCocktailsToList,
} from '../redux/cocktails/slice';
import {InitialFiltersStateType, setCurrentIndex} from '../redux/filters/slice';

const DrinksScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {indexes, currentIndex} = useSelector<
    AppStateType,
    InitialFiltersStateType
  >(state => state.filters);
  const array = useSelector<AppStateType, CocktailsListType[]>(
    state => state.cocktails.cocktailsList,
  );
  useEffect(() => {
    dispatch(addCocktailsToList(indexes[currentIndex]));
  }, [currentIndex, indexes.length]);
  const Item = ({item}: {item: ResponseCocktailType}) => {
    return (
      <View style={styles.itemImageView}>
        <Image style={styles.itemImage} source={{uri: item.strDrinkThumb}} />
        <Text style={styles.itemText}>{item.strDrink}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {array.length === 0 ? null : (
        <SectionList
          stickySectionHeadersEnabled={false}
          sections={array}
          initialNumToRender={100}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.title}>{title}</Text>
          )}
          renderItem={({item}) => <Item item={item} />}
          ListEmptyComponent={<Text>List is empty</Text>}
          keyExtractor={item => item.idDrink.toString()}
          onEndReached={() => {
            if (currentIndex !== indexes[indexes.length - 1]) {
              dispatch(setCurrentIndex(currentIndex + 1));
            }
          }}
          onEndReachedThreshold={0.1}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingTop: StatusBar.currentHeight,
    height: '100%',
  },
  itemImage: {
    height: 100,
    width: 100,
    left: 20,
    top: 20,
  },
  itemImageView: {
    marginBottom: 20,
  },
  itemText: {
    marginLeft: 141,
    top: -10,
    color: '#7e7e7e',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 16,
    marginLeft: 20,
    marginTop: 20,
    color: '#7e7e7e',
  },
});

export default DrinksScreen;
