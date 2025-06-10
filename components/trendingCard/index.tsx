import { MovieDocument } from "@/types/MovieDocument";
import { Link } from "expo-router";
import React from "react";

interface TrendingCardProps {
	movie: MovieDocument;
	index: number;
}
export default function trendingCard({
	movie: { id, title, poster_url },
	index,
}: TrendingCardProps) {
	return <Link href={`/movies/${id}`} asChild></Link>;
}
