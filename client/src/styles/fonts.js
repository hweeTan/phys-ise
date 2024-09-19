import { css } from 'styled-components'

import theSans from 'src/fonts/SFUTheSansPlain.woff'
import theSansLight from 'src/fonts/SFUTheSansLightPlain.woff'
import theSansBold from 'src/fonts/SFUTheSansBoldPlain.woff'

export default css`
  @font-face {
    font-family: 'SFUTheSansPlain';
    src: url('${theSans}') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'SFUTheSansPlain';
    src: url('${theSansLight}') format('woff');
    font-weight: light;
    font-style: normal;
  }

  @font-face {
    font-family: 'SFUTheSansPlain';
    src: url('${theSansBold}') format('woff');
    font-weight: bold;
    font-style: normal;
  }
`
