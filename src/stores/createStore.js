import { createContext, useContext } from 'react';
import { RootStore } from './RootStore';
import { createPersist } from './utils';

export function createStore() {
  const root = RootStore.create();

  // FIXME delete after development
  // if (process.env.NODE_ENV === 'development') {
  //   /* eslint-disable global-require */
  //   require('mst-middlewares').connectReduxDevtools(
  //     require('remotedev'),
  //     root,
  //   );
  //   /* eslint-enable global-require */
  // }
  // ===

  const persistor = createPersist(root);
  persistor.rehydrate();
  return root;
}

const RootContext = createContext(null);

export const { Provider } = RootContext;

export function useStore(extractFromStore) {
  const store = useContext(RootContext);
  if (typeof extractFromStore === 'function') {
    return extractFromStore(store);
  }
  return store;
}
