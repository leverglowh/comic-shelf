import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE } from 'src/shared/reducers/action-type.util';
import { ICharacter, defaultValue as defaultCharacter } from 'src/shared/model/character.model';
import { BASE_MARVEL_URL } from 'src/shared/reducers/api-urls';

export const ACTION_TYPES = {
  FETCH_CHARACTER_LIST: 'character/FETCH_CHARACTER_LIST',
  FETCH_CHARACTER: 'character/FETCH_CHARACTER',
  RESET: 'character/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  totalCount: 0,
  entities: [] as ReadonlyArray<ICharacter>,
  entity: defaultCharacter,
};

export type CharacterState = Readonly<typeof initialState>;

export default (state: CharacterState = initialState, action): CharacterState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CHARACTER_LIST):
      return {
        ...state,
        errorMessage: null,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.FETCH_CHARACTER):
      return {
        ...state,
        errorMessage: null,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_CHARACTER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CHARACTER):
    case SUCCESS(ACTION_TYPES.FETCH_CHARACTER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data?.data?.results,
        totalCount: action.payload.data?.data?.total,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHARACTER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data?.data?.results?.[0],
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

const apiUrl = BASE_MARVEL_URL + '/v1/public/characters';

export const getEntities = (offset: number = 0) => {
  const requestUrl = apiUrl + `?offset=${offset}`;
  const encodedUrl = encodeURI(requestUrl);
  const localCopy = localStorage.getItem(encodedUrl);
  if (localCopy) {
    console.log('Using local');
    return {
      type: SUCCESS(ACTION_TYPES.FETCH_CHARACTER_LIST),
      payload: {
        data: JSON.parse(localCopy),
      },
    };
  }
  return {
    type: ACTION_TYPES.FETCH_CHARACTER_LIST,
    payload: axios.get<ICharacter>(requestUrl),
  };
};

export const getEntity = (characterId: number) => {
  const requestUrl = `${apiUrl}/${characterId}`;
  const localCopy = localStorage.getItem(requestUrl);
  if (localCopy)
    return {
      type: SUCCESS(ACTION_TYPES.FETCH_CHARACTER),
      payload: {
        data: JSON.parse(localCopy),
      },
    };
  return {
    type: ACTION_TYPES.FETCH_CHARACTER,
    payload: axios.get<ICharacter>(requestUrl),
  };
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
