import React, { useMemo, useRef, useState, useEffect } from "react";
import {
  Text,
  View,
  Dimensions,
  PanResponder,
  Animated,
  TouchableOpacity
} from "react-native";
import {
  NextCardRotationAnimation,
  CardOpacityAnimation,
  RotateAnimation,
  ScreenBGColor,
  CardBGColor
} from "./CardsAnimation";

import styles from "./CardsStyle";
import { getCardColor } from "../CardUtilities";

const SCREEN_WIDTH = Dimensions.get("screen").width;
const SCREEN_HEIGHT = Dimensions.get("screen").height;

const list = [
  { word: "Durkdreven", difficulity: "hard" },
  { word: "Samt", difficulity: "easy" },
  { word: "Strimlende", difficulity: "medium" },
  { word: "asdasd", difficulity: "hard" },
  { word: "Samt", difficulity: "easy" },
  { word: "Strimlende", difficulity: "medium" },
  { word: "Durkdreven", difficulity: "hard" },
  { word: "Samt", difficulity: "easy" },
  { word: "Strimlende", difficulity: "medium" }
];

const Cards: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const position = useRef(new Animated.ValueXY());

  const nextCardRotation = NextCardRotationAnimation(position.current);
  const cardOpacity = CardOpacityAnimation(position.current);
  const rotate = RotateAnimation(position.current);
  const screenBGColor = ScreenBGColor(
    position.current,
    list[currentIndex].difficulity,
    list[currentIndex + 1].difficulity
  );
  const cardBGColor = CardBGColor(
    position.current,
    list[currentIndex + 1].difficulity
  );

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
        onPanResponderRelease: (evt, gestureState) => {
          if (Math.abs(gestureState.dx) > SCREEN_WIDTH / 2) {
            setCurrentIndex(currentIndex + 1);
            position.current.setValue({ x: 0, y: 0 });
          } else {
            Animated.spring(position.current, {
              toValue: { x: 0, y: 0 },
              friction: 4
            }).start();
          }
        }
      }),
    [currentIndex]
  );

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.bg, { backgroundColor: screenBGColor }]}
      ></Animated.View>
      <View style={styles.margin}></View>
      <View style={{ flex: 1 }}>
        {list
          .map((card, i) => {
            if (i < currentIndex) {
              return null;
            } else if (i === currentIndex) {
              return (
                <Animated.View
                  key={i}
                  {...panResponder.panHandlers}
                  style={[
                    {
                      transform: [
                        { rotate: rotate },
                        { perspective: SCREEN_WIDTH / 2 },
                        { translateX: position.current.x }
                      ]
                    },
                    styles.cardsContainer
                  ]}
                >
                  <View
                    style={[
                      styles.card,
                      { backgroundColor: getCardColor(card.difficulity) }
                    ]}
                  >
                    <Text style={[styles.text]}>{card.word}</Text>
                  </View>
                </Animated.View>
              );
            } else if (i === currentIndex + 1) {
              return (
                <Animated.View
                  key={i}
                  style={[
                    styles.cardsContainer,
                    {
                      opacity: cardOpacity,
                      transform: [{ rotate: nextCardRotation }]
                    }
                  ]}
                >
                  <Animated.View
                    style={[styles.card, { backgroundColor: cardBGColor }]}
                  >
                    <Text style={[styles.text]}>{card.word}</Text>
                  </Animated.View>
                </Animated.View>
              );
            } else {
              return (
                <Animated.View
                  key={i}
                  style={[
                    styles.cardsContainer,
                    { transform: [{ rotate: "3deg" }] }
                  ]}
                >
                  <Animated.View
                    style={[
                      styles.card,
                      { backgroundColor: "white" },
                      { elevation: 0 }
                    ]}
                  >
                    <Text style={[styles.text]}>{card.word}</Text>
                  </Animated.View>
                </Animated.View>
              );
            }
          })
          .reverse()}
      </View>
      <View style={styles.margin}>
        <TouchableOpacity onPress={() => {}} style={styles.buttonContainer}>
          <Text style={styles.button}>?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cards;
