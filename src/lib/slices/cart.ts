import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchShopify } from "@/lib/shopify";
import {
  cartCreateMutation,
  cartQuery,
  addToCartMutation,
  removeCartLineMutation,
  discountCodesUpdateMutation,
} from "@/graphql";
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
  async (
    { line, discountCode }: { line: CartLine; discountCode?: string },
    { rejectWithValue, getState }
  ) => {
    const cart = (getState() as RootState).cart;
    const discountCodes = discountCode
      ? [...cart.discountCodes, discountCode]
      : cart.discountCodes;

    try {
      const ressponse = await fetchShopify({
        query: addToCartMutation,
        variables: {
          lines: [line],
          cartId: cart.id,
          discountCodes,
        },
      });

      return ressponse.cartLinesAdd.cart;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeLine = createAsyncThunk(
  "cart/removeLine",
  async (
    { lineId, discountCode }: { lineId: string; discountCode?: string },
    { rejectWithValue, getState }
  ) => {
    const cart = (getState() as RootState).cart;
    const discountCodes = discountCode
      ? cart.discountCodes.filter((code) => code !== discountCode)
      : cart.discountCodes;

    try {
      const ressponse = await fetchShopify({
        query: removeCartLineMutation,
        variables: { lineIds: [lineId], cartId: cart.id, discountCodes },
      });

      return ressponse.cartLinesRemove.cart;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const get = createAsyncThunk(
  "cart/get",
  async (
    { cartId, locale }: { cartId: string; locale?: string },
    { rejectWithValue }
  ) => {
    try {
      const ressponse = await fetchShopify({
        query: cartQuery,
        variables: { cartId },
        locale,
      });

      return ressponse.cart;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const discountCodeUpdate = createAsyncThunk(
  "cart/discountCodeUpdate",
  async (
    { code, add }: { code: string; add: boolean },
    { rejectWithValue, getState }
  ) => {
    const state = (getState() as RootState).cart;

    const discountCodes = [...state.discountCodes];

    if (add) {
      if (!discountCodes.includes(code)) discountCodes.push(code);
    } else {
      discountCodes.splice(discountCodes.indexOf(code), 1);
    }

    try {
      const ressponse = await fetchShopify({
        query: discountCodesUpdateMutation,
        variables: { cartId: state.id, discountCodes },
      });

      return ressponse.cartDiscountCodesUpdate.cart;
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
  discountCodes: [],
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
      state.discountCodes = data.discountCodes.flatMap(({ code }) => code);
      state.total = dataUtils.normalizePrice(data.cost.totalAmount);
      state.lines = data.lines.nodes
        .map((line) => ({
          id: line.id,
          productId: line.merchandise.id,
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
      .addCase(removeLine.pending, (state, action) => {
        state.lines = state.lines.map((line) => {
          if (line.id === action.meta.arg.lineId) {
            return { ...line, removing: true };
          }
          return line;
        });
      })
      .addCase(removeLine.fulfilled, (state, action) => {
        state.status = "fulfilled";
        setCart(state, action.payload);
      })
      .addCase(discountCodeUpdate.fulfilled, (state, action) => {
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
