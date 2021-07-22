import React from "react";
import "twin.macro";
import { UpdateState } from "use-local-storage-state/src/useLocalStorageStateBase";
import { useLayoutConfig } from "../hooks/useLayoutConfig";
import {
  ILayout,
  ILayoutConfig,
  ILayoutProperty,
  ILayoutValue,
} from "../types";
import { Field, Label } from "./Field";
import { Input } from "./Input";
import { Select } from "./Select";
import { HexColorPicker } from "react-colorful";
import { PopoverColorPicker } from "./PopoverColorPicker";

export interface Props {
  layout: ILayout;
}

export const Layout: React.FC<Props> = ({ layout }) => {
  return (
    <div className={`layout-${layout.name}`} tw="space-y-4">
      {layout.properties.map(p => (
        <LayoutProperty key={p.name} property={p} />
      ))}
    </div>
  );
};

export const LayoutProperty: React.FC<{
  property: ILayoutProperty;
}> = ({ property: p }) => {
  const [layoutConfig, setLayoutConfig] = useLayoutConfig();

  return (
    <Field>
      <Label>{p.name} </Label>

      <div tw="w-full">
        {p.type === "text" ? (
          <Input
            placeholder={p.placeholder ?? `Value for ${p.name}`}
            value={layoutConfig[p.name] ?? ""}
            onChange={e => setLayoutConfig({ [p.name]: e.target.value })}
          />
        ) : p.type === "number" ? (
          <Input
            placeholder={p.placeholder ?? `Value for ${p.name}`}
            value={layoutConfig[p.name] ?? ""}
            type="number"
            onChange={e => setLayoutConfig({ [p.name]: e.target.value })}
          />
        ) : p.type === "select" ? (
          <Select
            options={p.options.map(value => ({ value }))}
            value={layoutConfig[p.name] ?? ""}
            onChange={value => setLayoutConfig({ [p.name]: value })}
          />
        ) : p.type === "color" ? (
          <PopoverColorPicker
            color={layoutConfig[p.name] ?? p.default}
            onChange={value => setLayoutConfig({ [p.name]: value })}
          />
        ) : null}

        {p.description != null && (
          <span tw="text-xs text-gray-400">{p.description}</span>
        )}
      </div>
    </Field>
  );
};
