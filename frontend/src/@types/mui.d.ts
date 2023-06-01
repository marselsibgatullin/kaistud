import { PaletteColor } from "@mui/material";
import { PaletteColorOptions } from "@mui/material";
import { UseControllerProps } from "react-hook-form";

declare module '@mui/material/styles' {
  interface Palette {
    light: PaletteColor;
  }

  interface PaletteOptions {
    light: PaletteColorOptions;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    light: true,
  }
}

declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    light: true,
  }
}

declare module "@mui/material/TextField" {
  interface TextFieldPropsColorOverrides {
    light: true,
  }

  interface BaseTextFieldProps {
    rules?: UseControllerProps["rules"],
  }
}

declare module "@mui/x-date-pickers" {
  interface DateTimePickerProps<TInputDate, TDate> {
    name: string,
  }
}