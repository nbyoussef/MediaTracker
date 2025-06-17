import React from "react";
import { Text, View } from "react-native";

interface TagProps {
	text: string;
}

const Tag = ({ text }: TagProps) => {
	return (
		<View className="bg-secondary-500 px-2 py-1 rounded-md gap-x-1">
			<Text className="text-gray-600">{text}</Text>
		</View>
	);
};

export default Tag;
