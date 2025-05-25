import { FormControl } from "@/components/ui/form-control";
import { SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { StatusBar, View } from "react-native";

export default function Index() {
	return (
		<View
			style={
				{
					// flex: 1,
					// justifyContent: "center",
					// alignItems: "center",
				}
			}
		>
			<StatusBar barStyle="dark-content" />
			<FormControl>
				<Input variant="rounded" size="lg" className="mt-3 mx-3">
					<InputSlot className="pl-3">
						<InputIcon as={SearchIcon} />
					</InputSlot>
					<InputField placeholder="Search" />
				</Input>
			</FormControl>
		</View>
	);
}
