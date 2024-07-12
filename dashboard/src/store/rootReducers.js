import authReducer from "./Reducers/authReducer";
import categoryReducer from "./Reducers/categoryReducer";
import productReducer from "./Reducers/productReducers";

const rootReducer = {
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
};
export default rootReducer;
