import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {CardType, GetCardParams} from "../api/cards/typesCards";
import {cardsApi} from "../api/cards/cardsApi";
import {AppThunkDispatch} from "./store";


type initialStateType = {
    cards: CardType[],
    pageSize: number,
    totalCardCount: number,
    currentPage: number,
    activeCardId: null | string,

}
export const initialState: initialStateType = {
    cards: [],
    pageSize: 5,
    totalCardCount: 100,
    currentPage: 1,
    activeCardId: null,
}

const slice = createSlice({
    name: 'card',
    initialState: initialState,
    reducers: {
        setCurrentPageAC: (state, action: PayloadAction<{ newCardPage: number }>) => {
            state.currentPage = action.payload.newCardPage;
        },
        setTotalCountAC: (state, action: PayloadAction<{ count: number }>) => {
            state.totalCardCount = action.payload.count;
        },
        setActiveCardIdAC(state, action: PayloadAction<{ cardId: string }>) {
            state.activeCardId = action.payload.cardId;
        },
        setPageSizeAC(state, action: PayloadAction<{ pageSize: number }>) {
            state.pageSize = action.payload.pageSize;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCardsTC.fulfilled, (state, action) => {
            state.cards = action.payload;
        });

    }
});

export const cardsReducer = slice.reducer;

export const {
    setTotalCountAC,
    setActiveCardIdAC,
    setPageSizeAC,
    setCurrentPageAC
} = slice.actions;

export const getCardsTC = createAsyncThunk<CardType[], GetCardParams, { dispatch: AppThunkDispatch }>
('packs/get', async (requestParams, thunkApi) => {
    const res = await cardsApi.getCard(requestParams);
    const totalCount = res.data.cardsTotalCount;
    thunkApi.dispatch(setTotalCountAC({count: totalCount}));
    const tableCards: CardType[] = res.data.cards.map((el) => {
        return {
            answer: el.answer,
            question: el.question,
            cardsPackId: el.,
            grade: el.
            shots: el.
            userId: el.
            created: el.
            updated: el.
            id: el.
        }
    })
    return tableCards;
});