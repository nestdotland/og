import classnames from "classnames";
import React from "react";
import tw from "twin.macro";
import { ChevronDown } from "react-feather";

export interface Option {
  value: string;
  text?: string;
  disabled?: boolean;
}

export interface Props {
  options: Option[];
  value?: string;
  width?: string;
  name?: string;
  error?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  onChange?: (value: string) => void;
}

export const Select = React.forwardRef<HTMLSelectElement, Props>(
  (
    { value, options, name, error, disabled, autoFocus, onChange, ...rest },
    forwardedRef,
  ) => {
    return (
      <div
        css={[
          tw`relative flex items-center w-full`,
          disabled && tw`opacity-60`,
        ]}
      >
        <select
          ref={forwardedRef}
          value={value}
          disabled={disabled}
          autoFocus={autoFocus}
          name={name}
          className={classnames("select", { [`select-${name}`]: name != null })}
          css={[
            tw`bg-transparent w-full h-9 appearance-none border rounded`,
            tw`py-1 pl-2 pr-8`,
            !disabled && tw`cursor-pointer hover:border-gray-500`,
            error
              ? tw`border-red-500 hover:border-red-500`
              : tw`border-gray-600`,
            tw`focus:outline-none focus-visible:ring-2 focus-visible:ring-accent`,
          ]}
          {...rest}
          onChange={e => {
            if (onChange != null) {
              onChange(e.target.value);
            }
          }}
        >
          {options.map(opt => (
            <option
              key={opt.value}
              value={opt.value}
              disabled={opt.disabled}
              tw="text-bg"
            >
              {opt.text ?? opt.value}
            </option>
          ))}
        </select>

        <ChevronDown tw="h-full absolute top-0 right-2 pointer-events-none" />
      </div>
    );
  },
);
