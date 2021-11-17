import { Component } from 'react';
import { Animated } from 'react-native';
interface Props {
    primaryColor: string;
    secondaryColor: string;
    cancelColor: string;
    marginLeft: number;
    marginTop: number;
    openStart: () => void;
    openEnd: () => void;
    closeStart: () => void;
    closeEnd: () => void;
    sideMenu?: JSX.Element | null;
    topRightView?: JSX.Element | null;
}
declare enum DrawerStatus {
    close = 0,
    open = 1
}
interface State {
    status: DrawerStatus;
}
export default class Drawer extends Component<Props, State> {
    static defaultProps: {
        marginLeft: number;
        marginTop: number;
        primaryColor: string;
        secondaryColor: string;
        cancelColor: string;
    };
    private defaultTopRightView;
    private scaleInner;
    private scaleOuter;
    private closeTop;
    private opacity;
    private sideMenuTop;
    topRightView: Animated.Value;
    state: {
        status: number;
    };
    open: () => void;
    close: () => void;
    renderMenu(): JSX.Element | null;
    renderTopRightView(): JSX.Element | null;
    renderDrawer(): JSX.Element | null;
    render(): JSX.Element;
}
export {};
