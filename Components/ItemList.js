import React, { useEffect } from 'react'
import { Text, FlatList,SafeAreaView,View, StyleSheet} from 'react-native'
import styles from '../styleHelper';
import { FontAwesome } from '@expo/vector-icons';
import PressableListItem from './PressableListItem';
import { ScrollView } from 'react-native';
import PressableButton from './PressableButton';
import { useState } from 'react';

function ItemsList({data,navigation,route}) {

  const [sortedData, setSortedData] = useState(data);

  useEffect(() => {
    setSortedData(data);
  }, [data]);

    function ItemLine({item}) {

      //console.log('item in ItemLine', item);
      function handlePressItemDetail() {
        navigation.navigate('JobApplicationDetail', {data: item});
      }
        return (<View style={styles.itemContainer}>
          <PressableListItem pressedFunction={handlePressItemDetail}>
          <View style={{flex:1,flexDirection:'row'}}>
          <View>
          <Text style={{fontWeight:'bold',fontStyle:'italic',fontSize:15}}>{item.companyName}</Text>
          <Text style={{fontWeight:'bold',fontSize:13}}>{item.positionName}</Text>
          <Text style={{fontStyle:'italic'}}>{item.status}</Text>
          <Text style={styles.itemText}>Last Update: {item.date.toDate().toDateString()}</Text>
          </View>
          <View style={{alignItems:'center',marginLeft:10}}>
          <Text style={styles.itemText}>Preference Score: </Text>
          <Text style={{fontSize:30,fontWeight:'bold'}}>{item.preferenceScore}</Text>
          </View>
          </View>
          </PressableListItem>
        </View>);
    }

    // Updated sorting functions
  function sortByLastUpdate() {
    const sorted = [...data].sort((a, b) => b.date.toDate() - a.date.toDate());
    setSortedData(sorted);
  }

  function sortByPreferenceScore() {
    const sorted = [...data].sort((a, b) => b.preferenceScore - a.preferenceScore);
    setSortedData(sorted);
  }
    
  
    return (
      <View>
        <View style={{flexDirection:'row',alignSelf:'center'}}>
      <PressableButton pressedFunction={sortByLastUpdate}>
        <Text>Sort by Last Update</Text>
      </PressableButton>
      <PressableButton pressedFunction={sortByPreferenceScore}>
        <Text>Sort by Preference Score</Text>
      </PressableButton>
      </View>
      <ScrollView bounces={false}>
        {sortedData.map((item) => (
          <ItemLine key={Math.random()} item={item} />
        ))}
        <View style={{marginBottom:100,marginTop:20,margin:10}}>
        <Text>This is the end of the job application records. Apply more!</Text>
        </View>
      </ScrollView>
      </View>
    );
  }
  
 
  
  export default ItemsList;