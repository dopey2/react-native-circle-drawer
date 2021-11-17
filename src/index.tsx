import React, {Component} from 'react';
import {View, Dimensions, Animated, Easing} from 'react-native';
import OuterCircle from "./OuterCircle";
import InnerCircle from "./InnerCircle";
import CloseButton from "./CloseButton";

interface Props {
  primaryColor: string,
  secondaryColor: string,
  cancelColor: string,
  marginLeft: number,
  marginTop: number,
  openStart: () => void,
  openEnd: () => void,
  closeStart: () => void,
  closeEnd: () => void,
  sideMenu?: JSX.Element | null;
  topRightView?: JSX.Element | null;
}

enum DrawerStatus {
  close = 0,
  open = 1,
}

interface State {
  status: DrawerStatus
}

const {width, height} = Dimensions.get('window');


export default class Drawer extends Component<Props, State> {

  static defaultProps = {
    marginLeft: 0,
    marginTop: 0,
    primaryColor: '#731ED2',
    secondaryColor: '#9646EC',
    cancelColor: '#731ED2',
  };

  private defaultTopRightView: number = -width;
  private scaleInner = new Animated.Value(0.01);
  private scaleOuter = new Animated.Value(0.01);
  private closeTop = new Animated.Value(100);
  private opacity = new Animated.Value(0.1);
  private sideMenuTop = new Animated.Value(-500);
  topRightView = new Animated.Value(this.defaultTopRightView);

  state = {
    status: 0
  };

  public open = () => {
    const {scaleInner, scaleOuter, closeTop, opacity, sideMenuTop, topRightView, defaultTopRightView} = this;
    this.setState({status: 1}, () => {
      this.props.openStart && this.props.openStart()
      Animated.parallel([
        Animated.timing(scaleOuter, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(scaleInner, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {toValue: 1, duration: 500, useNativeDriver: true}),
        Animated.timing(sideMenuTop, {toValue: 0, duration: 250, useNativeDriver: false}),
        Animated.timing(closeTop, {toValue: 0, duration: 350, easing: Easing.cubic, useNativeDriver: false}),
        Animated.timing(topRightView, {toValue: defaultTopRightView + 150, duration: 200, useNativeDriver: false}),

      ]).start(() => {
        this.props.openEnd && this.props.openEnd();
      });
    });
  };

  public close = () => {
    const {scaleInner, scaleOuter, closeTop, opacity, sideMenuTop, topRightView, defaultTopRightView} = this;

    this.props.closeStart && this.props.closeStart();
    Animated.parallel([
      Animated.timing(scaleOuter, {toValue: 0.01, duration: 450, useNativeDriver: true}),
      Animated.timing(scaleInner, {toValue: 0.01, duration: 300, useNativeDriver: true}),
      Animated.timing(opacity, {toValue: 0.1, duration: 300, useNativeDriver: true}),
      Animated.timing(sideMenuTop, {toValue: -500, duration: 200, useNativeDriver: false}),
      Animated.timing(closeTop, {toValue: 100, duration: 350, easing: Easing.cubic, useNativeDriver: false}),
      Animated.timing(topRightView, {toValue: defaultTopRightView, duration: 200, useNativeDriver: false})
    ]).start(() => {
      this.props.closeEnd && this.props.closeEnd();
      this.setState({status: 0});
    });

  };

  renderMenu() {
    if (this.props.sideMenu) {
      return this.props.sideMenu;
    }
    return null;
  }

  renderTopRightView() {
    if (this.props.topRightView) {
      return this.props.topRightView;
    }
    return null;
  }

  renderDrawer() {

    const {primaryColor, secondaryColor, cancelColor, marginLeft, marginTop} = this.props;
    const {scaleInner, scaleOuter, opacity, closeTop, sideMenuTop, topRightView} = this;
    const {status} = this.state;

    const diameter = (width + height) - (marginLeft + marginTop);
    const right = diameter / 2 - marginLeft;
    const top = -diameter / 2 + marginTop;

    if (status) {
      return (
          <View style={{width: "100%", height: "100%", position: "absolute", zIndex: 999}}>
            <OuterCircle
                diameter={diameter}
                color={secondaryColor}
                opacity={opacity}
                scale={scaleOuter}
                top={top}
                right={right}
            />

            <InnerCircle
                diameter={diameter}
                color={primaryColor}
                opacity={opacity}
                scale={scaleInner}
                top={top}
                right={right}
            />

            <CloseButton
                top={closeTop}
                opacity={opacity}
                color={cancelColor}
                onPress={this.close}
            />

            <View style={{width: "100%", height: "100%", position: "absolute"}}>
              <Animated.View style={{width: 150, height: 80, right: topRightView, top: 0}}>
                {this.renderTopRightView()}
              </Animated.View>
            </View>

            <View style={{width: "100%", height: "100%", position: "absolute"}}>
              <Animated.View
                  style={{
                    width: diameter / 3.7,
                    height: diameter / 2.6,
                    paddingTop: 30,
                    paddingLeft: 30,
                    top: sideMenuTop
                  }}>
                <View style={{width: "100%", height: "100%"}}>
                  {this.renderMenu()}
                </View>
              </Animated.View>
            </View>
          </View>
      );
    }

    return null;
  }

  render() {
    return (
        <View style={{flex: 1, width: "100%", height: "100%"}}>
          <View style={{flex: 1, width: "100%", height: "100%", zIndex: 0}}>
            {this.props.children}
          </View>
          {this.renderDrawer()}
        </View>
    );
  }
}