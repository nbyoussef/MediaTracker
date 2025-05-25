import { Box } from "@/components/ui/box";
import { FormControl } from "@/components/ui/form-control";
import { HStack } from "@/components/ui/hstack";
import { SearchIcon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import React, { useState } from "react";
import { ScrollView, StatusBar } from "react-native";

export default function Index() {
  const [item, setItem] = useState("");
  const [movieTitles, setMovieTitles] = useState([]);
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
    async function getData() {
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
    getData().then((json) => {
      const results = json.results.slice(0, 5).map((e: any) => e);
      setMovieTitles(results);
    });
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
            value={item}
            onChangeText={(value) => setItem(value)}
            onSubmitEditing={() => searchFor(item)}
          />
        </Input>
      </FormControl>
      <VStack className="py-5" space="md" reversed={false}>
        {movieTitles.map((e: any, index) => (
          <Box key={index} className="rounded-xl bg-slate-600 py-2">
            <HStack className="" space="xs">
              <Image
                resizeMode="contain"
                size="xl"
                alt={e.title}
                source={`https://image.tmdb.org/t/p/original${e.poster_path}`}
              />
              <Text
                className="text-typography-0 font-bold flex-shrink"
                numberOfLines={3}
              >{`${e.title} (${e.release_date.slice(0, 4)})`}</Text>
            </HStack>
          </Box>
        ))}
      </VStack>
    </ScrollView>
  );
}
