import { Box } from "@/components/ui/box";
import { FormControl } from "@/components/ui/form-control";
import { SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { StatusBar, View } from "react-native";

export default function Index() {
  return (
    <View>
      <StatusBar barStyle="dark-content" />
      <FormControl>
        <Input variant="rounded" size="lg" className="mt-3 mx-3">
          <InputSlot className="pl-3">
            <InputIcon as={SearchIcon} />
          </InputSlot>
          <InputField placeholder="Search" />
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
