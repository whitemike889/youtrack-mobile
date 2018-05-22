/* @flow */
import {AsyncStorage} from 'react-native';

import log from '../log/log';

import type {AuthParams} from '../auth/auth';
import type {AppConfigFilled} from '../../flow/AppConfig';
import type {IssueOnList} from '../../flow/Issue';

const OTHER_ACCOUNTS_KEY = 'YT_OTHER_ACCOUNTS_STORAGE_KEY';

export type StorageState = {|
  projectId: ?string,
  draftId: ?string,
  authParams: ?AuthParams,
  config: ?AppConfigFilled,
  query: ?string,
  lastQueries: ?Array<string>,
  issuesCache: ?Array<IssueOnList>
|}

type StorageStateKeys = $Exact<$ObjMap<StorageState, () => string>>;

const storageKeys: StorageStateKeys = {
  projectId: 'YT_DEFAULT_CREATE_PROJECT_ID_STORAGE',
  draftId: 'DRAFT_ID_STORAGE_KEY',
  authParams: 'yt_mobile_auth',
  config: 'BACKEND_CONFIG_STORAGE_KEY',
  query: 'YT_QUERY_STORAGE',
  lastQueries: 'YT_LAST_QUERIES_STORAGE_KEY',
  issuesCache: 'yt_mobile_issues_cache'
};

let storageState: ?StorageState = null;

export const initialState: StorageState = {
  projectId: null,
  draftId: null,
  authParams: null,
  config: null,
  query: null,
  lastQueries: null,
  issuesCache: null
};

export function clearCachesAndDrafts() {
  return AsyncStorage.multiRemove([
    storageKeys.projectId, storageKeys.draftId, storageKeys.query,
    storageKeys.lastQueries, storageKeys.issuesCache
  ]);
}

export async function populateStorage(): Promise<StorageState> {
  const PAIR_KEY = 0;
  const PAIR_VALUE = 1;

  const pairs = await AsyncStorage.multiGet(Object.values(storageKeys));
  const values = pairs.reduce((acc, pair) => {
    acc[pair[PAIR_KEY]] = pair[PAIR_VALUE];
    return acc;
  }, {});

  storageState = Object.entries(storageKeys)
    .reduce((state, [key, storageKey]) => {
      const value = values[storageKey];
      try {
        state[key] = value ? JSON.parse(value) : value;
      } catch (e) {
        state[key] = value;
      }
      return state;
    }, initialState);

  log.log('Storage has been populated', storageState);

  return storageState;
}

export function getStorageState(): StorageState {
  if (!storageState) {
    throw new Error('Cannot read not yet populated YTM storage');
  }
  return storageState;
}

export async function flushStorage(newState: StorageState): Promise<StorageState> {
  storageState = newState;
  log.log('Flushing storage', storageState);

  const pairsToRemove = Object.entries(storageState)
    .filter(([key, value]) => !value);
  await AsyncStorage.multiRemove(pairsToRemove.map((([key]) => storageKeys[key])));

  const pairsToWrite = Object.entries(storageState)
    .filter(([key, value]) => !!value);
  const pairs = pairsToWrite.map(([key, value]) => [storageKeys[key], value ? JSON.stringify(value) : value]);
  await AsyncStorage.multiSet(pairs);

  return newState;
}

export async function flushStoragePart(part: Object): Promise<StorageState> {
  return flushStorage({
    ...getStorageState(),
    ...part
  });
}

export async function getOtherAccounts(): Promise<Array<StorageState>> {
  const stored = await AsyncStorage.getItem(OTHER_ACCOUNTS_KEY);
  return stored ? JSON.parse(stored) : [];
}

export async function storeAccounts(accounts: Array<StorageState>) {
  await AsyncStorage.setItem(OTHER_ACCOUNTS_KEY, JSON.stringify(accounts));
}

// For tests only!
export async function __setStorageState(state: StorageState) {
  storageState = state;
}