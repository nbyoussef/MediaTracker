import { MovieDocument } from "@/types/MovieDocument";
import { Link } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Image } from "../ui/image";
import { Text } from "../ui/text";
interface TrendingCardProps {
	movie: MovieDocument;
	index: number;
}
export default function trendingCard({
	movie: { id, title, poster_url },
	index,
}: TrendingCardProps) {
	return (
		<Link href={`/movies/${id}`} asChild>
			<TouchableOpacity className="w-32 relative pl-5">
				<Image
					source={{ uri: poster_url }}
					resizeMode="cover"
					className="w-32 h-48 rounded-lg"
					alt={`Poster for ${title}`}
				/>
				<View className="absolute bottom-9 -left-3.5 px-2 py-1 rounded-full">
					<Text className="font-bold text-6xl">{index + 1}</Text>
					{/* <MaskedView
						maskElement={
							<Text className="font-bold text-6xl">{index + 1}</Text>
						}
					>
						<Image
							source={images.rankingGradient}
							className="size-14"
							resizeMode="cover"
						/>
					</MaskedView> */}
				</View>
				<Text className="text-sm font-bold mt-2" numberOfLines={2}>
					{title}
				</Text>
			</TouchableOpacity>
		</Link>
	);
}
