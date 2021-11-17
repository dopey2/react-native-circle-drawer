import React, { Component } from 'react';
import { View, Dimensions, Animated, Easing } from 'react-native';
import OuterCircle from "./OuterCircle";
import InnerCircle from "./InnerCircle";
import CloseButton from "./CloseButton";
var DrawerStatus;
(function (DrawerStatus) {
    DrawerStatus[DrawerStatus["close"] = 0] = "close";
    DrawerStatus[DrawerStatus["open"] = 1] = "open";
})(DrawerStatus || (DrawerStatus = {}));
const { width, height } = Dimensions.get('window');
export default class Drawer extends Component {
    constructor() {
        super(...arguments);
        this.defaultTopRightView = -width;
        this.scaleInner = new Animated.Value(0.01);
        this.scaleOuter = new Animated.Value(0.01);
        this.closeTop = new Animated.Value(100);
        this.opacity = new Animated.Value(0.1);
        this.sideMenuTop = new Animated.Value(-500);
        this.topRightView = new Animated.Value(this.defaultTopRightView);
        this.state = {
            status: 0
        };
        this.open = () => {
            const { scaleInner, scaleOuter, closeTop, opacity, sideMenuTop, topRightView, defaultTopRightView } = this;
            this.setState({ status: 1 }, () => {
                this.props.openStart && this.props.openStart();
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
                    Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: true }),
                    Animated.timing(sideMenuTop, { toValue: 0, duration: 250, useNativeDriver: false }),
                    Animated.timing(closeTop, { toValue: 0, duration: 350, easing: Easing.cubic, useNativeDriver: false }),
                    Animated.timing(topRightView, { toValue: defaultTopRightView + 150, duration: 200, useNativeDriver: false }),
                ]).start(() => {
                    this.props.openEnd && this.props.openEnd();
                });
            });
        };
        this.close = () => {
            const { scaleInner, scaleOuter, closeTop, opacity, sideMenuTop, topRightView, defaultTopRightView } = this;
            this.props.closeStart && this.props.closeStart();
            Animated.parallel([
                Animated.timing(scaleOuter, { toValue: 0.01, duration: 450, useNativeDriver: true }),
                Animated.timing(scaleInner, { toValue: 0.01, duration: 300, useNativeDriver: true }),
                Animated.timing(opacity, { toValue: 0.1, duration: 300, useNativeDriver: true }),
                Animated.timing(sideMenuTop, { toValue: -500, duration: 200, useNativeDriver: false }),
                Animated.timing(closeTop, { toValue: 100, duration: 350, easing: Easing.cubic, useNativeDriver: false }),
                Animated.timing(topRightView, { toValue: defaultTopRightView, duration: 200, useNativeDriver: false })
            ]).start(() => {
                this.props.closeEnd && this.props.closeEnd();
                this.setState({ status: 0 });
            });
        };
    }
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
        const { primaryColor, secondaryColor, cancelColor, marginLeft, marginTop } = this.props;
        const { scaleInner, scaleOuter, opacity, closeTop, sideMenuTop, topRightView } = this;
        const { status } = this.state;
        const diameter = (width + height) - (marginLeft + marginTop);
        const right = diameter / 2 - marginLeft;
        const top = -diameter / 2 + marginTop;
        if (status) {
            return (<View style={{ width: "100%", height: "100%", position: "absolute", zIndex: 999 }}>
            <OuterCircle diameter={diameter} color={secondaryColor} opacity={opacity} scale={scaleOuter} top={top} right={right}/>

            <InnerCircle diameter={diameter} color={primaryColor} opacity={opacity} scale={scaleInner} top={top} right={right}/>

            <CloseButton top={closeTop} opacity={opacity} color={cancelColor} onPress={this.close}/>

            <View style={{ width: "100%", height: "100%", position: "absolute" }}>
              <Animated.View style={{ width: 150, height: 80, right: topRightView, top: 0 }}>
                {this.renderTopRightView()}
              </Animated.View>
            </View>

            <View style={{ width: "100%", height: "100%", position: "absolute" }}>
              <Animated.View style={{
                    width: diameter / 3.7,
                    height: diameter / 2.6,
                    paddingTop: 30,
                    paddingLeft: 30,
                    top: sideMenuTop
                }}>
                <View style={{ width: "100%", height: "100%" }}>
                  {this.renderMenu()}
                </View>
              </Animated.View>
            </View>
          </View>);
        }
        return null;
    }
    render() {
        return (<View style={{ flex: 1, width: "100%", height: "100%" }}>
          <View style={{ flex: 1, width: "100%", height: "100%", zIndex: 0 }}>
            {this.props.children}
          </View>
          {this.renderDrawer()}
        </View>);
    }
}
Drawer.defaultProps = {
    marginLeft: 0,
    marginTop: 0,
    primaryColor: '#731ED2',
    secondaryColor: '#9646EC',
    cancelColor: '#731ED2',
};
//# sourceMappingURL=index.js.map