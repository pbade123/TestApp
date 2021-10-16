import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';

const API_URL = 'https://jsonplaceholder.typicode.com/albums/1/photos';

const IMAGE_SIZE = 80;

const SPACING = 12;

const fetchImagesFromJSON = async () => {
  const data = await fetch(API_URL);

  const results = await data.json();
  return results;
};

const Album = () => {
  const [images, setImages] = useState(null);

  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;

  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToActiveIndex = index => {
    console.log('index', index);
    setActiveIndex(index);

    topRef.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });
    if (index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > width / 2) {
      thumbRef.current?.scrollToOffset({
        offset: index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE / 2,
        animated: true,
      });
    } else {
      thumbRef.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  };

  const topRef = useRef();
  const thumbRef = useRef();

  useEffect(() => {
    const fetchImages = async () => {
      const imageList = await fetchImagesFromJSON();
      setImages(imageList);
    };

    fetchImages();
  }, []);

  if (!images) {
    return <Text>Loading....</Text>;
  }

  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <FlatList
        ref={topRef}
        horizontal
        pagingEnabled
        data={images}
        key={({item}) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={ev => {
          scrollToActiveIndex(
            Math.floor(ev.nativeEvent.contentOffset.x / width),
          );
        }}
        renderItem={({item}) => {
          return (
            <View style={{width, height}}>
              <Image
                source={{uri: item.url}}
                style={[StyleSheet.absoluteFillObject]}
              />
            </View>
          );
        }}
      />
      <FlatList
        ref={thumbRef}
        horizontal
        pagingEnabled
        data={images}
        key={({item}) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        style={{position: 'absolute', bottom: IMAGE_SIZE}}
        contentContainerStyle={{paddingHorizontal: SPACING}}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity onPress={() => scrollToActiveIndex(index)}>
              <Image
                source={{uri: item.url}}
                style={{
                  width: IMAGE_SIZE,
                  height: IMAGE_SIZE,
                  borderRadius: SPACING,
                  marginRight: SPACING,
                  borderWidth: 2,
                  borderColor: activeIndex === index ? '#fff' : 'transparent',
                }}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Album;
