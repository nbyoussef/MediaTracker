import { Box } from "@/components/ui/box";
import { FormControl } from "@/components/ui/form-control";
import { SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import React, { useState } from "react";
import { StatusBar, View } from "react-native";

export default function Index() {
  const [item, setItem] = useState("");
  function searchFor(query: string) {
    console.log(`Searching for ${query}`);
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YWFkNjNiMDE3YmFmNzM4YjkwZWMzMjA1MDFjMTg5YSIsIm5iZiI6MTc0ODE1MjYzNi43MTYsInN1YiI6IjY4MzJiMTNjMDhiNTkwN2NkODcyZjhhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MmbAuIZ--mbh0ySRXwL5zsSS4mtjcal9boGm6oinbJk",
      },
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.error(err));
  }
  return (
    <View>
      <StatusBar barStyle="dark-content" />
      <FormControl>
        <Input variant="rounded" size="lg" className="mt-3 mx-3">
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
      <Box className="lex justify-center items-center mt-5 px-5">
        <VStack className="w-full" space="md" reversed={false}>
          <Box className="rounded-xl bg-stone-500 p-5">
            <Text className="text-typography-0">Movie Title</Text>
          </Box>
          <Box className="rounded-xl bg-stone-500 p-5">
            <Text className="text-typography-0">Movie Title</Text>
          </Box>
          <Box className="rounded-xl bg-stone-500 p-5">
            <Text className="text-typography-0">Movie Title</Text>
          </Box>
          <Box className="rounded-xl bg-stone-500 p-5">
            <Text className="text-typography-0">Movie Title</Text>
          </Box>
        </VStack>
      </Box>
    </View>
  );
}
