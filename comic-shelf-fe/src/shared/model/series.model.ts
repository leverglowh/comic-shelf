import { ICharacterList } from './character.model';
import { IComicList } from './comic.model';
import { ICreatorList } from './creator.model';
import { IEventList } from './event.model';
import { IImage } from './image.model';
import { IStoryList } from './story.model';
import { IUrl } from './url.model';

export interface ISeries {
  id?: number;
  title?: string;
  description?: string;
  resourceURI?: string;
  /** A set of public web site URLs for the resource. */
  urls?: Array<IUrl>;
  startYear?: number;
  endYear?: number;
  /** The age-appropriateness rating for the series. */
  rating?: string;
  /** The date the resource was most recently modified. */
  modified?: Date;
  thumbnail?: IImage;
  comics?: IComicList;
  stories?: IStoryList;
  events?: IEventList;
  characters?: ICharacterList;
  creators?: ICreatorList;
  /** A summary representation of the series which follows this series. */
  next?: ISeriesSummary;
  /** A summary representation of the series which preceded this series. */
  previous?: ISeriesSummary;
}

export interface ISeriesList {
  available?: number;
  returned?: number;
  collectionURI?: string;
  items?: Array<ISeriesSummary>;
}

export interface ISeriesSummary {
  resourceURI?: string;
  name?: string;
};

export const defaultValue: Readonly<ISeries> = {};
