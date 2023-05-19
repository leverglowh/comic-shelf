// import { combineReducers } from 'redux';
import authentication, { AuthenticationState } from './authentication';
import character, { CharacterState } from 'src/entities/character/character.reducer';
import series, { SeriesState } from 'src/entities/series/series.reducer';

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly character: CharacterState;
  readonly series: SeriesState;
}

// const rootReducer = combineReducers<IRootState>({
//   authentication,
//   character,
//   series
// });

// export default rootReducer;
