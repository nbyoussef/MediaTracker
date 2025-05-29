import { Button, ButtonIcon } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { AddIcon, CloseCircleIcon, SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import MovieBox from "@/components/ui/movieBox";
import { VStack } from "@/components/ui/vstack";
import { MovieType } from "@/types/Movie";
import React, { useState } from "react";
import { ScrollView, StatusBar } from "react-native";

const TMDB_AUTH_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YWFkNjNiMDE3YmFmNzM4YjkwZWMzMjA1MDFjMTg5YSIsIm5iZiI6MTc0ODE1MjYzNi43MTYsInN1YiI6IjY4MzJiMTNjMDhiNTkwN2NkODcyZjhhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MmbAuIZ--mbh0ySRXwL5zsSS4mtjcal9boGm6oinbJk";

const SEARCH_API_URL =
  "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1";

export default function Index() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [watchList, setWatchList] = useState<MovieType[]>([]);

  /**
   * Calls the TMDB API to search for movies matching the query
   * Updates the searchResults state with the first 5 results
   * Also updates visibility states for UI elements
   * @param query - The search string entered by the user
   */
  const searchFor = async (query: string) => {
    // Construct the API URL for searching movies
    const url = `${SEARCH_API_URL}}&query=${encodeURIComponent(query)}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: TMDB_AUTH_TOKEN,
      },
    };
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`Response status: ${response.status}`);
      const json = await response.json();
      const results = json.results.slice(0, 5);
      setSearchResults(results);
    } catch (error) {
      console.error(error instanceof Error ? error.message : "Unknown Error");
    }
  };

  /**
   * Clears the search input and results, makes the watchlist visible again
   */
  const clearSearch = () => {
    setSearchResults([]);
    setSearchValue("");
  };

  /**
   * Adds a movie to the watchlist and resets UI states related to search
   * @param movie - MovieType object to add to the watchlist
   */
  const addToWatchlist = (movie: MovieType) => {
    setWatchList([...watchList, movie]);
    setSearchValue("");
    setSearchResults([]);
    console.log("Item added");
  };

  const renderedSearchResults = searchResults.map((e: any, index) => (
    <MovieBox key={index} movie={e}>
      <Button
        size="md"
        className="my-auto ml-3"
        onPress={() => {
          addToWatchlist(e);
        }}
      >
        <ButtonIcon as={AddIcon} />
      </Button>
    </MovieBox>
  ));

  const renderedWatchlist = watchList.map((e: any, index) => (
    <MovieBox key={index} movie={e}>
      <Button
        size="md"
        className="my-auto ml-3 bg-red-600"
        onPress={() => {
          setWatchList(watchList.filter((movie) => movie.id !== e.id));
        }}
      >
        <ButtonIcon as={CloseCircleIcon} />
      </Button>
    </MovieBox>
  ));

  return (
    <ScrollView className="px-3">
      {/* Sets the status bar style */}
      <StatusBar barStyle="dark-content" />
      {/* Search input with clear button */}
      <FormControl>
        <Input variant="rounded" size="lg" className="mt-3">
          <InputSlot className="pl-3">
            <InputIcon as={SearchIcon} />
          </InputSlot>
          <InputField
            placeholder="Search"
            value={searchValue}
            onChangeText={setSearchValue}
            onSubmitEditing={(e) => searchFor(e.nativeEvent.text)}
          />
          {/* Show clear button when there is text to clear */}
          {searchResults.length != 0 && (
            <InputSlot onPress={clearSearch}>
              <InputIcon className="mr-3" as={CloseCircleIcon} />
            </InputSlot>
          )}
        </Input>
      </FormControl>
      {/* If no searchResults display watchlist */}
      <VStack className="py-5" space="md" reversed={false}>
        {searchResults.length == 0 ? renderedWatchlist : renderedSearchResults}
      </VStack>
    </ScrollView>
  );
}
