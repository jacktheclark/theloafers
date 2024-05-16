import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from "../constants.js";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const IndividualComment = ({ spec, author, content, specColor, setSpecColor, voteCount, onUpvote, onDownvote }) => {
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);
  const [localVoteCount, setLocalVoteCount] = useState(0);
  const [hasReported, setReported] = useState(false);
  

  const colorScale = [
    { low: 0, high: 1, color: '#f00f63' }, //pink
    { low: 1, high: 2, color: '#f20d82' }, //pink/purple
    { low: 2, high: 3, color: '#b813ec' }, //purple/blue
    { low: 3, high: 4, color: '#551ee1' }, //bluer
    { low: 4, high: 5, color: '#2052df' }, //light blue
    { low: 5, high: 6, color: '#1cc8e3' }, //cyan
    { low: 6, high: 7, color: '#22dd95' }, //mint
    { low: 7, high: 8, color: '#e5f708' }, //yellow
    { low: 8, high: 9, color: '#ff9200' }, //orange
    { low: 9, high: 10, color: '#f94106' }, //red/orange
  ];

  const colorVec = [
    '#ff006c', //hotpink
    '#f00f63', //pink
    '#f20d82', //pink/purple
    '#b813ec', //purple/blue
    '#551ee1', //bluer
    '#2052df', //light blue
    '#1cc8e3', //cyan
    '#22dd95', //mint
    '#e5f708', //yellow
    '#ff9200', //orange
    '#f94106', //red/orange
  ];

  useEffect(() => {
  // Update the local vote count when the voteCount prop changes
    setLocalVoteCount(voteCount);
  }, [voteCount]);

  const pickColor = React.useMemo(() => { //weird case where using this works
    return colorVec[Math.round(spec)] //bc we need to repick the color each for each comment
  }, [spec, setSpecColor]);

  const handleUpvote = async () => {
    if (!hasUpvoted) {
      setHasUpvoted(true);
      setLocalVoteCount(prevCount => (hasDownvoted ? prevCount + 2 : prevCount + 1));
      if (hasDownvoted) {
        setHasDownvoted(false); // Undo downvote if it's active
        onDownvote();
      }
      onUpvote();
    } else {
      setHasUpvoted(false);
      setLocalVoteCount(prevCount => prevCount - 1);
      onDownvote(); // Undo upvote if it's active
    }
  };
  
  const handleDownvote = async () => {
    if (!hasDownvoted) {
      setHasDownvoted(true);
      setLocalVoteCount(prevCount => (hasUpvoted ? prevCount - 2 : prevCount - 1));
      if (hasUpvoted) {
        setHasUpvoted(false); // Undo upvote if it's active
        onUpvote();
      }
      onDownvote();
    } else {
      setHasDownvoted(false);
      setLocalVoteCount(prevCount => prevCount + 1);
      onUpvote(); // Undo downvote if it's active
    }
  };
  


    const handleReport = async () => {
      if (!hasReported) {
        setReported(true);
      } else {
        setReported(false);
      }
    };


  return (
    <View style={styles.bigContainer}>
      <View style={styles.leftSideContainer}>
            <View style={styles.commentContainer}>
              <View style={styles.topPart}>
                <Text style={[styles.author, {color: pickColor}]}>{author}</Text>
                <TouchableOpacity style={styles.reportButton} onPress={handleReport}>
                    <MaterialIcons name={hasReported ? "report" : "report-gmailerrorred"} size={20} 
                      color={hasReported ? pickColor : COLORS.gray}  />
                </TouchableOpacity>
              </View>
              
              <Text style={styles.content}>{content}</Text>
              
            </View>
      </View>
      
      
      <View style={styles.rightSideContainer}>
          <View style={styles.voteCountsContainer}>
            <Text style={[styles.voteCounts, {color: pickColor}]}>{localVoteCount}</Text>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={handleUpvote}>
              <AntDesign name="up" size={24} color={hasUpvoted ? pickColor : COLORS.lightaccent} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDownvote}>
              <AntDesign name="down" size={24} color={hasDownvoted ? pickColor : COLORS.lightaccent} />
            </TouchableOpacity>
          </View>
      </View>

      {/* <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.reportButton} onPress={handleReport}>
                  <MaterialIcons name={hasReported ? "report" : "report-gmailerrorred"} size={24} 
                    color={hasReported ? pickColor : COLORS.lightaccent}  />
          </TouchableOpacity>
      </View> */}
      
    </View>
  );
}

const styles = StyleSheet.create({
  bigContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.lightaccent,
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 10,
  },
  commentContainer: {
    // 
  },
  topPart: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSideContainer: {
    padding: 10,
    width: '70%',
  },
  reportButton: {
    marginBottom: 4,
  },
  iconContainer: {
    padding: 10,
  },
  voteCountsContainer : {
    padding: 10,
  },
  rightSideContainer: {
    flexDirection: 'row', // Horizontal row
    justifyContent: 'space-between', // Align children at the ends
    alignItems: 'center', // Align children vertically at the center
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 10,
  },
  bottomContainer: {
    
  },
  voteCounts: {
    fontFamily: FONTS.bold,
    marginBottom: 5,
    color: COLORS.lightaccent,
    fontSize: 20,
  },
  author: {
    fontFamily: FONTS.bold,
    marginBottom: 5,
    color: COLORS.lightaccent,
    fontSize: 16,
    marginRight: 6,
  },
  content: {
    color: COLORS.lightaccent,
    fontFamily: FONTS.body,
    fontSize: 14,
    lineHeight: '18',
    width: '100%',
  },
  reportText: {
    color: COLORS.gray,
    fontFamily: FONTS.body,
    fontSize: 14,
    lineHeight: '18',
  }
});

export default IndividualComment;
