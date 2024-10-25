import { ReactElement, createContext, useMemo, useReducer } from "react"

export type CartItemType = {
    sku: string,
    name: string,
    price: number,
    qty: number,
}

type CartStateType = { cart: CartItemType[] }

const initCartState: CartStateType = { cart: [] }

const ACTION_TYPE = {
    ADD: "ADD",
    DELETE: "DELETE",
    REMOVE: "REMOVE",
    SUBMIT: "SUBMIT" 
}

export type ReducerActionType = typeof ACTION_TYPE //?? no idea where use these

export type ReducerAction = {
    type: string,
    payload?: CartItemType
}

const reducer = (state: CartStateType, action: ReducerAction): CartStateType => {
    switch (action.type) {
        case ACTION_TYPE.ADD: {
            if (!action.payload) {
                throw new Error ('action.payload is missing in ADD action')
            }

            const { sku, name, price } = action.payload

            const filteredItems: CartItemType[] = state.cart.filter(item => item.sku !== sku)

            const item: CartItemType | undefined = state.cart.find(item => item.sku === sku)

            const qty: number = item && item.qty > 0 ? item.qty + 1 : 1

            return { ...state, cart: [...filteredItems, {sku, name, price, qty}]}
        }
        case ACTION_TYPE.DELETE: {
            if (!action.payload) {
                throw new Error ('action.payload is missing in ADD action')
            }

            const { sku, name, price } = action.payload

            const filteredItems: CartItemType[] = state.cart.filter(item => item.sku !== sku)

            const item: CartItemType | undefined = state.cart.find(item => item.sku === sku)

            const qty: number = item && item.qty > 1 ? item.qty - 1 : 0

            return { ...state, cart: [...filteredItems, {sku, name, price, qty}]}
        }
        case ACTION_TYPE.REMOVE: {
            if (!action.payload) {
                throw new Error ('action.payload is missing in REMOVE action')
            }

            const { sku } = action.payload
                
            const filteredItems: CartItemType[] = state.cart.filter(item => item.sku !== sku)

            return { ...state, cart: [...filteredItems]}
        }
        case ACTION_TYPE.SUBMIT: {
            return { ...state, cart:[] }
        }
        default:
            throw new Error('Underfined reducer action.type')
    }
}

const useCartContext = (initialState: CartStateType) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const REDUCER_ACTIONS = useMemo(() => { 
        return ACTION_TYPE
    }, [])

    const totalItems: number = state.cart.reduce((prev, cartItem) => {
        return prev + cartItem.qty
    }, 0)

    const totalPrice: string = new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(
        state.cart.reduce((prev, cartItem) => {
            return prev + (cartItem.qty * cartItem.price)
        }, 0)
    )

    const cart: CartItemType[] = state.cart.sort((a, b) => {
        const itemA: number = Number(a.sku.slice(-4))
        const itemB: number = Number(b.sku.slice(-4))
        return itemA - itemB
    })

    return { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart }
} 

export type UseCartContextType = ReturnType<typeof useCartContext>

const initCartContextState: UseCartContextType = {
    dispatch: () => {},
    REDUCER_ACTIONS: ACTION_TYPE,
    totalItems: 0,
    totalPrice: '',
    cart: []
}

const CartContext = createContext<UseCartContextType>(initCartContextState)

type childrenType = { children: ReactElement | ReactElement[] }

export const CartProvider = ({ children }: childrenType) => {
    return (
        <CartContext.Provider value={useCartContext(initCartState)}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;