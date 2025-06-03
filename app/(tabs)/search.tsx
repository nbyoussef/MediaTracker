import MovieBox from "@/components/movieBox";
import SearchBar from "@/components/search-bar";
import { Button, ButtonIcon } from "@/components/ui/button";
import { AddIcon, CloseCircleIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import watchlistReducer from "@/reducers/watchlistReducer";
import { fetchMovies } from "@/services/api";
import { MovieType } from "@/types/Movie";
import React, { useCallback, useMemo, useReducer, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar } from "react-native";

export default function Search() {
	const [searchValue, setSearchValue] = useState("");
	const [searchResults, setSearchResults] = useState<MovieType[]>([]);
	const [watchlist, dispatch] = useReducer(watchlistReducer, []);

	function handleAddMovie(movie: MovieType) {
		dispatch({
			type: "added",
			movie: movie,
		});
	}

	function handleDeleteMovie(id: number) {
		dispatch({
			type: "deleted",
			movieID: id,
		});
	}

	/**
	 * Calls the TMDB API to search for movies matching the query
	 * Updates the searchResults state with the first 5 results
	 * Also updates visibility states for UI elements
	 * @param query - The search string entered by the user
	 */
	const searchFor = async (query: string) => {
		const results = await fetchMovies({ query });
		const firstFiveResults = results.slice(0, 5).map((movie: MovieType) => ({
			id: movie.id,
			title: movie.title,
			poster_path: movie.poster_path,
			release_date: movie.release_date,
		}));
		setSearchResults(firstFiveResults);
	};

	/**
	 * Clears the search input and results, makes the watchlist visible again
	 */
	const clearSearch = useCallback(() => {
		setSearchResults([]);
		setSearchValue("");
	}, []);

	/**
	 * Adds a movie to the watchlist and resets UI states related to search
	 * @param movie - MovieType object to add to the watchlist
	 */
	const addToWatchlist = useCallback(
		(movie: MovieType) => {
			if (!watchlist.some((m) => m.id === movie.id)) {
				handleAddMovie(movie);
			}
			setSearchValue("");
			setSearchResults([]);
		},
		[watchlist]
	);

	const renderedSearchResults = useMemo(
		() =>
			searchResults.map((movie, index) => (
				<MovieBox key={`${movie.id}/${index}/search`} movie={movie}>
					<Button
						size="md"
						className="my-auto ml-3"
						onPress={() => addToWatchlist(movie)}
					>
						<ButtonIcon as={AddIcon} />
					</Button>
				</MovieBox>
			)),
		[searchResults]
	);

	const renderedWatchlist = useMemo(
		() =>
			watchlist.map((movie, index) => (
				<MovieBox key={`${movie.id}/${index}/watchList`} movie={movie}>
					<Button
						size="md"
						className="my-auto ml-3 bg-red-600"
						onPress={() => {
							handleDeleteMovie(movie.id);
						}}
					>
						<ButtonIcon as={CloseCircleIcon} />
					</Button>
				</MovieBox>
			)),
		[watchlist]
	);

	return (
		<SafeAreaView>
			<ScrollView contentContainerClassName="flex-grow h-full px-3">
				{/* Search input with clear button */}
				<SearchBar
					value={searchValue}
					placeholder="Search for a movie"
					onChangeText={setSearchValue}
					onSubmitEditing={(e) => searchFor(e.nativeEvent.text)}
					clearBtnVisible={searchResults.length != 0}
					onClear={clearSearch}
				/>
				{searchResults.length == 0 && watchlist.length == 0 && (
					<Text className="m-auto font-bold text-xl">Search to add movies</Text>
				)}
				{/* If no searchResults display watchlist */}
				<VStack space="md">
					{searchResults.length == 0
						? renderedWatchlist
						: renderedSearchResults}
				</VStack>
				{/* Sets the status bar style */}
				<StatusBar barStyle="dark-content" />
			</ScrollView>
		</SafeAreaView>
	);
}
