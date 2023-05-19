import { IAdminUser } from './user.model';

export interface IRole {
  id?: number;
  description?: string;
  name?: string;
  type?: string;
  created_by?: IAdminUser;
  updated_by?: IAdminUser;
}
