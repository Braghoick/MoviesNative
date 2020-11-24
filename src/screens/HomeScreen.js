import React from 'react';
import { View, Text, Pressable, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

import constants from '../utils/constants';

import { fontsName } from '../utils/fonts';

import Movies from '../components/Movies';

const ActiveIndicator = () => {
	return (
		<View style={styles.indicatorContainer}>
			<View style={[styles.indicator]}></View>
			<View style={[styles.indicator, styles.indicatorMin]}></View>
		</View>
	);
};

export const HomeScreen = ({ navigation, route }) => {
	const [activeTab, setActiveTab] = React.useState('popular');

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>MOVIES</Text>
				<Feather name="search" size={18} color="black" />
			</View>

			<ScrollView style={styles.tabstop} horizontal={true}>
				<Pressable style={styles.tab} onPress={() => setActiveTab('popular')}>
					<Text
						style={[
							styles.tabText,
							{
								color:
									activeTab === 'popular'
										? constants.COLORS.TEXT_COLOR
										: constants.COLORS.TEXT_COLOR2,
							},
						]}
					>
						Now Popular
					</Text>
					{activeTab === 'popular' && <ActiveIndicator />}
				</Pressable>
				<Pressable style={styles.tab} onPress={() => setActiveTab('upcoming')}>
					<Text
						style={[
							styles.tabText,
							{
								color:
									activeTab === 'upcoming'
										? constants.COLORS.TEXT_COLOR
										: constants.COLORS.TEXT_COLOR2,
							},
						]}
					>
						The Upcoming
					</Text>
					{activeTab === 'upcoming' && <ActiveIndicator />}
				</Pressable>
			</ScrollView>

			{activeTab === 'popular' && <Movies type="popular" {...{ navigation }} />}
			{activeTab === 'upcoming' && <Movies type="upcoming" {...{ navigation }} />}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: constants.COLORS.LIGHT_GRAY2,
		marginTop: Platform.OS !== 'ios' ? 20 : 0,
	},
	titleContainer: {
		paddingHorizontal: 25,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 8,
		marginBottom: 8,
	},
	title: {
		fontFamily: fontsName.FANCY,
		fontSize: 24,
	},
	tabstop: {
		marginVertical: 8,
		marginLeft: 25,
	},
	tab: {
		marginRight: 25,
	},
	tabText: {
		fontSize: 14,
		fontFamily: fontsName.BOLD,
	},
	indicatorContainer: {
		flexDirection: 'row',
		marginVertical: 5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	indicator: {
		height: 3,
		width: 20,
		borderRadius: 10,
		backgroundColor: constants.COLORS.WARNING,
	},
	indicatorMin: {
		width: 5,
		marginLeft: 5,
	},
});
