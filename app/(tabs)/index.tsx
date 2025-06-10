import MovieCard from "@/components/movieCard";
import SearchBar from "@/components/searchBar";
import TrendingCard from "@/components/trendingCard";
import { Text } from "@/components/ui/text";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import React from "react";
import {
	ActivityIndicator,
	FlatList,
	SafeAreaView,
	ScrollView,
	View,
} from "react-native";

export default function Index() {
	const router = useRouter();

	const {
		data: trendingMovies,
		loading: trendingLoading,
		error: trendingError,
	} = useFetch(getTrendingMovies);

	const {
		data: movies,
		loading: moviesLoading,
		error: moviesError,
	} = useFetch(() => fetchMovies({ query: "" }));

	return (
		<SafeAreaView>
			<ScrollView className="flex-grow h-full px-3">
				{moviesLoading || trendingLoading ? (
					<ActivityIndicator size="large" className="mt-10 self-center" />
				) : moviesError || trendingError ? (
					<Text>Error: {moviesError?.message || trendingError?.message}</Text>
				) : (
					<View className="flex-1">
						<SearchBar
							onPress={() => router.push("/search")}
							placeholder="Search for a movie"
						/>
						{trendingMovies && (
							<View className="mt-10">
								<Text className="text-lg font-bold mb-3">Trending Movies</Text>
								<FlatList
									horizontal
									showsHorizontalScrollIndicator={false}
									ItemSeparatorComponent={() => <View className="w-4" />}
									data={trendingMovies}
									renderItem={({ item, index }) => (
										<TrendingCard movie={item} index={index} />
									)}
									scrollEnabled={false}
									keyExtractor={(item, index) =>
										item.id.toString() + index.toString()
									}
								/>
							</View>
						)}
						<>
							<Text className="text-lg font-bold">Latest Movies</Text>
							<FlatList
								data={movies}
								renderItem={({ item }) => <MovieCard {...item} />}
								keyExtractor={(item) => item.id}
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
					</View>
				)}
			</ScrollView>
		</SafeAreaView>
	);
}
