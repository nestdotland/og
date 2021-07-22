import React, { useState } from "react";
import tw from "twin.macro";
import * as Popover from "@radix-ui/react-popover";
import { HexColorPicker } from "react-colorful";

export interface Props {
  color?: string;
  onChange?: (newColor: string) => void;
}

export const PopoverColorPicker: React.FC<Props> = ({ color, onChange }) => {
  return (
    <Popover.Root>
      <Popover.Trigger
        css={[
          tw`w-full h-9 rounded border hover:border-gray-400`,
          tw`focus:outline-none focus:border-transparent focus:ring-2 focus:ring-accent`,
          { backgroundColor: color },
        ]}
      />

      <Popover.Content>
        <HexColorPicker color={color} onChange={onChange} />
      </Popover.Content>
    </Popover.Root>
  );
};
