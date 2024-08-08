import React from 'react';
import { Text, ScrollView, SafeAreaView, View, StyleSheet } from 'react-native';
import styles from '../styleHelper';
import { Pressable } from 'react-native';

function NoteList({ data, navigation, route }) {

  function NoteLine({ item }) {
    function handlePressItemDetail() {
      console.log('item in NoteLine', item);
    }

    return (
      <View style={styles.itemContainer}>
        <Pressable onPress={handlePressItemDetail}>
          <View>
            <Text>text: {item.text}</Text>
            <Text>image: {item.image}</Text>
          </View>
        </Pressable>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        {data.map(item => (
          <NoteLine key={item.id} item={item} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default NoteList;
