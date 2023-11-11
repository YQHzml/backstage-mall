import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getGoods,
  getLineCharts,
  getOrderData,
  getPieCharts,
  getTabList,
  getTreeCharts,
} from "../../util/request";
const initialState = {
  loading: false,
  menu: [],
  //面包屑数据
  tab_list: [{ key: "home", path: "/home" }],
  // 商品数量
  goods_list: [],
  // 订单数据
  order_data: [],
  // 折线图数据
  line_charts: [],
  // 树状图数据
  tree_charts: [],
  // 饼图数据
  pie_charts: [],
};

//   获取tab数据
export const get_tab_list = createAsyncThunk(
  "get/tabList",
  async (action, state) => {
    return await getTabList();
  }
);

//   获取商品数据
export const get_goods_list = createAsyncThunk(
  "get/goodsList",
  async (action, state) => {
    return await getGoods();
  }
);

// 获取订单数据
export const get_order_data = createAsyncThunk(
  "get/orderData",
  async (action, state) => {
    return await getOrderData();
  }
);

// 获取折线图数据
export const get_line_charts = createAsyncThunk(
  "get/lineCharts",
  async (action, state) => {
    return await getLineCharts();
  }
);

// 获取树状图数据
export const get_tree_charts = createAsyncThunk(
  "get/treeCharts",
  async (action, state) => {
    return await getTreeCharts();
  }
);

// 获取饼图数据
export const get_pie_charts = createAsyncThunk(
  "get/pieCharts",
  async (action, state) => {
    return await getPieCharts();
  }
);

export const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {
    set_tab_list: (state, action) => {
      const new_tab_list = action.payload;
      if (
        !state.tab_list.some((tab_list) => tab_list.key === new_tab_list.key)
      ) {
        state.tab_list.push(new_tab_list);
      }
    },
    set_goods_list: (state, action) => {
      state.goods_list = action.payload;
    },
    set_order_data: (state, action) => {
      state.goods_list = action.payload;
    },
    set_line_charts: (state, action) => {
      state.line_charts = action.payload;
    },
    set_tree_charts: (state, action) => {
      state.tree_charts = action.payload;
    },
    set_pie_charts: (state, action) => {
      state.pie_charts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_tab_list.fulfilled, (state, res) => {
        state.tab_list.push(res.payload);
      })
      .addCase(get_goods_list.pending, (state, res) => {
        state.loading = true;
      })
      .addCase(get_goods_list.fulfilled, (state, res) => {
        state.goods_list.push(res.payload);
        state.loading = false;
      })
      .addCase(get_order_data.fulfilled, (state, res) => {
        state.order_data = res.payload;
      })
      .addCase(get_line_charts.fulfilled, (state, res) => {
        state.line_charts = res.payload;
      })
      .addCase(get_tree_charts.fulfilled, (state, res) => {
        state.get_tree_charts = res.payload;
      })
      .addCase(get_pie_charts.fulfilled, (state, res) => {
        state.pie_charts = res.payload;
      });
  },
});

export const select_tab_list = (state) => {
  return state.subject.tab_list;
};
export const select_loading = (state) => {
  return state.subject.loading;
};
export const select_goods_list = (state) => {
  return state.subject.goods_list;
};

export const select_order_data = (state) => {
  return state.subject.order_data;
};

export const select_line_charts = (state) => {
  return state.subject.line_charts;
};

export const select_tree_charts = (state) => {
  return state.subject.tree_charts;
};

export const select_pie_charts = (state) => {
  return state.subject.pie_charts;
};

export const {
  set_tab_list,
  set_goods_list,
  set_order_data,
  set_line_charts,
  set_tree_charts,
  set_pie_charts,
} = subjectSlice.actions;

export default subjectSlice.reducer;
