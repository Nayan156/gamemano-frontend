// // store/index.js
// import { configureStore } from '@reduxjs/toolkit';
// import categoryReducer from './categorySlice';

// export const store = configureStore({
//   reducer: { categories: categoryReducer },
// });
// store/index.js
import { configureStore } from '@reduxjs/toolkit'
import categoryReducer    from './categorySlice'

export const store = configureStore({
  reducer: { categories: categoryReducer }
})
