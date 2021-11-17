import React from "react";
import {Animated, View} from "react-native";

interface Props {
  diameter: number;
  color: string;
  top: number;
  right: number;
  opacity: Animated.Value;
  scale: Animated.Value;
}

export default class InnerCircle extends React.PureComponent<Props> {
  render() {
    return (
        <View style={{width: "100%", height: "100%", position: "absolute"}}>
          <Animated.View style={{
            opacity: this.props.opacity,
            transform: [{scale: this.props.scale}],
            width: this.props.diameter * 0.8,
            height: this.props.diameter,
            right: this.props.right - (this.props.diameter - this.props.diameter * 0.8) / 2,
            top: this.props.top,
            borderRadius: this.props.diameter * 2,
            backgroundColor: this.props.color
          }}>
          </Animated.View>
        </View>
    );
  }
}