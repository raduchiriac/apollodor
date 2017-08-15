import ADD_TO_CART from '../actions'

export default (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      state = Object.assign({}, state, action.payload);
      break;
    default:
      break;
  }
  return state;
}
