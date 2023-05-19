import { IUrl } from './url.model';
import { IImage } from './image.model';
import { IComicList } from './comic.model';
import { IStoryList } from './story.model';
import { IEventList } from './event.model';
import { ISeriesList } from './series.model';

export interface ICharacter {
  id?: number;
  name?: string;
  description?: string;
  modified?: Date;
  resourceURI?: string;
  urls?: Array<IUrl>;
  thumbnail?: IImage;
  comics?: IComicList;
  stories?: IStoryList;
  events?: IEventList;
  series?: ISeriesList;
}

export interface ICharacterList {
  /** The number of total available characters in this list.
   * Will always be greater than or equal to the "returned" value.
   */
  available?: number;
  /** The number of characters returned in this collection (up to 20). */
  returned?: number;
  /** The path to the full list of characters in this collection. */
  collectionURI?: string;
  /** The list of returned characters in this collection. */
  items?: Array<ICharacterSummary>;
}

export interface ICharacterSummary {
  /** The path to the individual character resource. */
  resourceURI?: string;
  /** The full name of the character. */
  name?: string;
  /** The role of the creator in the parent entity. */
  role?: string;
}

export const defaultValue: Readonly<ICharacter> = {};
