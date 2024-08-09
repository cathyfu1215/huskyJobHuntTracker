import React from 'react'
import { Text, FlatList,SafeAreaView,View, StyleSheet} from 'react-native'
import styles from '../styleHelper';
import { FontAwesome } from '@expo/vector-icons';
import PressableListItem from './PressableListItem';
import { ScrollView } from 'react-native';

function ItemsList({data,navigation,route}) {

 console.log('data in ItemsList', data);

    function ItemLine({item}) {

      //console.log('item in ItemLine', item);
      function handlePressItemDetail() {
        navigation.navigate('JobApplicationDetail', {data: item});
      }
        return (<View style={styles.itemContainer}>
          <PressableListItem pressedFunction={handlePressItemDetail}>
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
        {/* <FlatList
          data={data}
          renderItem={({item}) => <ItemLine item={item} />  }
          keyExtractor={item => item.id}
        /> */}
        <ScrollView>
        {data.map((item, index) => (
          <ItemLine key={index} item={item} />
        ))}
      </ScrollView>
      </SafeAreaView>
    );
  }
  
 
  
  export default ItemsList