import { BASE_MARVEL_URL } from '../reducers/api-urls';
import { saveItemToLocalStorage } from './general-utils';

// export const parseList = (list) => {
//   console.log(list);
//   const newList: any[] = [];
//   console.log(list);
//   return newList;
// };

export const updateCache = () => {
  const lastUpdateLS = localStorage.getItem('last_update');
  const now = new Date();
  if (!lastUpdateLS) {
    // non existent LS date field, add one
    saveItemToLocalStorage('last_update', now);
  } else {
    const lastUpdate = new Date(JSON.parse(lastUpdateLS));
    if (+now - +lastUpdate > (1000 * 60 * 60 * 24)) {
      // more than one day ago

      // remove all
      const keys = Object.keys(localStorage).filter(k => k.includes(BASE_MARVEL_URL));
      keys.forEach(key => localStorage.removeItem(key));

      // update date
      saveItemToLocalStorage('last_update', now);
    }
  }
};
