import React, { createContext, ReactNode, useContext, useReducer } from "react";
import axios from "axios";

type Action = {type: 'fetch', payload: any} |
    {type: 'loading', payload: any} |
    {type: 'error', payload: any} |
    {type: 'reset', payload: any};

type Dispatch = (action: Action) => void;

type State = {
    facts: string[];
    loading: boolean;
    error?: string;
}

const initialState = {facts: [], loading: false};

/* Do not export.  These are retrieved via useState and useDispatch functions.
    This ensures the use of this is always within a <CatFactProvider> context */
const CatFactStateContext = createContext<State | undefined>(undefined);
const CatFactDispatchContext = createContext<Dispatch | undefined>(undefined);

/* Reducer */
const catFactReducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'fetch':
            return {
                ...state,
                loading: false,
                error: undefined,
                facts: [...action.payload.data, ...state.facts]
            };
        case 'loading':
            return {
                ...state,
                error: undefined,
                loading: true,
            }
        case 'error':
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case 'reset':
            return initialState;
        default:
            throw new Error(`Unsupported action type: ${action}`);
    }
}

/* Provider */
export const CatFactProvider = (props: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(catFactReducer, initialState);
    return (
        <CatFactStateContext.Provider value={state}>
            <CatFactDispatchContext.Provider value={dispatch}>
                { props.children }
            </CatFactDispatchContext.Provider>
        </CatFactStateContext.Provider>
    )
}

/* State context */
export const useCatFactState = () => {
    const context = useContext(CatFactStateContext);
    if(context === undefined) {
        throw new Error('useCatFactState cannot be used outside a CatFactProvider');
    }
    return context;
}

/* Dispatch context */
export const useCatFactDispatch = () => {
    const context = useContext(CatFactDispatchContext);
    if(context === undefined) {
        throw new Error('useCatFactState cannot be used outside a CatFactProvider');
    }
    return context;
}

/* Actions */
export const getCatFact = async (dispatch: React.Dispatch<Action>) => {
    dispatch({ type: 'loading', payload: true})
    try {
        let res = await axios.get("https://meowfacts.herokuapp.com/");
        dispatch({ type: 'fetch', payload: res.data});
    } catch (err) {
        dispatch({ type: 'error', payload: err})
    }
}

export const resetCatFact = async (dispatch: React.Dispatch<Action>) => {
    dispatch({ type: 'reset', payload: true});
}
