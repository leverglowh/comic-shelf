export interface ICreatorList {
  available?: number;
  returned?: number;
  collectionURI?: string;
  items?: Array<ICreatorSummary>;
};

export interface ICreatorSummary {
  resourceURI?: string;
  name?: string;
  role?: string;
};
