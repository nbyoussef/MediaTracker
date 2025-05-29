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

  function searchFor(query: string) {
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

    getData(encodedURL, options).then((json) => {
      const results = json.results.slice(0, 5).map((e: any) => e);
      setSearchResults(results);
    });
    setClearBtnVisible(true);
    setSearchResultsVisible(true);
    setWatchListVisible(false);
  }
  function clearSearch() {
    setSearchResults([]);
    setSearchValue("");
    setClearBtnVisible(false);
    setWatchListVisible(true);
  }
  function addToWatchlist(movie: MovieType) {
    setWatchList([...watchList, movie]);
    setWatchListVisible(true);
    setClearBtnVisible(false);
    setSearchValue("");
    setSearchResultsVisible(false);
    console.log("Item added");
  }
  function removeFromWatchlist(movie: MovieType) {
    setWatchList(watchList.filter((e) => e.id !== movie.id));
  }

  return (
    <ScrollView className="px-3">
      <StatusBar barStyle="dark-content" />
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
          {clearBtnVisible && (
            <InputSlot onPress={clearSearch}>
              <InputIcon className="mr-3" as={CloseCircleIcon} />
            </InputSlot>
          )}
        </Input>
      </FormControl>
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
