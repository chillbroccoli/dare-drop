import { forwardRef } from "react";

export interface SelectProps extends React.ComponentProps<"select"> {
  options: { label: string; value: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    const { options, ...rest } = props;

    return (
      <div>
        <select
          ref={ref}
          {...rest}
          className="block w-full py-2 pl-3 pr-10 text-base text-white rounded-md focus:border-indigo-500 focus:outline-none disabled:border-zinc-600 disabled:bg-zinc-900 border-zinc-600 bg-zinc-800 focus:ring-indigo-500 sm:text-sm"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

Select.displayName = "Select";
