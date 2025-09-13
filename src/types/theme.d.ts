import "@emotion/react";
import type { AppTheme } from "../styles/theme";

declare module "@emotion/react" {
  export interface Theme {
    palette: AppTheme["palette"];
    color: AppTheme["color"];
    radius: AppTheme["radius"];
    shadow: AppTheme["shadow"];
    typography: AppTheme["typography"];
    gradient: AppTheme["gradient"];
  }
}
