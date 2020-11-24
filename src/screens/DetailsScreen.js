import React, { useEffect, useState } from "react";
import { View, Pressable, StyleSheet, ScrollView, Dimensions, Image } from "react-native";
import { DateTime } from 'luxon';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import axios from '../utils/axios';
import constants from '../utils/constants';
import Stars from '../components/Stars';
import CastAndCrew from '../components/CastAndCrew';

import * as Text from '../components/TextCustom';

const {width, height} = Dimensions.get('screen');
const imageWidth = 130;
const imageHeight = 200;

export const DetailsScreen = ({ navigation, route }) => {
  
  const { movie } = route.params; 
  
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  
  const date = DateTime.fromISO(movie.release_date).setLocale('es').toFormat('MMM, y');

  useEffect(() => {
    axios
    .get(`movie/${movie.id}/credits?api_key=${constants.API_KEY}&language=es-ES`)
    .then((res) => {
         setCast(res.data.cast);
         setCrew(res.data.crew);
    })
    .catch((err) => console.log(err));
  }, [setCast, setCrew]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: (props) => {
        return(
          <View style={styles.containerButtonIcon} >
            <MaterialCommunityIcons {...props} name="keyboard-backspace" size={24} color="#ffffff" />
          </View>
        )
      },
      headerRight: () => {
        return(
          <View style={styles.containerButtonIcon}>
            <MaterialCommunityIcons name="dots-horizontal" size={24} color="#ffffff" />
          </View>
        )
      },
    });
  });

  return (
    <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
      <View style={styles.imageContainer}>
        <Image 
          style={[StyleSheet.absoluteFill, styles.cover]}
          blurRadius={5}
          source={{ uri: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}` }} />
          <View style={styles.backdrop}></View>
      </View>
      <View style={styles.content}>
      <Image 
          resizeMode='cover'
          style={styles.poster}
          source={{uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}` }} />

        <View style={{ flex: 1, marginLeft: imageMargin }}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{movie.title}</Text>
            </View>
            <Text fontFamily="regular" style={styles.popularity}>{movie.popularity.toFixed(0)}</Text>
            <Text fontFamily="regular" style={styles.date}>{date}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
              <Text fontFamily="regular" style={styles.votes}>{movie.vote_average}</Text>
              <Stars realVotes={Math.floor(movie.vote_average / 2)} />
            </View>
        </View>
        <View style={styles.resume}>
           <Text fontFamily="bold" style={styles.titleOverview}>Resumen</Text>
           <Text fontFamily="regular" style={styles.paragraph}>{movie.overview}</Text>
        </View>
        <CastAndCrew navigation={navigation} cast={cast}/>
        <CastAndCrew navigation={navigation} crew={crew}/>
      </View>
      <View style={{height:150}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: constants.COLORS.LIGHT,
  },
  imageContainer:{
    position: 'relative',
    width,
    height: height / 3,
  },
  cover:{
    width: null,
    height: null,
  },
  backdrop:{
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: constants.COLORS.PRIMARY,
    opacity: 0.3,
    zIndex: 9,
  },
  content:{
    width,
    padding: 25,
    backgroundColor: constants.COLORS.LIGHT,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    top: -15,
    zIndex: 15,
    position: 'relative',
  },
  resume:{
    marginTop: 50,
  },
  titleContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  title:{
      color: constants.COLORS.TEXT_COLOR,
      fontWeight: 'bold',
      flexGrow: 1,
      flexWrap: 'wrap',
      marginLeft: 140,
      marginBottom: 5,
  },

  titleOverview:{
    color: constants.COLORS.TEXT_COLOR,
    fontWeight: 'bold',
    flexGrow: 1,
    flexWrap: 'wrap',
    marginBottom: 5,
},

  votes: {
      color: constants.COLORS.WARNING,
      fontWeight: 'bold',
      fontSize: 16,
      marginTop: 4,
      marginLeft: 140,
      marginRight: 4,
  },

  popularity: {
      color: constants.COLORS.PRIMARY,
      borderColor: constants.COLORS.PRIMARY,
      borderWidth: 1,
      padding: 2,
      width: 40,
      borderRadius: 5,
      textAlign: 'center', 
      marginLeft: 140,
      marginVertical: 8,
      fontWeight: '100',
      fontSize: 10,
  },
  date: {
      fontSize: 12,
      textTransform: 'capitalize',
      marginLeft: 140,
  },
  poster:{
    width: imageWidth,
    height: imageHeight,
    borderRadius: 16,
    position: 'absolute',
    bottom: 20,
    left: 20,
    top: -50,
  },
  paragraph:{
    marginTop: 10,
    fontSize: 14,
    fontWeight: '300',
    color: constants.COLORS.GRAY,
  },
  containerButtonIcon: {
    backgroundColor: constants.COLORS.PRIMARY2,
    borderRadius: 20,
    width: 36,
    height: 36,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',

  }
  
});
