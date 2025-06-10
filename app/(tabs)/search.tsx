import MovieCard from "@/components/movieCard";
import SearchBar from "@/components/searchBar";
import { Text } from "@/components/ui/text";
import { fetchMovies } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, View } from "react-native";
export default function Search() {
	const [searchQuery, setSearchQuery] = useState("");
	const {
		data: movies,
		loading: moviesLoading,
		error: moviesError,
		refetch: loadMovies,
		reset,
	} = useFetch(() => fetchMovies({ query: searchQuery }), false);

	useEffect(() => {
		const timeoutID = setTimeout(async () => {
			if (searchQuery.trim()) {
				await loadMovies();
			} else {
				reset();
			}
		}, 500);
		return () => clearTimeout(timeoutID);
	}, [searchQuery]);

	useEffect(() => {
		if (movies?.length > 0 && movies?.[0]) {
			updateSearchCount(searchQuery, movies[0]);
		}
	}, [movies]);

	return (
		<SafeAreaView className="flex-1">
			<FlatList
				data={movies}
				renderItem={({ item }) => <MovieCard {...item} />}
				keyExtractor={(item) => item.id}
				className="px-3"
				columnWrapperStyle={{
					justifyContent: "flex-start",
					gap: 20,
					paddingRight: 5,
					marginBottom: 10,
				}}
				numColumns={3}
				ListHeaderComponent={
					<>
						<View className="w-full flex-row justify-center items-center">
							<SearchBar
								value={searchQuery}
								placeholder="Search movies..."
								onChangeText={setSearchQuery}
							/>
						</View>
						{moviesLoading && (
							<ActivityIndicator size="large" className="my-3" />
						)}
						{moviesError && (
							<Text className="text-red-500 px-5 my-3">
								Error: {moviesError.message}
							</Text>
						)}
						{!moviesLoading &&
							!moviesError &&
							searchQuery.trim() &&
							movies?.length > 0 && (
								<Text className="text-lg font-bold">
									Search results for "<Text className="">{searchQuery}</Text>"
								</Text>
							)}
					</>
				}
				ListHeaderComponentClassName="bg-[#f2f2f2]"
				stickyHeaderIndices={[0]}
				ListEmptyComponent={
					!moviesLoading && !moviesError ? (
						<View>
							<Text className="text-center">
								{searchQuery.trim() ? "No movies found" : "Search for a movie"}
							</Text>
						</View>
					) : null
				}
			/>
		</SafeAreaView>
	);
}
