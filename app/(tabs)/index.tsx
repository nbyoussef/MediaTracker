import { Text } from "@/components/ui/text";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, SafeAreaView, View } from "react-native";

export default function Index() {
	const router = useRouter();
	const {
		data: movies,
		loading: moviesLoading,
		error: moviesError,
	} = useFetch(() => fetchMovies({ query: "" }));

	return (
		<SafeAreaView>
			<View className="flex-grow h-full px-3">
				{moviesLoading ? (
					<ActivityIndicator size="large" className="mt-10 self-center" />
				) : moviesError ? (
					<Text>Error: {moviesError?.message}</Text>
				) : (
					<View className="flex-1">
						<Text className="m-auto text-2xl font-bold">Welcome</Text>
					</View>
				)}
			</View>
		</SafeAreaView>
	);
}
