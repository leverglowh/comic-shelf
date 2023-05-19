import { IRole } from './role.model';

export interface IUser {
  id?: number;
  username?: string;
  comics?: IReadComics[];
  marvelAPICredentials?: IMarvelAPICredentials;
  email?: string;
  provider?: string; // local if not from social
  role?: IRole;
  confirmed?: boolean;
  blocked?: boolean;
  created_at?: string;
  created_by?: IAdminUser;
  updated_at?: string;
  updated_by?: IAdminUser;
}

export interface IReadComics {
  series: number;
  datetime: string;
  issues: number[];
}

export interface IAdminUser {
  id?: number;
  firstname?: string;
  lastname?: string;
  username?: string;
}

export interface IMarvelAPICredentials {
  public: string;
  private: string;
}

export const defaultValue: Readonly<IUser> = {};
