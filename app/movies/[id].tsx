import Tag from "@/components/ui/tag";
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
	interface MovieInfoProps {
		label: string;
		value: string;
	}
	const MovieInfo = ({ label, value }: MovieInfoProps) => {
		return (
			<View className="flex-col items-start justify-center mt-4">
				<Text className="text-lg font-semibold mb-2">{label}</Text>
				<Text className="text-gray-700">{value || "N/A"}</Text>
			</View>
		);
	};

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
					<Text className="text-gray-600 mb-2">
						{movie.release_date.split("-")[0]} • {movie.runtime}m
					</Text>

					<View className="flex-row items-center">
						<Text className="text-lg font-semibold mr-2">Rating:</Text>
						<FontAwesome name="star" size={12} color="#DAA520" />
						<Text className="ml-1">{movie.vote_average}/10</Text>
						<Text className="text-gray-600 ml-2">
							({movie.vote_count} votes)
						</Text>
					</View>

					<MovieInfo label="Overview:" value={movie.overview} />

					<Text className="text-lg font-semibold mb-2 mt-4">Genres:</Text>
					<View className="flex-row flex-wrap gap-2">
						{movie.genres.map((genre) => (
							<Tag key={genre.id} text={genre.name} />
						))}
					</View>

					<View className="flex-row justify-between w-1/2 gap-x-4">
						<MovieInfo
							label="Budget:"
							value={`$${(movie.budget / 1000000).toFixed(2)} million`}
						/>
						<MovieInfo
							label="Revenue:"
							value={`$${(movie.revenue / 1000000).toFixed(2)} million`}
						/>
					</View>

					<Text className="text-lg font-semibold mb-2 mt-4">
						Production Companies:
					</Text>
					<View className="flex-row flex-wrap gap-2">
						{movie.production_companies.map((company) => (
							<Tag key={company.id} text={company.name} />
						))}
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default MovieDetails;
