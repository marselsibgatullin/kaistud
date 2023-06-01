import { Theme } from "@mui/material";

export const checkIsMobile = (theme: Theme) => (window.innerWidth) < theme.breakpoints.values.md
