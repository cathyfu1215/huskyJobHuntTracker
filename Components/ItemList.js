import React from 'react'
import { Text, FlatList,SafeAreaView,View, StyleSheet} from 'react-native'
import styles from '../styleHelper';
import { FontAwesome } from '@expo/vector-icons';
import PressableListItem from './PressableListItem';

function ItemsList({data,navigation,route}) {

 

    function ItemLine({item}) {

      function handlePressEditItem() {
        navigation.navigate('Edit', {data: item});
      }
        return (<View style={styles.itemContainer}>
          <PressableListItem pressedFunction={handlePressEditItem}>
          <View>
          <Text style={styles.itemText}>Company: {item.companyName}</Text>
          <Text style={styles.itemText}>Position: {item.positionName}</Text>
          <Text style={styles.itemText}>Status: {item.status}</Text>
          <Text style={styles.itemText}>Date of the Last Update: {item.date.toDate().toDateString()}</Text>
          <Text style={styles.itemText}>Preference Score: {item.preferenceScore}</Text>
          </View>
          </PressableListItem>
        </View>);
    }
    
  
    return (
      <SafeAreaView>
        <FlatList
          data={data}
          renderItem={({item}) => <ItemLine item={item} />  }
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    );
  }
  
 
  
  export default ItemsList