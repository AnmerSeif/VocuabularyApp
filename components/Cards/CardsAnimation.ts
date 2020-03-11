import { Dimensions, Animated } from "react-native";
import { getBGColor, getCardColor } from "../CardUtilities";

const SCREEN_WIDTH = Dimensions.get("screen").width;

export const NextCardRotationAnimation = position =>
  position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ["0deg", "2deg", "0deg"],
    extrapolate: "clamp"
  });

export const CardOpacityAnimation = position =>
  position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0.55, 1],
    extrapolate: "clamp"
  });

export const RotateAnimation = position =>
  position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ["-10deg", "0deg", "10deg"],
    extrapolate: "clamp"
  });

export const ScreenBGColor = (
  position,
  difficulity,
  nextDifficulity
): Animated.AnimatedInterpolation => {
  const currentColor = getBGColor(difficulity);
  const nextColor = getBGColor(nextDifficulity);

  const bgColor = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [nextColor, currentColor, nextColor],
    extrapolate: "clamp"
  });

  return bgColor;
};

export const CardBGColor = (
  position,
  difficulity
): Animated.AnimatedInterpolation => {
  const color = getCardColor(difficulity);

  const bgColor = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [color, "white", color],
    extrapolate: "clamp"
  });

  return bgColor;
};
