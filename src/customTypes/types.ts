export type ProductProp = {
    product: {
        _id?: string;
        name: string;
        image: string;
        description: string;
        brand: string;
        category: string;
        price: number;
        countInStock: number;
        rating: number;
        numReviews: number;
    }
};

export type MenuProp = {
    closeMenu: () => void
}

export const states = ['ENUGU', 'ABIA','ADAMAWA','AKWA IBOM', 'ANAMBRA','BAUCHI','BAYELSA','BENUE', 'BORNO', 'CROSS RIVER', 'DELTA','EBONYI','EDO','EKITI','ABUJA FCT','GOMBE','IMO','JIGAWA','KADUNA','KANO','KASTINA','KEBBI','KOGI','KWARA','LAGOS','NASSARAWA','NIGER','OGUN','ONDO','OSUN','OYO','PLATEAU','RIVERS','SOKOTO','TARABA','YOBE','ZAMFARA'];

export const items = [{ path: '/', name: 'CONTINUE SHOPPING' }, { path: '/men', name: 'SHOP MEN' }, { path: '/women', name: 'SHOP WOMEN' }, { path: '/product-guide', name: 'PRODUCT-GUIDE' }, { path: '/about', name: 'ABOUT' }, { path: '/register', name: 'LOGIN' }];

export type Product = {
    _id?: string;
    name: string;
    image: string;
    description: string;
    brand: string;
    category: string;
    price: number;
    countInStock: number;
    rating: number;
    numReviews: number;
};

export type UserType = {
    _id?: string,
    username: string,
    email: string,
    state: string,
    password?: string,
    isAdmin?: boolean,
    verified?: boolean,
    verificationCode: string
}

export type registerUserType = {
    email: string,
    username: string,
    password: string,
    confirmPassword: string,
    gender: string,
    checked: boolean
}

export type LoginUserType = {
    email: string;
    password: string;
}

export type ForgotEmailType = {
    email: string;
}

export type InitialUserStateType = {
    isLoading: boolean,
    users: UserType[] | null
}

export type InitialSingleUserStateType = {
    isLoadingRegister: boolean;
    isSuccessRegister: boolean;
    isErrorRegister: boolean;
    isRegisterMessage: string;
    isLoadingLogin: boolean;
    isSuccessLogin: boolean;
    isErrorLogin: boolean;
    isLoginMessage: string;
    isLoadingForgotEmail: boolean;
    isSuccessForgotEmail: boolean;
    isErrorForgotEmail: boolean;
    isForgotEmailMessage: string;
    user: UserType | null
}

export type ProductType = {
    _id?: string,
    user: string,
    name: string,
    image: string,
    brand: string,
    category: string,
    description: string,
    rating: number,
    numReviews: number,
    price: number,
    countInStock: number,
    reviews: Array<any>
}

export type InitialProductStateType = {
    isLoading: boolean,
    error: boolean,
    products: ProductType[] | null
    product: ProductType
}

export type InitialCartState = {
    cartitems: ProductType[]
    amount: number,
    total: number,
}

export type AddressType = {
    address: string;
    state: string;
    motorpark: string;
}

export type PaymentMethod = string;