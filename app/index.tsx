import { Button, ButtonIcon } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { AddIcon, CloseCircleIcon, SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import MovieBox from "@/components/ui/movieBox";
import { VStack } from "@/components/ui/vstack";
import { MovieType } from "@/types/Movie";
import { RequestOptions } from "@/types/RequestOptions";
import React, { useState } from "react";
import { ScrollView, StatusBar } from "react-native";

export default function Index() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [watchList, setWatchList] = useState<MovieType[]>([]);
  const [watchListVisible, setWatchListVisible] = useState(true);
  const [clearBtnVisible, setClearBtnVisible] = useState(false);
  const [searchResultsVisible, setSearchResultsVisible] = useState(false);

  /**
   * Helper function to fetch data from a given URL using fetch API
   * @param encodedURL - URL to fetch (should be URI-encoded)
   * @param options - Request options for fetch (method, headers, etc.)
   * @returns The parsed JSON response, or logs the error
   */
  async function getData(encodedURL: string, options: RequestOptions) {
    try {
      const response = await fetch(encodedURL, options);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const results = await response.json();
      return results;
    } catch (error) {
      let message = "Unknown Error";
      if (error instanceof Error) message = error.message;
      console.log(message);
    }
  }

  /**
   * Calls the TMDB API to search for movies matching the query
   * Updates the searchResults state with the first 5 results
   * Also updates visibility states for UI elements
   * @param query - The search string entered by the user
   */
  function searchFor(query: string) {
    // Construct the API URL for searching movies
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
    const encodedURL = encodeURI(url);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YWFkNjNiMDE3YmFmNzM4YjkwZWMzMjA1MDFjMTg5YSIsIm5iZiI6MTc0ODE1MjYzNi43MTYsInN1YiI6IjY4MzJiMTNjMDhiNTkwN2NkODcyZjhhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MmbAuIZ--mbh0ySRXwL5zsSS4mtjcal9boGm6oinbJk",
      },
    };

    // Fetch data and update search results
    getData(encodedURL, options).then((json) => {
      const results = json.results.slice(0, 5).map((e: any) => e);
      setSearchResults(results);
    });

    // Show clear button and search results, hide watchlist
    setClearBtnVisible(true);
    setSearchResultsVisible(true);
    setWatchListVisible(false);
  }

  /**
   * Clears the search input and results, makes the watchlist visible again
   */
  function clearSearch() {
    setSearchResults([]);
    setSearchValue("");
    setClearBtnVisible(false);
    setWatchListVisible(true);
  }

  /**
   * Adds a movie to the watchlist and resets UI states related to search
   * @param movie - MovieType object to add to the watchlist
   */
  function addToWatchlist(movie: MovieType) {
    setWatchList([...watchList, movie]);
    setWatchListVisible(true);
    setClearBtnVisible(false);
    setSearchValue("");
    setSearchResultsVisible(false);
    console.log("Item added");
  }

  /**
   * Removes a movie from the watchlist by filtering it out by ID
   * @param movie - MovieType object to remove from the watchlist
   */
  function removeFromWatchlist(movie: MovieType) {
    setWatchList(watchList.filter((e) => e.id !== movie.id));
  }

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
          {clearBtnVisible && (
            <InputSlot onPress={clearSearch}>
              <InputIcon className="mr-3" as={CloseCircleIcon} />
            </InputSlot>
          )}
        </Input>
      </FormControl>

      {/* Watchlist: Shown when watchListVisible is true */}
      {watchListVisible && (
        <VStack className="py-5" space="md" reversed={false}>
          {watchList.map((e: any, index) => (
            <MovieBox key={index} movie={e}>
              <Button
                size="md"
                className="my-auto ml-3 bg-red-600"
                onPress={() => {
                  removeFromWatchlist(e);
                }}
              >
                <ButtonIcon as={CloseCircleIcon} />
              </Button>
            </MovieBox>
          ))}
        </VStack>
      )}

      {/* Search Results: Shown when searchResultsVisible is true */}
      <VStack className="py-5" space="md" reversed={false}>
        {searchResultsVisible &&
          searchResults.map((e: any, index) => (
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
          ))}
      </VStack>
    </ScrollView>
  );
}
