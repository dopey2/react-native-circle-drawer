import React from "react";
import {Animated, TouchableOpacity} from "react-native";
import CrossIcon from "./CrossIcon";


interface Props {
  top: Animated.Value;
  opacity: Animated.Value;
  color: string;
  onPress: () => void;
  children?: JSX.Element | null;
}

export default class CloseButton extends React.PureComponent<Props> {

  render() {
    return (
        <Animated.View style={{
          transform: [{translateY: this.props.top}],
          backgroundColor: this.props.color,
          alignItems: "center",
          justifyContent: "center",
          position: 'absolute',
          alignSelf: 'center',
          bottom: 25,
          width: 50,
          height: 50,
          borderRadius: 50,
          elevation: 2
        }}>
          <TouchableOpacity
              style={{width: 50, height: 50}}
              onPress={this.props.onPress}
          >
            {this.props.children ? this.props.children : (
                <CrossIcon/>
            )}
          </TouchableOpacity>
        </Animated.View>
    );
  }
}