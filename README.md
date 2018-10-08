# Description
This is a Drawer for React-Native inspired by Karan Shah Navigation Drawer Concept

[Karan Shah Dribbble account](https://dribbble.com/karan_shah)

[Karan Shah Navigation Drawer Concept](https://dribbble.com/shots/3661919-Navigation-Drawer-Concept)
 
 ![drawer gif](https://image.ibb.co/cws5Dp/drawer.gif)


# Installation
npm install --save react-native-circle-drawer

# Use

```javascript
import Drawer from 'react-native-circle-drawer'

render(){
    return(
        <Drawer sideMenu={this.renderSideMenu}>
            <App/>
        </Drawer>
    )
}

```

# Props



| name           | type   |default           | description  |
| -------------  | ---------- |------------- | -----|
| primaryColor   | string     | #731ED2      |          |
| secondaryColor | string     | #9646EC      |    |
| cancelColor    | string     | #731ED2      |    |
| sideMenu       | React.Component     |       |    |
| topRightView    | React.Component     |       |    |
| marginLeft     | number     | 0      | left margin starting from the middle of the circle     |
| marginTop      | number     | 0      | top margin starting from the middle of the circle   |
| openStart      | function     |       | callback when the open animation begin     |
| openEnd        | function     |       | callback when the open animation end  |
| closeStart     | function     |       | callback when the close animation begin    |
| closeEnd       | function     |       | callback when the close animation end  |

# Functions

| name           | description              |
| -------------  | ---------- |
| open   | open the drawer     | 
| close | close the drawer     | 


# Example

```javascript

    openDrawer(){
        this.refs.DRAWER.open
    }
    
    renderSideMenu(){
        return(
            <View style={{flex:1}}>
                <Text>Item 1 </Text>
                <Text>Item 2 </Text>
            </View>
        )
    }
    
    renderTopRightView(){
        return(
            <View>
                <Text>Hello</Text>
            </View>
        )
    }
    
    render(){
        <Drawer
            ref="DRAWER"
            sideMenu={this.renderSideMenu()}
            topRightView={this.renderTopRightView()}
        >
          <Button title="open drawer" onPress={()=>this.openDrawer()} />
          <Text>Main application here!!</Text>
        </Drawer>
    
    }
    
```

# Licence
MIT

# Credit
Karan Shah
