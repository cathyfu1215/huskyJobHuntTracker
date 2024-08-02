import React from 'react'
import { Text, FlatList,SafeAreaView,View } from 'react-native'

function ItemsList({type, data,navigation, route}) {

    function ItemLine({item}) {
        return <View><Text>{item}</Text></View>
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