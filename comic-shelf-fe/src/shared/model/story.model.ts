export interface IStoryList {
  available?: number;
  returned?: number;
  collectionURI?: string;
  items?: Array<IStorySummary>;
};

export interface IStorySummary {
  resourceURI?: string;
  name?: string;
  /** The type of story (interior or cover) */
  type?: string;
};
