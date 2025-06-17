import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { Movie } from "@/types/Movie";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MovieDetails = () => {
	const { id } = useLocalSearchParams();
	const router = useRouter();

	const {
		data: movie,
		loading,
		error,
	} = useFetch<Movie>(() => fetchMovieDetails(id as string));

	if (loading) {
		return (
			<View className="flex-1 justify-center items-center">
				<ActivityIndicator size="large" />
			</View>
		);
	}

	if (error || !movie) {
		return (
			<View className="flex-1 justify-center items-center">
				<Text className="text-red-500">Error loading movie details</Text>
			</View>
		);
	}

	return (
		<SafeAreaView className="flex-1 bg-white">
			<ScrollView>
				<View className="relative">
					<Image
						source={{
							uri: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
						}}
						className="w-full h-64"
						resizeMode="cover"
					/>
					<View className="absolute top-4 left-4">
						<FontAwesome
							name="chevron-left"
							size={24}
							color="white"
							onPress={() => router.back()}
						/>
					</View>
				</View>

				<View className="p-4">
					<Text className="text-2xl font-bold mb-2">{movie.title}</Text>
					<Text className="text-gray-600 mb-4">
						{movie.release_date.split("-")[0]} • {movie.runtime}m
					</Text>

					<View className="flex-row items-center mb-4">
						<Text className="text-lg font-semibold mr-2">Rating:</Text>
						<FontAwesome name="star" size={12} color="#DAA520" />
						<Text className="ml-1">{movie.vote_average}/10</Text>
						<Text className="text-gray-600 ml-2">
							({movie.vote_count} votes)
						</Text>
					</View>

					<Text className="text-lg font-semibold mb-2">Overview</Text>
					<Text className="text-gray-700">{movie.overview}</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default MovieDetails;
