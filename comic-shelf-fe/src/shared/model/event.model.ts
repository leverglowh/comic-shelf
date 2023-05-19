export interface IEventList {
  available?: number;
  returned?: number;
  collectionURI?: string;
  items?: Array<IEventSummary>;
}

export interface IEventSummary {
  resourceURI?: string;
  name?: string;
};
