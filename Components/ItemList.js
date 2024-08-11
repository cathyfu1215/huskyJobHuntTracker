import React from 'react'
import { Text, FlatList,SafeAreaView,View, StyleSheet} from 'react-native'
import styles from '../styleHelper';
import { FontAwesome } from '@expo/vector-icons';
import PressableListItem from './PressableListItem';
import { ScrollView } from 'react-native';
import PressableButton from './PressableButton';
import { useState } from 'react';

function ItemsList({data,navigation,route}) {


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
    
  
    return (
      <SafeAreaView>
        <View style={{flexDirection:'row',alignSelf:'center'}}>
      <PressableButton pressedFunction={()=>{console.log('will implement later')}}>
        <Text>Sort by Last Update</Text>
      </PressableButton>
      <PressableButton pressedFunction={()=>{console.log('will implement later')}}>
        <Text>Sort by Preference Score</Text>
      </PressableButton>
      </View>
        <ScrollView>
        {data.map((item) => (
          <ItemLine key={Math.random()} item={item} />
        ))}
      </ScrollView>
      </SafeAreaView>
    );
  }
  
 
  
  export default ItemsList