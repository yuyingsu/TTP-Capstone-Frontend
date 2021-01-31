export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cartsItem');
    if (serializedState == null) {
      return null;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cartsItem', serializedState);
  } catch (err) {
    return undefined;
  }
};

