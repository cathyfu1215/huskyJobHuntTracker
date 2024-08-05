import React from 'react'
import { Text, FlatList,SafeAreaView,View, StyleSheet} from 'react-native'

function ItemsList({data}) {

    function ItemLine({item}) {
        return (<View style={styles.itemContainer}>
          <Text style={styles.itemText}>Company: {item.companyName}</Text>
          <Text style={styles.itemText}>Position: {item.positionName}</Text>
          <Text style={styles.itemText}>Status: {item.status}</Text>
          <Text style={styles.itemText}>Date: {item.date.toDate().toDateString()}</Text>
          <Text style={styles.itemText}>Preference Score: {item.preferenceScore}</Text>
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
  
  const styles = StyleSheet.create({
    itemContainer: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    itemText: {
      fontSize: 16,
    },
  });
  
  export default ItemsList