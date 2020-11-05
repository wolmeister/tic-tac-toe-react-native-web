import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { registerRootComponent } from 'expo'; // import it explicitly
import Board from './Board';

function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Board />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101d2b',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default registerRootComponent(App);
