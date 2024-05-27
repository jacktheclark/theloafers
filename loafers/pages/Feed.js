import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { COLORS, FONTS } from "../constants.js";
import CommentsFeedNew from "../components/CommentsFeedNew.js";
import CommentsFeedHot from "../components/CommentsFeedHot.js";
import CommentsFeedSimilar from "../components/CommentsFeedSimilar.js";
import CommentsFeedDis from "../components/CommentsFeedDis.js";
import DiscussionTopic from "../components/DiscussionTopic.js";
import SliderComponent from "../components/SliderComponent.js";
import WriteComment from "../components/WriteComment.js";
import FilterButtons from "../components/FilterButtons.js";
import supabase from "../Supabase.js";

export default function Feed({ navigation, route }) {
  const { displayName } = route.params;
  const [hasCommented, showComments] = useState(false);
  const [spectrumValue, setSpectrumValue] = useState(5);
  const [avgSpectrum, setAvgSpectrum] = useState(null);
  const [specColor, setSpecColor] = useState(null);
  const [sortOption, setSortOption] = useState("New");

  const colorVec = [
    "#ff006c", //hotpink
    "#f00f63", //pink
    "#f20d82", //pink/purple
    "#b813ec", //purple/blue
    "#551ee1", //bluer
    "#2052df", //light blue
    "#1cc8e3", //cyan
    "#22dd95", //mint
    "#e5f708", //yellow
    "#ff9200", //orange
    "#f94106", //red/orange
  ];

  useEffect(() => {
    setSpecColor(colorVec[Math.round(spectrumValue)]);
  }, [spectrumValue]); // re-run if spectrumvalue changes


  return (
<<<<<<< Updated upstream
    <>
      {hasCommented ? (
        <View style={styles.container}>
          <ImageBackground
            source={require("../assets/backgroundImage.jpeg")}
            style={styles.header}
          ></ImageBackground>
          <View style={styles.bodyContainer}>
            {/* <Text style={styles.testText}>feed screen</Text> */}
            <DiscussionTopic
              question={`What do you think of the new Stanford president hiring, ${displayName}?`}
            />
            <SliderComponent
              spectrumValue={spectrumValue}
              setSpectrumValue={setSpectrumValue}
              specColor={specColor}
              setSpecColor={setSpecColor}
              hasCommented={hasCommented}
            />
            <View style={styles.lilContainer}>
              <FilterButtons
                specColor={specColor}
                sortOption={sortOption}
                setSortOption={setSortOption}
              />
              {sortOption === "New" ? (
                <CommentsFeedNew
                  specColor={specColor}
                  setSpecColor={setSpecColor}
                />
              ) : sortOption === "Hot" ? (
                <CommentsFeedHot
                  specColor={specColor}
                  setSpecColor={setSpecColor}
                />
              ) : sortOption === "Similar" ? (
                <CommentsFeedSimilar
                  specValue={spectrumValue}
                  specColor={specColor}
                  setSpecColor={setSpecColor}
                />
              ) : (
                <CommentsFeedDis
                  specValue={spectrumValue}
                  specColor={specColor}
                  setSpecColor={setSpecColor}
                />
              )}
            </View>
          </View>
        </View>
      ) : (
        <TouchableWithoutFeedback
          onPress={() => Keyboard.dismiss()}
          style={styles.container}
        >
          <View style={styles.container}>
            <ImageBackground
              source={require("../assets/backgroundImage.jpeg")}
              style={styles.header}
            ></ImageBackground>
            <View style={styles.bodyContainer}>
              {/* <Text style={styles.testText}>feed screen</Text> */}
              <DiscussionTopic
                question={`What do you think of the new Stanford president hiring, ${displayName}?`}
              />
              <SliderComponent
                spectrumValue={spectrumValue}
                setSpectrumValue={setSpectrumValue}
                specColor={specColor}
                setSpecColor={setSpecColor}
                hasCommented={hasCommented}
              />

              <WriteComment
                displayName={displayName}
                spectrumValue={spectrumValue}
                setSpectrumValue={setSpectrumValue}
                setAvgSpectrum={setAvgSpectrum}
                hasCommented={hasCommented}
                showComments={showComments}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </>
=======
    <View style={styles.container}>
      <ImageBackground source={require('../assets/backgroundImage.jpeg')} style={styles.header}>

        {/* <View style={styles.bodyContainer}>
          <DiscussionTopic question={`What do you think of the new Stanford president hiring, ${displayName}?`} />
          <SliderComponent spectrumValue={spectrumValue} setSpectrumValue={setSpectrumValue}
            specColor={specColor} setSpecColor={setSpecColor}/>
     */}
       
      
          {hasCommented ? (
            <View style={styles.bodyContainer}>
              <DiscussionTopic question={`What do you think of the new Stanford president hiring, ${displayName}?`} />
              {/* <View style={styles.sliderContainer}> */}
                <SliderComponent spectrumValue={spectrumValue} setSpectrumValue={setSpectrumValue}
                  specColor={specColor} setSpecColor={setSpecColor}/>
              {/* </View> */}
              <View style={styles.feedContainer}>
                <View style={styles.buttonsContainer}>
                  <FilterButtons specColor={specColor} 
                    sortOption={sortOption}
                    setSortOption={setSortOption}/>
                </View>
                <View style={styles.commentsContainer}>
                  {sortOption === 'New' ? (
                      <CommentsFeedNew specColor={specColor} setSpecColor={setSpecColor} />
                  ) : sortOption === 'Hot' ? (
                      <CommentsFeedHot specColor={specColor} setSpecColor={setSpecColor} />
                  ) : sortOption === 'Similar' ? (
                      <CommentsFeedSimilar specValue={spectrumValue} specColor={specColor} setSpecColor={setSpecColor}/>
                  ) : (
                      <CommentsFeedDis specValue={spectrumValue} specColor={specColor} setSpecColor={setSpecColor}/>
                  )}
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.bodyContainer}>
              <DiscussionTopic question={`What do you think of the new Stanford president hiring, ${displayName}?`} />
              {/* <View style={styles.sliderContainer}> */}
                <SliderComponent spectrumValue={spectrumValue} setSpectrumValue={setSpectrumValue}
                  specColor={specColor} setSpecColor={setSpecColor}/>
              {/* </View> */}
                <WriteComment 
                displayName = {displayName}
                spectrumValue={spectrumValue} 
                setSpectrumValue={setSpectrumValue}
                hasCommented={hasCommented} 
                showComments={showComments} />
            </View>
          )}
        {/* </View> */}
      </ImageBackground>
    </View>
>>>>>>> Stashed changes
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.background_dark,
  },
  header: {
    // height: '12%',
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    height: "25%",
    // borderBottomEndRadius: -20,
  },
  bodyContainer: {
    // flex: 1,
<<<<<<< Updated upstream
    position: "absolute",
    top: "12%",
    backgroundColor: COLORS.dark,
=======
    position: 'absolute',
    top: '12%',
    backgroundColor: COLORS.background_dark,
>>>>>>> Stashed changes
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: "100%",
    height: "90%",
    padding: "5%",
    // textAlign: 'left',
  },
  sliderContainer: {
    flex: 1,
  },
  feedContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: COLORS.background_dark,
  },
  buttonsContainer: {
    // flex: 1,
    backgroundColor: COLORS.white,
  },
  commentsContainer: {
    flex: 1,
    backgroundColor: 'blue',
  },
  testText: {
    marginTop: 100,
    marginBottom: 50,
    color: "white",
    fontSize: 24,
    fontFamily: FONTS.body,
    color: COLORS.lightaccent,
    textAlign: "left",
  },
});
