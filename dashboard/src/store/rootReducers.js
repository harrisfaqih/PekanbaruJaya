import OrderReducer from "./Reducers/OrderReducer";
import authReducer from "./Reducers/authReducer";
import categoryReducer from "./Reducers/categoryReducer";
import dashboardReducer from "./Reducers/dashboardReducer";
import productReducer from "./Reducers/productReducers";

const rootReducer = {
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
  order: OrderReducer,
  dashboard: dashboardReducer,
};
export default rootReducer;
