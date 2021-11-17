import React from 'react';
import {
  Button,
  SafeAreaView,
  Text, View,
} from 'react-native';

import Drawer from 'react-native-circle-drawer';

const App = () => {
  const drawer = React.useRef(null);

  const sideMenu = () => {
    return (
        <View style={{flex: 1}}>
          <Text>Item 1 </Text>
          <Text>Item 2 </Text>
        </View>
    )
  };

  const renderTopRightView = () => {
    return <Text>Test</Text>
  };

  return (
      <SafeAreaView style={{flex: 1}}>
        <Drawer
            ref={drawer}
            sideMenu={sideMenu()}
            topRightView={renderTopRightView()}
        >
          <Button title="open drawer" onPress={() => drawer.current.open()}/>
          <Text>Main application here!!</Text>
        </Drawer>
      </SafeAreaView>
  );
};

export default App;
