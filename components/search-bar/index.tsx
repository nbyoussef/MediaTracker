import { FormControl } from "@/components/ui/form-control";
import { CloseCircleIcon, SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import React from "react";
import {
	NativeSyntheticEvent,
	TextInputSubmitEditingEventData,
} from "react-native";

interface SearchBarProps {
	value?: string;
	onChangeText?: (text: string) => void;
	onSubmitEditing?: (
		event: NativeSyntheticEvent<TextInputSubmitEditingEventData>
	) => void;
	clearBtnVisible?: boolean;
	onClear?: () => void;
	onPress?: () => void;
	placeholder?: string;
}

export default function SearchBar({
	value,
	onChangeText,
	onSubmitEditing,
	onClear,
	onPress,
	clearBtnVisible,
	placeholder,
}: SearchBarProps) {
	return (
		<FormControl className="my-3 w-full">
			<Input variant="rounded" size="lg">
				<InputSlot className="pl-3">
					<InputIcon as={SearchIcon} />
				</InputSlot>
				<InputField
					autoFocus={false}
					placeholder={placeholder}
					value={value}
					onChangeText={onChangeText}
					onPress={onPress}
					onSubmitEditing={onSubmitEditing}
				/>
				{clearBtnVisible && (
					<InputSlot onPress={onClear}>
						<InputIcon className="mr-3" as={CloseCircleIcon} />
					</InputSlot>
				)}
			</Input>
		</FormControl>
	);
}
