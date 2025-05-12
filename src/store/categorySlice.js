import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../lib/axiosInstance'


export const fetchCategories = createAsyncThunk(
  'categories/fetchAll',
  async () => {
    const res = await axios.get('/products/categories')
    return Array.isArray(res.data) ? res.data : []
  }
)

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],       
    selected: ['all'],
    status: 'idle',  
  },
  reducers: {
    toggleCategory(state, action) {
      const slug = action.payload
      if (slug === 'all') {
        state.selected = ['all']
      } else {
        
        state.selected = state.selected.filter(s => s !== 'all')
        const idx = state.selected.indexOf(slug)
        if (idx >= 0) state.selected.splice(idx, 1)
        else state.selected.push(slug)
        
        if (state.selected.length === 0) state.selected = ['all']
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => { state.status = 'loading' })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchCategories.rejected, state => { state.status = 'failed' })
  },
})

export const { toggleCategory } = categorySlice.actions
export default categorySlice.reducer