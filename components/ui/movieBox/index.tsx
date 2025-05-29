import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { MovieType } from "@/types/Movie";
import React, { ReactNode } from "react";

interface MovieBoxProps {
  movie: MovieType;
  children?: ReactNode;
}

export default function MovieBox({ movie, children }: MovieBoxProps) {
  return (
    <Box className="rounded-xl bg-slate-600 py-2">
      <HStack className="flex" space="xs">
        <Image
          resizeMode="contain"
          size="xl"
          alt={movie.title}
          source={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        />
        <Text
          className="text-typography-0 font-bold flex-shrink my-auto"
          numberOfLines={3}
        >{`${movie.title} (${movie.release_date.slice(0, 4)})`}</Text>
        {children}
      </HStack>
    </Box>
  );
}
