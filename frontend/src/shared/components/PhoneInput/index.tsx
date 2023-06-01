import { TextField, TextFieldProps } from "@mui/material";
import { FC } from "react";
import { IMaskInput } from 'react-imask';
import { forwardRef, ForwardedRef } from 'react';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TextMaskCustom = forwardRef<HTMLInputElement, CustomProps>(
  function TextMaskCustom(props, ref: ForwardedRef<HTMLInputElement>) {
    const { onChange, ...other } = props;

    return (
      <IMaskInput
        {...other}
        mask="+7(900) 000-00-00"
        inputRef={ref}
        onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  },
);

export const PhoneInput: FC<TextFieldProps> = (props) => {
    return (
        <TextField
            InputProps={{
                inputComponent: TextMaskCustom as any
            }}
            {...props} />
    )
}