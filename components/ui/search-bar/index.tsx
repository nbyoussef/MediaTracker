import React from "react";
import {
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from "react-native";
import { FormControl } from "../form-control";
import { CloseCircleIcon, SearchIcon } from "../icon";
import { Input, InputField, InputIcon, InputSlot } from "../input";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmitEditing: (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
  clearBtnVisible: boolean;
  onClear: () => void;
}

export default function SearchBar({
  value,
  onChangeText,
  onSubmitEditing,
  onClear,
  clearBtnVisible,
}: SearchBarProps) {
  return (
    <FormControl className="my-3 flex-none">
      <Input variant="rounded" size="lg">
        <InputSlot className="pl-3">
          <InputIcon as={SearchIcon} />
        </InputSlot>
        <InputField
          placeholder="Search"
          value={value}
          onChangeText={onChangeText}
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
