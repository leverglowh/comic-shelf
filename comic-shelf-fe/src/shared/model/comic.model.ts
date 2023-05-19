import { ICharacterList } from './character.model';
import { ICreatorList } from './creator.model';
import { IEventList } from './event.model';
import { IImage } from './image.model';
import { ISeriesSummary } from './series.model';
import { IStoryList } from './story.model';
import { IUrl } from './url.model';

export interface IComic {
  id?: number;
  digitalId?: number;
  title?: string;
  issueNumber?: number;
  varianDescription?: string;
  description?: string;
  modified?: Date;
  isbn?: string;
  upc?: string;
  diamondCode?: string;
  ean?: string;
  issn?: string;
  format?: string;
  pageCount?: string;
  resourceURI?: string;
  /** A set of public web site URLs for the resource. */
  urls?: Array<IUrl>;
  series?: ISeriesSummary;
  variants?: Array<IComicSummary>;
  collections?: Array<IComicSummary>;
  collectedIssues?: Array<IComicSummary>;
  dates?: Array<IComicDate>;
  prices?: Array<IComicPrice>;
  thumbnail?: IImage;
  images?: Array<IImage>;
  creators?: ICreatorList;
  characters?: ICharacterList;
  stories?: IStoryList;
  events?: IEventList;
}

export interface IComicPrice {
  /** A description of the price (e.g. print price, digital price). */
  type?: string;
  price?: number;
}

export interface IComicDate {
  /** A description of the date (e.g. onsale date, FOC date). */
  type?: string;
  date?: Date;
}

export interface IComicList {
  available?: number;
  returned?: number;
  collectionURI?: string;
  items?: Array<IComicSummary>;
};

export interface IComicSummary {
  resourceURI?: string;
  name?: string;
};
