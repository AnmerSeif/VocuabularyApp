import React, { useMemo, useRef, useState } from "react";
import styled from "styled-components/native";
import {
  View,
  PanResponder,
  Dimensions,
  Animated,
  ImageProps
} from "react-native";

import test from "../assets/imgs/test.jpeg";
import test2 from "../assets/imgs/test2.jpeg";
import test3 from "../assets/imgs/test3.jpeg";
import test4 from "../assets/imgs/test4.jpeg";

const imgs = [test, test2, test3, test4];

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const Container = styled.View`
  flex: 1;
`;

const Margin = styled.View`
  height: 60px;
`;

const Content = styled.View`
  flex: 1;
`;

interface AnimatedViewProps {
  x: number;
  y: number;
}

const AnimatedView = styled.View`
  width: ${SCREEN_WIDTH}px;
  height: ${SCREEN_HEIGHT - 120}px;
  padding: 10px;
  position: absolute;
  transform: ${(props: AnimatedViewProps) =>
    `translateX(${props.x}px) translateY(${props.y}px)`};
`;

const CardImage = styled.Image`
  flex: 1;
  height: null;
  width: null;
  resize-mode: cover;
  border-radius: 20px;
`;

const Cards: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderMove: (evt, gestureState) => {
          setX(gestureState.dx);
          setY(gestureState.dy);
        },
        onPanResponderRelease: (evt, gestureState) => {}
      }),
    []
  );

  return (
    <Container>
      <Margin />
      <Content>
        {imgs
          .map((img, i) =>
            currentIndex == i ? (
              <AnimatedView
                key={i}
                as={Animated.View}
                x={x}
                y={y}
                {...panResponder.panHandlers}
              >
                <CardImage source={img} />
              </AnimatedView>
            ) : (
              <AnimatedView
                key={i}
                as={Animated.View}
                x={0}
                y={0}
                {...panResponder.panHandlers}
              >
                <CardImage source={img} />
              </AnimatedView>
            )
          )
          .reverse()}
      </Content>
      <Margin />
    </Container>
  );
};

export default Cards;
