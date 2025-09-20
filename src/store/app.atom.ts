import {atom} from "jotai";

import {blankProduct, defaultProducts} from "@/constants/products";
import {IProductList} from "@/interfaces/product.interfaces";

export const formAtom = atom<IProductList>(blankProduct);
export const productListAtom = atom<IProductList[]>(defaultProducts);
export const openModalProductAtom = atom<boolean>(false);
export const openModalConfirmationAtom = atom<boolean>(false);
export const isLoadingAtom = atom<boolean>(true);
export const openAlertAtom = atom<boolean>(false);
export const alertMessageAtom = atom<string>("");
export const isMobileScreenAtom = atom<boolean>(false);
export const searchAtom = atom<string>("");
export const newProductListAtom = atom<IProductList[]>(defaultProducts);
export const showFetchAPITaskAtom = atom<boolean>(false);
