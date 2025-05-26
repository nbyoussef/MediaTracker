import { Stack } from "expo-router";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import React from "react";

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light">
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Media Tracker",
          }}
        />
      </Stack>
    </GluestackUIProvider>
  );
}
