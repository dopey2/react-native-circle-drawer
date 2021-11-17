import React from "react";
import {StyleSheet, View} from "react-native";

export default class CrossIcon extends React.PureComponent {
  render() {
    return (
        <View style={styles.container}>
          <View style={styles.cross1}/>
          <View style={styles.cross2}/>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  cross1: {
    transform: [{rotateZ: "45deg"}],
    width: 30,
    height: 5,
    borderRadius: 30,
    top: 4,
    backgroundColor: "white"
  },
  cross2: {
    transform: [{rotateZ: "-45deg"}],
    width: 30,
    height: 5,
    borderRadius: 30,
    bottom: 1,
    backgroundColor: "white"
  }
});