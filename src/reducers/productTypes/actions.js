import { types } from "./constants";
import * as adminFetch from '../../utils/adminFetch';
import { BACKEND_URL } from '../../config/constants';

function loadAllProductTypes() {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      const url = `${BACKEND_URL}/type/detail`;
      adminFetch.get(url).then(res => {
        res.json().then(json => {
          if (json.length !== 0) {
            console.log(json);
            dispatch(actions.setProductTypes(json));
            resolve(true);
          } else reject();
        }).catch(() => reject());
      });
    });
  }
}

export const actions = {
  setProductTypes: (productTypes, content) => ({
    type: types.SET_PRODUCT_TYPES,
    payload: { productTypes, content }
  }),
  setProductType: (productType, content) => ({
    type: types.SET_PRODUCT_TYPE,
    payload: { productType, content }
  }),
  loadAllProductTypes
};