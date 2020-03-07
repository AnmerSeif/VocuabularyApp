import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import Cards from "./components/Cards";
import { loadAsync, FontSource } from "expo-font";

const NUM_FRAMES = 128;

import fonts from "./assets/fonts/";

const App: React.FC = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    loadAsync(fonts).then(() => {
      setFontLoaded(true);
    });
  }, []);

  return <View style={styles.app}>{fontLoaded && <Cards />}</View>;
};

const styles = StyleSheet.create({
  app: {
    flex: 1
  }
});

export default App;
