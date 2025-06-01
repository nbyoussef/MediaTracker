import { Button, ButtonIcon } from "@/components/ui/button";
import { CloseCircleIcon } from "@/components/ui/icon";
import MovieBox from "@/components/ui/movieBox";
import { VStack } from "@/components/ui/vstack";
import { MovieType } from "@/types/Movie";
import { StatusBar } from "expo-status-bar";
import React, { useMemo, useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [watchList, setWatchList] = useState<MovieType[]>([]);

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
    [watchList],
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView className="px-3">
        <VStack className="mt-3" space="md" reversed={false}>
          {renderedWatchlist}
        </VStack>
        <StatusBar style="dark" />
      </ScrollView>
    </SafeAreaView>
  );
}
