import { Button, ButtonIcon } from "@/components/ui/button";
import { CloseCircleIcon } from "@/components/ui/icon";
import MovieBox from "@/components/ui/movieBox";
import { VStack } from "@/components/ui/vstack";
import { MovieType } from "@/types/Movie";
import React, { useMemo, useState } from "react";
import { ScrollView, StatusBar } from "react-native";

export default function Index() {
  const [watchList, setWatchList] = useState<MovieType[]>([]);

  /**
   * Adds a movie to the watchlist and resets UI states related to search
   * @param movie - MovieType object to add to the watchlist
   */

  const renderedWatchlist = useMemo(
    () =>
      watchList.map((movie, index) => (
        <MovieBox key={`${movie.id}/${index}/watchList`} movie={movie}>
          <Button
            size="md"
            className="my-auto ml-3 bg-red-600"
            onPress={() => {
              setWatchList(watchList.filter((m) => m.id !== movie.id));
            }}
          >
            <ButtonIcon as={CloseCircleIcon} />
          </Button>
        </MovieBox>
      )),
    [watchList]
  );

  return (
    <ScrollView className="px-3">
      {/* Sets the status bar style */}
      <StatusBar barStyle="dark-content" />
      {/* If no searchResults display watchlist */}
      <VStack className="mt-3" space="md" reversed={false}>
        {renderedWatchlist}
      </VStack>
    </ScrollView>
  );
}
