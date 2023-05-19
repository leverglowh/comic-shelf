import { BASE_MARVEL_URL } from 'src/shared/reducers/api-urls';
import { IReadComics } from 'src/shared/model/user.model';

export const capitalizeFirst = (str: string) => {
  const strs: string[] = [];
  str.split(/\s/g).forEach((s) => strs.push(s[0].toUpperCase() + s.slice(1)));
  return strs.join(' ');
};

export const saveItemToLocalStorage = (key: string, item: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(item));
  } catch (e) {
    const keys = Object.keys(localStorage);
    const key = keys.find(k => k.includes(BASE_MARVEL_URL));
    if (!key) {
      alert('Something went wrong');
      return;
    } else {
      localStorage.removeItem(key);
      return saveItemToLocalStorage(key, item);
    }
  }
};

export const sortReadComicsByDate = (a: IReadComics, b: IReadComics) => {
  const dateA = new Date(a.datetime);
  const dateB = new Date(b.datetime);

  if (dateA.getTime() < dateB.getTime()) return 1;
  if (dateA.getTime() > dateB.getTime()) return -1;
  return 0;
};
