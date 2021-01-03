import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  PanResponder,
  Animated,
  Dimensions,
  Button,
  Linking,
} from "react-native";

import { priceDisplay } from "../util";
import ajax from "../ajax";

export default function DealDetail({ initialDealData, onBack }) {
  const width = Dimensions.get("window").width;
  const imageXPos = new Animated.Value(0);
  const indexDirectionRef = useRef(0);
  const imagePanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gs) => {
      imageXPos.setValue(gs.dx);
    },
    onPanResponderRelease: (evt, gs) => {
      if (Math.abs(gs.dx) > width * 0.3) {
        const direction = Math.sign(gs.dx);
        Animated.timing(imageXPos, {
          toValue: direction * width,
          duration: 250,
          useNativeDriver: false,
        }).start(() => {
          indexDirectionRef.current = -1 * direction;
          handleSwipe();
        });
      } else {
        Animated.spring(imageXPos, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  const handleSwipe = () => {
    if (!deal.media[imageIndex + indexDirectionRef.current]) {
      Animated.spring(imageXPos, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
      return;
    }
    setImageIndex((prevImage) => prevImage + indexDirectionRef.current);
  };

  const [deal, setDeal] = useState(initialDealData);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const ac = new AbortController();
    ajax.requestDealdetail(deal.key).then((fullDeal) => setDeal(fullDeal));

    return () => ac.abort();
  });

  useEffect(() => {
    imageXPos.setValue(indexDirectionRef.current * width);
    Animated.spring(imageXPos, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  }, [imageIndex]);

  const openDealURL = () => {
    Linking.openURL(deal.url);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          onBack(null);
        }}
      >
        <Text style={styles.back}>Back</Text>
      </TouchableOpacity>
      <View style={styles.itemContainer}>
        <Animated.Image
          {...imagePanResponder.panHandlers}
          source={{ uri: deal.media[imageIndex] }}
          style={[styles.image, { left: imageXPos }]}
        />
        <Text style={styles.title}>{deal.title}</Text>
        <View style={styles.info}>
          <View style={styles.headerDetails}>
            <View style={styles.simpleDetails}>
              <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
              <Text style={styles.cause}>{deal.cause.name}</Text>
            </View>
            {deal.user && (
              <View style={styles.user}>
                <Image
                  source={{ uri: deal.user.avatar }}
                  style={styles.avatar}
                />
                <Text>{deal.user.name}</Text>
              </View>
            )}
          </View>
          <Text style={styles.description}>{deal.description}</Text>
        </View>
        <Button title="Buy this deal" onPress={openDealURL} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 50,
  },
  back: {
    fontWeight: "bold",
    fontSize: 24,
    paddingBottom: 10,
    color: "#22f",
    marginHorizontal: 20,
  },
  itemContainer: {
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  info: {
    paddingHorizontal: 10,
    paddingBottom: 5,
    borderTopWidth: 1,
    borderColor: "#94938f56",
  },
  title: {
    fontWeight: "bold",
    backgroundColor: "#ffd780",
    padding: 10,
  },
  simpleDetails: {
    justifyContent: "space-between",
    marginTop: 5,
    marginBottom: 20,
    alignItems: "center",
  },
  cause: {
    marginVertical: 10,
  },
  price: {
    fontWeight: "bold",
  },
  user: {
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  headerDetails: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 120,
    borderBottomWidth: 1,
    borderColor: "#94938f56",
  },
  description: {
    marginVertical: 10,
  },
});
