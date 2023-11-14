import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMenuRequest, getUserData, getUserInfo } from "../../util/request";

const initialState = {
  menu: [],
  user_loading: false,
  user_info: {},
  user_list: [],
};

// 获取菜单
export const get_menu = createAsyncThunk(
  "get/user_menu",
  async (action, state) => {
    return await getMenuRequest();
  }
);

//获取个人信息
export const get_user_info = createAsyncThunk(
  "get/userinfo",
  async (action, state) => {
    return await getUserInfo();
  }
);

//获取个人信息
export const get_user_list = createAsyncThunk(
  "get/userData",
  async (action, state) => {
    return await getUserData();
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    set_menu: (state, action) => {
      state.menu = action.payload;
    },
    set_user_info: (state, action) => {
      state.user_info = action.payload;
    },
    set_user_list: (state, action) => {
      state.user_list = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_menu.fulfilled, (state, res) => {
        state.menu = res.payload;
      })
      .addCase(get_user_list.pending, (state, res) => {
        state.user_loading = true;
      })
      .addCase(get_user_list.fulfilled, (state, res) => {
        state.user_loading = false;
        state.user_list = res.payload;
      })
      .addCase(get_user_info.fulfilled, (state, res) => {
        state.user_info = res.payload;
      });
  },
});

export const select_user_info = (state) => {
  return state.user.user_info;
};

export const select_menu = (state) => {
  return state.user.menu;
};

export const select_user_list = (state) => {
  return state.user.user_list;
};

export const select_user_loading = (state) => {
  return state.user.user_loading;
};

export const { set_user_info, set_user_list, set_menu } = userSlice.actions;

export default userSlice.reducer;
