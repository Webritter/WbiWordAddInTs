// app data models
const STORAGE_PREFIX = 'wbi_';
const INITIAL_DATE = (new Date()).toISOString();

export class AppStore {
  // initial state
  [key: string]: any;
  access_token = '';
  token_type= '';
  userName= '';
  '.expires' = INITIAL_DATE;
  '.issued' = INITIAL_DATE;

  constructor() {
    this.load();
  }

  save(stateObject: any) {
    // remember to stringify the objects that you want to store
    Object.keys(stateObject).forEach((key) => {
      const storageKey = STORAGE_PREFIX + key;
      const stateItem = stateObject[key];
      if (stateItem) {
        this[key] = stateItem;
        localStorage .setItem(storageKey, stateItem);
      }
    });
  }

  load() {
    Object.keys(this).forEach(key => {
      const storageKey = STORAGE_PREFIX + key;
      const storageItem = localStorage.getItem(storageKey);
      if (storageItem) {
        this[key] = storageItem;
      }
    });
  }
}
