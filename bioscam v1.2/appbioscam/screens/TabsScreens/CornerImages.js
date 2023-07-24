import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

export default function CornerImages() {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/burbujas.png')} style={styles.topLeft} />
      <Image source={require('../../assets/burbujas.png')} style={styles.topRight} />
      <Image source={require('../../assets/algas.png')} style={styles.bottomLeft} />
      <Image source={require('../../assets/algas.png')} style={styles.bottomRight} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  topLeft: {
    position: 'absolute',
    top: 0,
    left: -85,
    width: 165, // ajusta estos valores según tus necesidades
    height: 190,
  },
  topRight: {
    position: 'absolute',
    top: 15,
    right: -85,
    width: 165,
    height: 195,
  },
  bottomLeft: {
    position: 'absolute',
    bottom: -30,
    left: -10,
    width: 150,
    height: 150,
  },
  bottomRight: {
    position: 'absolute',
    bottom: -30,
    right: -20,
    width: 150,
    height: 150,
  },
});
