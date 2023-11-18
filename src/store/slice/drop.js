import { createSlice } from "@reduxjs/toolkit";



const initialState={
    // 看板数据
    kanban_data:[],
    // 选中状态
    checked_state:""
}


export const DropSlice = createSlice({
    name:"drop",
    initialState,
    reducers:{
        set_kanban_data:(state,actions)=>{
            state.kanban_data = actions.payload
        },
        set_checked_state:(state,actions)=>{
            state.checked_state = actions.payload
        }
    }
})

export const select_kanban_data = (state)=>{
    return state.drop.kanban_data
}

export const {set_kanban_data,set_checked_state} = DropSlice.actions

export default DropSlice.reducer