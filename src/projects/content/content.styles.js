import { createGlobalStyle } from 'styled-components'

export const ToggleControls = createGlobalStyle`
  #term-o-root {
    --term-o-console-opacity: 0;
    --term-o-console-scale: 0;
    --term-o-console-pointer-events: none;

    &&.open {
      --term-o-console-opacity: 1;
      --term-o-console-scale: 1;
      --term-o-console-pointer-events: all;
    }
  }
`
