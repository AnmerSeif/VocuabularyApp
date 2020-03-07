import React, { useMemo, useRef, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  PanResponder,
  Animated,
  Button
} from "react-native";

import test from "../assets/imgs/test.jpeg";
import test2 from "../assets/imgs/test2.jpeg";
import test3 from "../assets/imgs/test3.jpeg";
import test4 from "../assets/imgs/test4.jpeg";

const SCREEN_WIDTH = Dimensions.get("screen").width;
const SCREEN_HEIGHT = Dimensions.get("screen").height;

const imgs = [test, test2, test3, test4];

const Cards: React.FC = () => {
  const position = useRef(new Animated.ValueXY());

  const bgOpacity = position.current.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [0, 1, 0],
    extrapolate: "clamp"
  });

  const rotate = position.current.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ["-10deg", "0deg", "10deg"],
    extrapolate: "clamp"
  });

  const rotateText = position.current.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ["-45deg", "0deg", "45deg"],
    extrapolate: "clamp"
  });

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        // Ask to be the responder:
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderMove: (evt, gestureState) => {
          position.current.setValue({
            x: gestureState.dx,
            y: gestureState.dy
          });
        },
        onPanResponderRelease: (evt, gestureState) => {}
      }),
    []
  );

  return (
    <View style={styles.container}>
      <Animated.View
        style={[{ opacity: bgOpacity }, styles.bgTopHalf]}
      ></Animated.View>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          {
            transform: [
              { rotate: rotate },
              { perspective: SCREEN_WIDTH / 2 },
              { translateX: position.current.x }
            ]
          },
          styles.card
        ]}
      >
        <Animated.Text style={[styles.text]}>Durkdreven</Animated.Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 150,
    paddingBottom: 150,
    alignItems: "center"
  },
  card: {
    flex: 1,
    backgroundColor: "#E27368",
    alignItems: "center",
    width: SCREEN_WIDTH - 80,
    borderColor: "#d6d7da",
    borderRadius: 10,
    shadowColor: "#000",
    paddingTop: 40,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  text: {
    elevation: 1,
    fontWeight: "900",
    fontSize: 25,
    fontFamily: "OpenSansExtraBold",
    textTransform: "uppercase",
    color: "white"
  },
  button: {
    position: "absolute",
    bottom: 40,
    left: SCREEN_WIDTH / 2
  },
  bgTopHalf: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#E74C3C",
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH
  }
});

export default Cards;
