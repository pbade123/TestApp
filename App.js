import React from 'react';
import {Dimensions, StyleSheet, View, Text} from 'react-native';

import Config from 'react-native-config';

import Album from './src/screen/Album';
import AnimationScroll from './src/screen/AnimationScroll';

// const App = () => {
//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <StatusBar />
//       <View style={styles.container}>
//         {/* <TouchableOpacity
//           style={styles.button}
//           activeOpacity={0.5}
//           onPress={() => console.log('pressed')}>
//           <View style={{alignItems: 'flex-start', elevation: 4}}>
//             <Text>Left</Text>
//           </View>
//           <View style={{alignItems: 'center', elevation: 4}}>
//             <Text style={styles.buttonText}>Button</Text>
//           </View>
//           <View style={{alignItems: 'flex-end', elevation: 4}}>
//             <Text>Right</Text>
//           </View>
//         </TouchableOpacity> */}
//         <Text style={styles.text}>API_URL={Config.API_URL}</Text>
//         <Button
//           icon={{
//             name: 'arrow-right',
//             size: 15,
//             color: 'white',
//           }}
//           title="API_URL={Config.API_URL}"
//           onPress={() => {
//             console.log(Config);
//           }}
//         />
//         {/* <Button
//           title="Press me"
//           onPress={() => Alert.alert('Simple Button pressed')}
//         /> */}
//       </View>
//     </SafeAreaView>
//   );
// };

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>API_URL={Config.API_URL}</Text>
      {/* <Album /> */}
      {/* <AnimationScroll /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    borderRadius: 60,
    padding: 10,
    width: '80%',
    height: Dimensions.get('screen').width / 8,
    elevation: 2,
    backgroundColor: 'cyan',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
  },
});

export default App;
