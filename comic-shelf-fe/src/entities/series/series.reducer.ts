import axios from 'axios';
import { createAction, createReducer } from '@reduxjs/toolkit'
import { REQUEST, SUCCESS, FAILURE } from 'src/shared/reducers/action-type.util';
import { ISeries, defaultValue as defaultSeries } from 'src/shared/model/series.model';
import { BASE_MARVEL_URL } from 'src/shared/reducers/api-urls';
import { IComic } from 'src/shared/model/comic.model';

export const ACTION_TYPES = {
  FETCH_SERIES_LIST: 'series/FETCH_SERIES_LIST',
  FETCH_SERIES_LIST_BY_COMICS: 'series/FETCH_SERIES_LIST_BY_COMICS',
  FETCH_COMIC_LIST: 'series/FETCH_COMIC_LIST',
  FETCH_SERIES: 'series/FETCH_SERIES',
  RESET_ENTITY_COMICS: 'series/RESET_ENTITY_COMICS',
  RESET: 'series/RESET',
};

export const initialState = {
  loading: false,
  errorMessage: "",
  totalCount: 0,
  entities: [] as ReadonlyArray<ISeries>,
  comics: {
    count: 0,
    offset: 0,
    data: [] as ReadonlyArray<IComic>
  },
  comicsLoading: false,
  entity: defaultSeries
};

export type SeriesState = Readonly<typeof initialState>;

const a = (state: SeriesState = initialState, action): SeriesState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SERIES_LIST):
      return {
        ...state,
        errorMessage: "",
        loading: true,
      };
    case REQUEST(ACTION_TYPES.FETCH_COMIC_LIST):
      return {
        ...state,
        errorMessage: "",
        comicsLoading: true,
      };
    case REQUEST(ACTION_TYPES.FETCH_SERIES):
      return {
        ...state,
        errorMessage: "",
        loading: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_SERIES_LIST):
      return {
        ...state,
        errorMessage: action.payload,
        loading: false
      }
    case FAILURE(ACTION_TYPES.FETCH_COMIC_LIST):
      return {
        ...state,
        errorMessage: action.payload,
        comicsLoading: false
      }
    case FAILURE(ACTION_TYPES.FETCH_SERIES):
      return {
        ...state,
        errorMessage: action.payload,
        loading: false
      }
      case SUCCESS(ACTION_TYPES.FETCH_SERIES_LIST):
        return {
          ...state,
          entities: action.payload.data?.data?.results,
          totalCount: action.payload.data?.data?.total,
          loading: false
        }
      case SUCCESS(ACTION_TYPES.FETCH_COMIC_LIST):
        return {
          ...state,
          comics: {
            data: action.payload.data?.data?.results,
            count: action.payload.data.data.total,
            offset: action.payload.data.data.offset
          },
          comicsLoading: false
        }
    case SUCCESS(ACTION_TYPES.FETCH_SERIES):
      return {
        ...state,
        loading: false,
        entity: action.payload.data?.data?.results?.[0],
      };
    case ACTION_TYPES.RESET_ENTITY_COMICS:
      return {
        ...initialState,
        entities: state.entities,
        totalCount: state.totalCount,
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

// Actions

const apiUrl = BASE_MARVEL_URL + '/v1/public/series';

const fetchSeriesWithUrl = (url: string, state: any) => {
  const encodedUrl = encodeURI(url);
  const localCopy = localStorage.getItem(encodedUrl);
  if (localCopy) {
    const res = JSON.parse(localCopy).data;
    state.entities = res?.data.results;
    state.totalCount = res?.data.total;
    state.loading = false;
    return;
  }
  try {
    axios.get(url).then((res) => {
      state.entities = res.data?.data?.results;
      state.totalCount = res.data?.data?.total;
      state.loading = false;
    })
  } catch (e) {
    state.errorMessage = JSON.stringify(e);
    state.loading = false;
  }
}

export const getEntities = createAction(ACTION_TYPES.FETCH_SERIES_LIST, (titleStartsWith: string = '', page: number = 0) => {
  return {
    payload: {
      titleStartsWith,
      page
    }
  }
});

export const getSeriesByComics = createAction(ACTION_TYPES.FETCH_SERIES_LIST_BY_COMICS, (comicsList: number[]) => {
  return {
    payload: {
      comicsList
    }
  }
});

export const reset = createAction(ACTION_TYPES.RESET);

const seriesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getEntities, (state, action) => {
      const { titleStartsWith, page } = action.payload;
      state.loading = true;
      state.errorMessage = "";
      state.entities = [];
      state.totalCount = 0;

      const requestUrl = apiUrl + `?titleStartsWith=${titleStartsWith.trim()}&offset=${page * 20}`;
      fetchSeriesWithUrl(requestUrl, state)
    })
    .addCase(getSeriesByComics, (state, action) => {
      const { comicsList } = action.payload;
      state.loading = true;
      state.errorMessage = "";
      state.entities = [];
      state.totalCount = 0;

      const requestUrl = apiUrl + `?comics=${comicsList.join('%2C')}`;
      fetchSeriesWithUrl(requestUrl, state)
    })
    .addCase(reset, (state) => {
      Object.assign(state, initialState);
    })
})

export const getSeriesComics = (seriesId: number, page: number = 0) => {
  if (!seriesId) {
    alert('seriesId error');
    return;
  }
  const requestUrl = apiUrl + `/${seriesId}/comics?noVariants=true&orderBy=issueNumber&offset=${page * 20}`;
  const encodedUrl = encodeURI(requestUrl);
  const localCopy = localStorage.getItem(encodedUrl);
  if (localCopy) {
    console.log('Using local');
    return {
      type: SUCCESS(ACTION_TYPES.FETCH_COMIC_LIST),
      payload: JSON.parse(localCopy),
    };
  }
  return {
    type: ACTION_TYPES.FETCH_COMIC_LIST,
    payload: axios.get<IComic>(requestUrl),
  };
};

export const getEntity = (seriesId: number) => {
  const requestUrl = `${apiUrl}/${seriesId}`;
  const encodedUrl = encodeURI(requestUrl);
  const localCopy = localStorage.getItem(encodedUrl);
  if (localCopy) {
    console.log('Using local');
    return {
      type: SUCCESS(ACTION_TYPES.FETCH_SERIES),
      payload: JSON.parse(localCopy),
    };
  }
  return {
    type: ACTION_TYPES.FETCH_SERIES,
    payload: axios.get<ISeries>(requestUrl),
  };
};

export const resetSeriesComics = () => ({
  type: ACTION_TYPES.RESET_ENTITY_COMICS,
})

export default seriesReducer;