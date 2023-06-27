import { get } from "object-path";
import { useFormContext } from "react-hook-form";

import { Error } from "../ui/Error";
import { Select, SelectProps } from "../ui/Select";
import { Textarea, TextareaProps } from "../ui/Textarea";
import { InputProps, TextInput } from "../ui/TextInput";

type RequiredProps = {
  name: string;
};

const errorStyle =
  "border-red-500 pr-10 text-red-500 placeholder-red-500 focus:border-red-700 focus:outline-none focus:ring-red-700";

export const Input = {
  Text: function (props: InputProps & RequiredProps) {
    const {
      register,
      formState: { errors },
    } = useFormContext();

    const error = get(errors, props.name)?.message;

    return (
      <div className="flex flex-col">
        <TextInput
          {...props}
          {...register(props.name)}
          className={error ? errorStyle : ""}
        />
        {error && <Error message={error} />}
      </div>
    );
  },

  Select: function (props: SelectProps & RequiredProps) {
    const {
      register,
      formState: { errors },
    } = useFormContext();

    const error = get(errors, props.name)?.message;

    return (
      <div className="flex flex-col">
        <Select
          {...props}
          {...register(props.name)}
          className={error ? errorStyle : ""}
        />
        {error && <Error message={error} />}
      </div>
    );
  },

  Textarea: function (props: TextareaProps & RequiredProps) {
    const {
      register,
      formState: { errors },
    } = useFormContext();

    const error = get(errors, props.name)?.message;

    return (
      <div className="flex flex-col">
        <Textarea
          {...props}
          {...register(props.name)}
          className={error ? errorStyle : ""}
        />
        {error && <Error message={error} />}
      </div>
    );
  },
};
