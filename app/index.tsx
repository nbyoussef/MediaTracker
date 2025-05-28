import { Box } from "@/components/ui/box";
import { Button, ButtonIcon } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { HStack } from "@/components/ui/hstack";
import { AddIcon, CloseCircleIcon, SearchIcon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import React, { useState } from "react";
import { ScrollView, StatusBar } from "react-native";

export default function Index() {
  const [searchValue, setSearchValue] = useState("");
  const [movieTitles, setMovieTitles] = useState([]);
  const [watchList, setWatchList] = useState<object[]>([]);
  const [watchListVisible, setWatchListVisible] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [searchResultsVisible, setSearchResultsVisible] = useState(false);

  //API call function
  async function getData(encodedURL: string, options: object) {
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
      setMovieTitles(results);
    });
    setIsVisible(true);
    setSearchResultsVisible(true);
    setWatchListVisible(false);
  }
  function clearSearch() {
    setMovieTitles([]);
    setSearchValue("");
    setIsVisible(false);
    setWatchListVisible(true);
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
          {isVisible && (
            <InputSlot onPress={clearSearch}>
              <InputIcon className="mr-3" as={CloseCircleIcon} />
            </InputSlot>
          )}
        </Input>
      </FormControl>
      {watchListVisible && (
        <VStack className="py-5" space="md" reversed={false}>
          {watchList.map((e: any, index) => (
            <Box key={index} className="rounded-xl bg-slate-600 py-2">
              <HStack className="flex" space="xs">
                <Image
                  resizeMode="contain"
                  size="xl"
                  alt={e.title}
                  source={`https://image.tmdb.org/t/p/original${e.poster_path}`}
                />
                <Text
                  className="text-typography-0 font-bold flex-shrink my-auto"
                  numberOfLines={3}
                >{`${e.title} (${e.release_date.slice(0, 4)})`}</Text>
              </HStack>
            </Box>
          ))}
        </VStack>
      )}
      <VStack className="py-5" space="md" reversed={false}>
        {searchResultsVisible &&
          movieTitles.map((e: any, index) => (
            <Box key={index} className="rounded-xl bg-slate-600 py-2">
              <HStack className="flex" space="xs">
                <Image
                  resizeMode="contain"
                  size="xl"
                  alt={e.title}
                  source={`https://image.tmdb.org/t/p/original${e.poster_path}`}
                />
                <Text
                  className="text-typography-0 font-bold flex-shrink my-auto"
                  numberOfLines={3}
                >{`${e.title} (${e.release_date.slice(0, 4)})`}</Text>
                <Button
                  size="md"
                  className="my-auto ml-3"
                  onPress={() => {
                    setWatchList([...watchList, e]);
                    setWatchListVisible(true);
                    setIsVisible(false);
                    setSearchValue("");
                    setSearchResultsVisible(false);
                    console.log("Item added");
                  }}
                >
                  <ButtonIcon as={AddIcon} />
                </Button>
              </HStack>
            </Box>
          ))}
      </VStack>
    </ScrollView>
  );
}
