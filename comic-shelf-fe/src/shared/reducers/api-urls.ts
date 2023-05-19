export const strapiUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://read-comics-db.herokuapp.com/api/'
    : 'http://localhost:1337/api/';

export const BASE_MARVEL_URL = 'https://gateway.marvel.com';

export const IMAGE_VARIANT = {
  FULL: '',
  PORTRAIT: {
    /** 50x75px */
    SMALL: 'portrait_small',
    /** 100x150px */
    MEDIUM: 'portrait_medium',
    /** 150x225px */
    XLARGE: 'portrait_xlarge',
    /** 168x252px */
    FANTASTIC: 'portrait_fantastic',
    /** 300x450px */
    UNCANNY: 'portrait_uncanny',
    /** 216x324px */
    INCREDIBLE: 'portrait_incredible'
  },
  SQUARE: {
    /** 65x45px */
    SMALL: 'standard_small',
    /** 100x100px */
    MEDIUM: 'standard_medium',
    /** 140x140px */
    LARGE: 'standard_large',
    /** 200x200px */
    XLARGE: 'standard_xlarge',
    /** 250x250px */
    FANTASTIC: 'standard_fantastic',
    /** 180x180px */
    AMAZING: 'standard_amazing'
  },
  LANDSCAPE: {
    /** 120x90px */
    SMALL: 'landscape_small',
    /** 175x130px */
    MEDIUM: 'landscape_medium',
    /** 190x140px */
    LARGE: 'landscape_large',
    /** 270x200px */
    XLARGE: 'landscape_xlarge',
    /** 250x156px */
    AMAZING: 'landscape_amazing',
    /** 464x261px */
    INCREDIBLE: 'landscape_incredible'
  }
}
