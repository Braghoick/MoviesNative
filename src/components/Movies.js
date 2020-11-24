import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

import axios from '../utils/axios';
import constants from '../utils/constants';

import Movie from './Movie';

const Movies = ({ navigation, type }) => {
	const [movies, setMovies] = React.useState([]);
	const [loading, setLoading] = React.useState(true);

	useEffect(() => {
		axios
			.get(`movie/${type}?api_key=${constants.API_KEY}&language=es-ES`)
			.then((res) => {
				setMovies(res.data.results);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}, [setMovies]);

	return !loading ? (
		<FlatList
			style={styles.list}
			data={movies}
			renderItem={({ item }) => <Movie movie={item} navigation={navigation} />}
			keyExtractor={(item) => `${item.id}`}
			contentInset={{ bottom: 80, top: 0 }}
		/>
	) : (
		<View style={[styles.container, styles.horizontal]}>
			<ActivityIndicator size="large" color={constants.COLORS.WARNING} />
		</View>
	);
};

const styles = StyleSheet.create({
	list: {
		paddingHorizontal: 25,
	},
	container: {
		flex: 1,
		justifyContent: 'flex-start',
	},
});

export default Movies;
