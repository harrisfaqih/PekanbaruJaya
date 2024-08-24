import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_admin_dashboard_data = createAsyncThunk(
  "dashboard/get_admin_dashboard_data",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/admin/get-dashboard-data", {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const dashboardReducer = createSlice({
  name: "dashboard",
  initialState: {
    totalSale: 0,
    totalOrder: 0,
    totalProduct: 0,
    totalPendingOrder: 0,
    totalSeller: 0,
    totalStock: 0, // {{ edit_1 }} Menambahkan totalStock ke initialState
    recentOrder: [],
    recentMessage: [],
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      get_admin_dashboard_data.fulfilled,
      (state, { payload }) => {
        state.totalSale = payload.totalSale;
        state.totalOrder = payload.totalOrder;
        state.totalProduct = payload.totalProduct;
        state.totalSeller = payload.totalSeller;
        state.totalStock = payload.totalStock; // {{ edit_2 }} Menambahkan totalStock dari payload
        state.recentOrder = payload.recentOrders;
        state.recentMessage = payload.messages;
      }
    );
  },
});
export const { messageClear } = dashboardReducer.actions;
export default dashboardReducer.reducer;
