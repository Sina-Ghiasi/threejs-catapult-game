export default function createStore(reducer, initialState) {
  let state = initialState;
  let listeners = [];

  return {
    getState: () => state,

    dispatch: (action) => {
      state = reducer(state, action);
      listeners.forEach((listener) => listener(state));
    },

    subscribe: (listener) => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter((l) => l !== listener);
      };
    },
  };
}
