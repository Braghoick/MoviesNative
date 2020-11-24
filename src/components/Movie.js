import React from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import { DateTime } from 'luxon';

import constants from '../utils/constants';

import Text from '../components/TextCustom';

//imagenes: https://image.tmdb.org/t/p/original/elZ6JCzSEvFOq4gNjNeZsnRFsvj.jpg
//fondo: https://image.tmdb.org/t/p/original//lA5fOBqTOQBQ1s9lEYYPmNXoYLi.jpg

const Luxon = DateTime.local().setLocale('es');

     const imageWidth = 99;
     const imageMargin = imageWidth + 20;
     const imageHeight = 133;
     const cardTop = imageHeight / 2 - 10;

const Movie = ({ movie, navigation }) => {

     const { title, vote_average, poster_path, popularity, release_date} = movie;

     const date = DateTime.fromISO(release_date).setLocale('es').toFormat('MMM, y');

     const loadMovie = () => {
          navigation.navigate(constants.SCREEN.DETAILS, { movie });
     };

     return (
          <Pressable style={styles.card} onPress={loadMovie}>
               <Image 
               resizeMode='cover'
                    style={styles.poster}
                    source={{uri: `https://image.tmdb.org/t/p/original/${poster_path}`,
                    }} 
               />
               <View style={{ flex: 1, marginLeft: imageMargin}}>
                    <View style={styles.titleContainer}>
                         <Text fontFamily="bold" numberOfLines={1} style={styles.title}>{title}</Text>
                         <Text fontFamily="bold" style={styles.votes}>{vote_average}</Text>
                    </View>
                    <Text fontFamily="regular" style={styles.popularity}>{popularity.toFixed(0)}</Text>
                    <Text fontFamily="regular" style={styles.date}>{date}</Text>
               </View>
          </Pressable>
     );
};

const styles = StyleSheet.create({
     card:{
          backgroundColor: constants.COLORS.LIGHT,
          marginTop: cardTop,
          paddingTop: 25,
          paddingHorizontal: 20,
          paddingBottom: 20,
          borderRadius: 20,
          flexDirection: 'row',
          alignItems: 'flex-end',
          position: 'relative',
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
          marginLeft: 110,
          marginBottom: 5,
     },

     votes: {
          color: constants.COLORS.WARNING,
          fontWeight: '100',
          fontSize: 16,
     },

     popularity: {
          color: constants.COLORS.PRIMARY,
          borderColor: constants.COLORS.PRIMARY,
          borderWidth: 1,
          padding: 2,
          width: 40,
          borderRadius: 5,
          textAlign: 'center', 
          marginLeft: 110,
          marginVertical: 8,
          fontWeight: '100',
          fontSize: 10,
     },
     date: {
          fontSize: 12,
          textTransform: 'capitalize',
          marginLeft: 110,
     },
     poster:{
          width: imageWidth,
          height: imageHeight,
          borderRadius: 16,
          position: 'absolute',
          bottom: 20,
          left: 20,
     },
});

export default Movie;
