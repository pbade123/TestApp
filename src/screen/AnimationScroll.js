/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StyleSheet,
  Animated,
} from 'react-native';

const API_URL = 'https://reqres.in/api/users';

const {width, height} = Dimensions.get('screen');

const BG_IMG =
  'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';

const AVATAR_SIZE = 70;

const SPACING = 20;

const AnimationScroll = () => {
  const [data, setData] = useState(null);
  const [pageNumber, setPageNumber] = useState(20);
  const test = useRef(8);

  const fetchImagesFromJSON = useCallback(async () => {
    const data = await fetch(`${API_URL}?per_page=${pageNumber}`);

    const results = await data.json();
    return results;
  }, [pageNumber]);

  useEffect(() => {
    const fetchImages = async () => {
      const result = await fetchImagesFromJSON();
      setData(result.data);
    };

    fetchImages();
  }, [fetchImagesFromJSON]);

  useEffect(() => {
    if (pageNumber === 8) {
      test.current = 10;
      //   setPageNumber(10);
    }
    // console.log(pageNumber, 'page number--test', test.current);
  }, [pageNumber, test]);

  const scrollY = React.useRef(new Animated.Value(0)).current;

  const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Image
        source={{uri: BG_IMG}}
        style={StyleSheet.absoluteFillObject}
        blurRadius={40}
      />
      <SafeAreaView>
        {data ? (
          <Animated.FlatList
            data={data}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: scrollY}}}],
              {useNativeDriver: true},
            )}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{padding: SPACING}}
            renderItem={({item, index}) => {
              // console.log('Item size', ITEM_SIZE);
              const inputRange = [
                -1,
                0,
                ITEM_SIZE * index,
                ITEM_SIZE * (index + 2),
              ];

              const opacityRange = [
                -1,
                0,
                ITEM_SIZE * index,
                ITEM_SIZE * (index + 0.5),
              ];

              const scale = scrollY.interpolate({
                inputRange,
                outputRange: [1, 1, 1, 0],
              });

              const opacity = scrollY.interpolate({
                inputRange: opacityRange,
                outputRange: [1, 1, 1, 0],
              });

              return (
                <Animated.View
                  onPress={() => {
                    // console.log('test.current');
                    test.current = 20;
                    // console.log(test.current);
                  }}
                  style={{
                    flexDirection: 'row',
                    padding: SPACING,
                    marginBottom: SPACING,
                    borderRadius: 12,
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 10,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 20,
                    transform: [{scale}],
                    opacity: opacity,
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{uri: item.avatar}}
                    style={{
                      width: AVATAR_SIZE,
                      height: AVATAR_SIZE,
                      borderRadius: AVATAR_SIZE,
                      marginRight: SPACING / 2,
                    }}
                  />

                  <View>
                    <Text style={{fontSize: 22, fontWeight: '700'}}>
                      {item.first_name} {item.last_name}
                    </Text>
                    <Text>{test.current === 20 ? '20' : '10'}</Text>
                    <Text
                      style={{fontSize: 18, opacity: 0.7, color: '#0099cc'}}>
                      {item.email}
                    </Text>
                  </View>
                </Animated.View>
              );
            }}
          />
        ) : (
          <Text>Loading</Text>
        )}
      </SafeAreaView>
    </View>
  );
};

export default AnimationScroll;
