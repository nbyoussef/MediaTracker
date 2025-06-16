import MovieCard from "@/components/movieCard";
import SearchBar from "@/components/searchBar";
import TrendingCard from "@/components/trendingCard";
import { Text } from "@/components/ui/text";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { Movie } from "@/types/Movie";
import { MovieDocument } from "@/types/MovieDocument";
import { useRouter } from "expo-router";
import React from "react";
import {
	ActivityIndicator,
	FlatList,
	SafeAreaView,
	ScrollView,
	View,
} from "react-native";

const LoadingState = () => (
	<ActivityIndicator size="large" className="mt-10 self-center" />
);

const ErrorState = ({ error }: { error: Error | null }) => (
	<Text>Error: {error?.message}</Text>
);

const TrendingMovies = ({ movies }: { movies: MovieDocument[] }) => (
	<View>
		<Text className="text-lg font-bold mb-3">Trending Movies</Text>
		<FlatList
			horizontal
			showsHorizontalScrollIndicator={false}
			ItemSeparatorComponent={() => <View className="w-4" />}
			data={movies}
			renderItem={({ item, index }) => (
				<TrendingCard movie={item} index={index} />
			)}
			keyExtractor={(item, index) => item.id.toString() + index.toString()}
		/>
	</View>
);

const LatestMovies = ({ movies }: { movies: Movie[] }) => (
	<>
		<Text className="text-lg font-bold">Latest Movies</Text>
		<FlatList
			data={movies}
			renderItem={({ item }) => <MovieCard {...item} />}
			keyExtractor={(item) => item.id.toString()}
			columnWrapperStyle={{
				justifyContent: "flex-start",
				gap: 20,
				paddingRight: 5,
				marginBottom: 10,
			}}
			numColumns={3}
			scrollEnabled={false}
		/>
	</>
);

export default function Index() {
	const router = useRouter();

	const {
		data: trendingMovies,
		loading: trendingLoading,
		error: trendingError,
	} = useFetch<MovieDocument[]>(getTrendingMovies);

	const {
		data: movies,
		loading: moviesLoading,
		error: moviesError,
	} = useFetch<Movie[]>(() => fetchMovies({ query: "" }));

	if (moviesLoading || trendingLoading) {
		return <LoadingState />;
	}

	if (moviesError || trendingError) {
		return <ErrorState error={moviesError || trendingError} />;
	}

	return (
		<SafeAreaView>
			<ScrollView className="flex-grow h-full px-3">
				<View className="flex-1">
					<SearchBar
						onPress={() => router.push("/search")}
						placeholder="Search for a movie"
					/>
					{trendingMovies && <TrendingMovies movies={trendingMovies} />}
					{movies && <LatestMovies movies={movies} />}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
