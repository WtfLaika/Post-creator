import { store } from './../index';
import {rootReducer} from "../redux/rootReducer";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
