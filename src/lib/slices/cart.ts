import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchShopify } from "@/lib/shopify";
import { cartCreateMutation, cartQuery, addToCartMutation } from "@/graphql";
import type {
  CreateCartInput,
  CartState,
  CartResponse,
  CartLine,
  CartResponseCostType,
} from "@/types";
import { dataUtils } from "@/utils";
import { RootState } from "@/lib/store";

export const create = createAsyncThunk(
  "cart/create",
  async (input: CreateCartInput, { rejectWithValue }) => {
    try {
      const ressponse = await fetchShopify({
        query: cartCreateMutation,
        variables: { input },
      });

      return ressponse.cartCreate.cart;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addLine = createAsyncThunk(
  "cart/addLine",
  async (line: CartLine, { rejectWithValue, getState }) => {
    const cartId = (getState() as RootState).cart.id;

    try {
      const ressponse = await fetchShopify({
        query: addToCartMutation,
        variables: { lines: [line], cartId },
      });

      return ressponse.cartLinesAdd.cart;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const get = createAsyncThunk(
  "cart/get",
  async (cartId: string, { rejectWithValue }) => {
    try {
      const ressponse = await fetchShopify({
        query: cartQuery,
        variables: { cartId },
      });

      return ressponse.cart;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState: CartState = {
  status: "idle",
  error: null,
  id: null,
  lines: [],
  total: null,
};

const getCompareAtPrice = ({
  cost,
  quontity,
}: {
  cost: CartResponseCostType;
  quontity: number;
}) => {
  if (cost.compareAtAmountPerQuantity) {
    return {
      amount: parseFloat(cost.compareAtAmountPerQuantity.amount) * quontity,
      currencyCode: cost.compareAtAmountPerQuantity.currencyCode,
    };
  }

  const regularPrice = parseFloat(cost.amountPerQuantity.amount) * quontity;

  if (regularPrice > parseFloat(cost.totalAmount.amount)) {
    return {
      amount: parseFloat(cost.amountPerQuantity.amount) * quontity,
      currencyCode: cost.amountPerQuantity.currencyCode,
    };
  }

  return null;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const setCart = (state: CartState, data: CartResponse) => {
      state.id = data.id;
      state.checkoutUrl = data.checkoutUrl;
      state.total = dataUtils.normalizePrice(data.cost.totalAmount);
      state.lines = data.lines.nodes
        .map((line) => ({
          id: line.id,
          quantity: line.quantity,
          title: line.merchandise.product.title,
          description: line.merchandise.product.description,
          price: dataUtils.normalizePrice(line.cost.totalAmount),
          compareAtPrice: getCompareAtPrice({
            cost: line.cost,
            quontity: line.quantity,
          }),
          image: line.merchandise.image,
        }))
        .reverse();

      localStorage.setItem("cartId", data.id);
    };
    builder
      .addCase(create.fulfilled, (state, action) => {
        state.status = "fulfilled";
        setCart(state, action.payload);
      })
      .addCase(addLine.fulfilled, (state, action) => {
        state.status = "fulfilled";
        setCart(state, action.payload);
      })
      .addCase(get.fulfilled, (state, action) => {
        state.status = "fulfilled";
        setCart(state, action.payload);
      });
  },
});

export default cartSlice.reducer;
