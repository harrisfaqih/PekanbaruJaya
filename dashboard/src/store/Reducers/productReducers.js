import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const add_product = createAsyncThunk(
  "product/add_product",
  async (product, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/product-add", product, {
        withCredentials: true,
      });
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response.data);

      return rejectWithValue(error.response.data);
    }
  }
);

// end methode

export const get_products = createAsyncThunk(
  "product/get_products",
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/products-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        {
          withCredentials: true,
        }
      );

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      //console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// end methode

export const get_product = createAsyncThunk(
  "product/get_product",
  async (productId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/product-get/${productId}`, {
        withCredentials: true,
      });

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      //console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

//end methode

export const update_product = createAsyncThunk(
  "product/update_product",
  async (product, { rejectWithValue, fulfillWithValue }) => {
    try {
      // Pastikan sizes adalah array sebelum mengirim
      if (typeof product.sizes === "string") {
        product.sizes = product.sizes.split(",").map((size) => size.trim());
      }
      const { data } = await api.post("/product-update", product, {
        withCredentials: true,
      });

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      //console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

//end methode

export const delete_product = createAsyncThunk(
  "product/delete_product",
  async (productId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(`/product-delete/${productId}`, {
        withCredentials: true,
      });

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

//end methode

export const product_image_update = createAsyncThunk(
  "product/product_image_update",
  async (
    { oldImage, newImage, productId },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("oldImage", oldImage);
      formData.append("newImage", newImage);
      formData.append("productId", productId);

      const { data } = await api.post("/product-image-update", formData, {
        withCredentials: true,
      });
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      //console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

//end methode

// export const product_image_delete = createAsyncThunk(
//   "product/product_image_delete",
//   async (imageId, { rejectWithValue, fulfillWithValue }) => {
//     try {
//       const { data } = await api.delete(`/product-image-delete/${imageId}`, {
//         withCredentials: true,
//       });

//       console.log(data);
//       return fulfillWithValue(data); // Pastikan data berisi pesan sukses
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

//end methode

export const productReducer = createSlice({
  name: "product",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    products: [],
    product: "",
    totalProduct: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(add_product.pending, (state, { payload }) => {
      state.loader = true;
    });
    builder.addCase(add_product.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error;
    });
    builder.addCase(add_product.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
    });
    builder.addCase(get_products.fulfilled, (state, { payload }) => {
      state.totalProduct = payload.totalProduct;
      state.products = payload.products;
    });
    builder.addCase(get_product.fulfilled, (state, { payload }) => {
      state.product = payload.product;
    });
    builder.addCase(update_product.pending, (state, { payload }) => {
      state.loader = true;
    });
    builder.addCase(update_product.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error;
    });
    builder.addCase(update_product.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.product = payload.product;
      state.successMessage = payload.message;
    });
    builder.addCase(product_image_update.fulfilled, (state, { payload }) => {
      state.product = payload.product;
      state.successMessage = payload.message;
    });
    builder.addCase(delete_product.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.product = payload.product;
      state.successMessage = payload.message;
    });
    builder.addCase(delete_product.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error;
    });
  },
});

export const { messageClear } = productReducer.actions;
export default productReducer.reducer;
