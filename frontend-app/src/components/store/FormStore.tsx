import { configureStore } from '@reduxjs/toolkit'
import {formMode} from './formSlice'

const store = configureStore({
	reducer: { formMode: formMode.reducer },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
