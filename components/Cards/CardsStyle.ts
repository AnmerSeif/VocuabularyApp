import { Dimensions, StyleSheet } from "react-native";

const SCREEN_WIDTH = Dimensions.get("screen").width;
const SCREEN_HEIGHT = Dimensions.get("screen").height;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardsContainer: {
    position: "absolute",
    height: SCREEN_HEIGHT - 250,
    width: SCREEN_WIDTH,
    padding: 40
  },
  cardsContainerNotActive: {
    opacity: 0.55
  },
  card: {
    flex: 1,
    borderColor: "#d6d7da",
    borderRadius: 20,
    paddingTop: "40%",
    paddingLeft: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    elevation: 0,
    paddingLeft: 0,
    paddingTop: 0
  },
  text: {
    elevation: 1,
    fontWeight: "900",
    fontSize: 33,
    fontFamily: "OpenSansExtraBold",
    color: "white",
    letterSpacing: -2
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 30,
    color: "white",
    borderColor: "white",
    width: 50,
    borderWidth: 3,
    borderRadius: 1000,
    textAlign: "center",
    textAlignVertical: "center"
  },
  bg: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#E74C3C",
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH
  },
  margin: {
    height: 125
  }
});

export default styles;
