import MovieCard from "@/components/movieCard";
import SearchBar from "@/components/search-bar";
import { Text } from "@/components/ui/text";
import { fetchMovies } from "@/services/api";
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
		data: movies,
		loading: moviesLoading,
		error: moviesError,
	} = useFetch(() => fetchMovies({ query: "" }));

	return (
		<SafeAreaView>
			<ScrollView className="flex-grow h-full px-3">
				{moviesLoading ? (
					<ActivityIndicator size="large" className="mt-10 self-center" />
				) : moviesError ? (
					<Text>Error: {moviesError?.message}</Text>
				) : (
					<View className="flex-1">
						<SearchBar
							onPress={() => router.push("/search")}
							placeholder="Search for a movie"
						/>
						{/* <Text className="m-auto text-2xl font-bold">Welcome</Text> */}
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
