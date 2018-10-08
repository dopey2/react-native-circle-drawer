import React, {Component} from 'react';
import {View, Dimensions, Animated, Easing, Button, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';


export default class Drawer extends Component{

  constructor(){
    super();
    this.state = {
      width:  0,
      height: 0,
      status: "close"
    }
    this.open  = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  componentDidMount(){
   var {width, height} = {...Dimensions.get('window')};
   this.setState({width: width, height: height});
   
   this.defaultTopRightView = -width;

   this.scaleInner  = new Animated.Value(0.01);
   this.scaleOutter = new Animated.Value(0.01);
   this.closeTop    = new Animated.Value(100);
   this.opacity     = new Animated.Value(.3);
   this.sideMenuTop = new Animated.Value(-500);
   this.topRightView = new Animated.Value(this.defaultTopRightView);

  }


  open(){
    const {scaleInner, scaleOutter, closeTop, opacity, sideMenuTop, topRightView, defaultTopRightView} = {...this};
    this.setState({status: "transition"}, ()=>{
      this.props.openStart && this.props.openStart()
      Animated.parallel([
        Animated.timing(scaleOutter, {toValue: 1, duration: 350, useNativeDriver: true, easing: Easing.out(Easing.quad)}),
        Animated.timing(scaleInner,  {toValue: 1, duration: 450, useNativeDriver: true, easing: Easing.out(Easing.quad)}),
        Animated.timing(opacity,     {toValue: 1, duration: 300, useNativeDriver: true}),
        Animated.timing(sideMenuTop, {toValue: 0, duration: 250}),
        Animated.timing(closeTop,    {toValue: 0, duration: 350, easing : Easing.cubic}),
        Animated.timing(topRightView, {toValue: defaultTopRightView + 150, duration: 200}),

      ]).start(()=>{
        this.props.openEnd && this.props.openEnd()
        this.setState({status:"open"});
      });
    }); 
  }

  close(){
    const {scaleInner, scaleOutter, closeTop, opacity, sideMenuTop, topRightView, defaultTopRightView} = {...this};
    this.setState({status: "transition"}, ()=>{
      this.props.closeStart && this.props.closeStart()
      Animated.parallel([
        Animated.timing(scaleOutter, {toValue: 0.01,   duration: 450, useNativeDriver: true}),
        Animated.timing(scaleInner,  {toValue: 0.01,   duration: 300, useNativeDriver: true}),
        Animated.timing(opacity,     {toValue: 0.3,    duration: 300, useNativeDriver: true}),
        Animated.timing(sideMenuTop, {toValue: -500,   duration: 200}),
        Animated.timing(closeTop,    {toValue: 100,    duration: 350, easing : Easing.cubic}),
        Animated.timing(topRightView, {toValue: defaultTopRightView,   duration: 200})
      ]).start(()=>{
        this.props.closeEnd && this.props.closeEnd()
        this.setState({status: "close"});
      });
    });
  }

  renderMenu(){
    if(this.props.sideMenu){
      return this.props.sideMenu;
    }
  }

  renderTopRightView(){
    if(this.props.topRightView){
      return this.props.topRightView
    }
  }

  renderDrawer(){

    const {primaryColor, secondaryColor, cancelColor, marginLeft, marginTop} = {...this.props};
    const {scaleInner, scaleOutter, opacity, closeTop, sideMenuTop, topRightView} = {...this};
    const {status, width, height} = {...this.state};

    const mL = marginLeft;          // marginLeft of the middle of the circle
    const mT = marginTop;           // marginTop  of the middle of the circle
    
    const cDiam = (width + height) - (mL + mT); // circle diameter
    const right = cDiam/2 - mL;  
    const top   = -cDiam/2 + mT;

    if(status != "close" ){
      return(
        <View style={{width:"100%", height:"100%", position:"absolute", zIndex:999}}>
         
          <View style={{width:"100%", height:"100%", position:"absolute"}}>
            <Animated.View style={{opacity:opacity ,transform:[{scale:scaleOutter}], width:cDiam, height:cDiam, right:right, top:top, borderRadius:height*2, backgroundColor: secondaryColor}}>
            </Animated.View>
          </View>
          
          <View style={{width:"100%", height:"100%", position:"absolute"}}>
            <Animated.View style={{opacity:opacity, transform:[{scale:scaleInner}], width:cDiam - 175, height:cDiam, right:right -175/2, top:top , borderRadius:height*2, backgroundColor: primaryColor}}>
            </Animated.View>
          </View>

          {/*CANCEL BOUTON*/}
          <View style={{width:"100%", height:"100%", position:"absolute",alignItems:"center",justifyContent:"flex-end"}}>
            <Animated.View style={{top:closeTop, alignItems:"center", justifyContent:"center", marginBottom:25,width:50, height:50, borderRadius:50, backgroundColor: cancelColor, elevation:2}}>
              <TouchableOpacity style={{width:50, height:50, justifyContent:"center",alignItems:"center"}} onPress={this.close}>
                <View style={{width:50, height:50, justifyContent:"center",alignItems:"center"}}>
                  <View style={{transform:[{rotateZ:"45deg"}],width:30,height:5, borderRadius:30,top:4, backgroundColor:"white"}}></View>
                   <View style={{transform:[{rotateZ:"-45deg"}],width:30,height:5, borderRadius:30,bottom:1, backgroundColor:"white"}}></View>  
                </View>           
              </TouchableOpacity>
            </Animated.View>
          </View>

          <View style={{width:"100%", height:"100%", position:"absolute"}}>
            <Animated.View style={{width:150, height:80, right: topRightView, top:0}}>
              {this.renderTopRightView()}
            </Animated.View>
          </View>

          <View style={{width:"100%", height:"100%", position:"absolute"}}>
            <Animated.View style={{width:cDiam / 3.7, height:cDiam /2.6, paddingTop:30, paddingLeft:30, top:sideMenuTop}}>
             <View style={{width:"100%", height:"100%"}}>
              {this.renderMenu()}
             </View>
            </Animated.View>
          </View>

        </View>
      )
    }
  }

  render() {
    return (
      <View style={{flex: 1,width:"100%", height:"100%"}}>
        <View style={{flex:1, width:"100%", height:"100%",zIndex:0}}>
          {this.props.children}
        </View>
        {this.renderDrawer()}
      </View>
    );
  }
}

Drawer.propTypes = {
  primaryColor:   PropTypes.string,
  secondaryColor: PropTypes.string,
  cancelColor:    PropTypes.string,
  marginLeft:     PropTypes.number,
  marginTop:      PropTypes.number,
  openStart:      PropTypes.func,
  openEnd:        PropTypes.func,
  closeStart:     PropTypes.func,
  closeENd:       PropTypes.func,
};

Drawer.defaultProps  = {
  marginLeft:     0,
  marginTop:      0,
  primaryColor:   "#731ED2",
  secondaryColor: "#9646EC",
  cancelColor:    "#731ED2"
}