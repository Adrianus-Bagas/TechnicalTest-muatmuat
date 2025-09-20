import { IProductList } from "@/interfaces/product.interfaces";

export const categories = [
        {
            name: "Nama",
            value: "name"
        },
        {
            name: "Harga",
            value: "price"
        },
        {
            name: "Stok",
            value: "stock"
        }
    ]

export const sortTypes = [
        {
            name: "Asc",
            value: "asc"
        },
        {
            name: "Desc",
            value: "desc"
        }
    ]

export const blankProduct: IProductList = {
    name: '',
    price: 0,
    stock: 0
  }

export const defaultProducts: IProductList[] = [
    {
        name: "Produk muatmuat 1",
        price: 300000,
        stock: 180
    },
    {
        name: "Produk muatmuat 2",
        price: 200000,
        stock: 220
    },
    {
        name: "Produk muatmuat 3",
        price: 350000,
        stock: 210
    },
    {
        name: "Produk muatmuat 4",
        price: 700000,
        stock: 120
    },
    {
        name: "Produk muatmuat 5",
        price: 100000,
        stock: 200
    },
    {
        name: "Produk muatmuat 6",
        price: 300000,
        stock: 180
    },
    {
        name: "Produk muatmuat 7",
        price: 200000,
        stock: 220
    },
    {
        name: "Produk muatmuat 8",
        price: 350000,
        stock: 210
    },
    {
        name: "Produk muatmuat 9",
        price: 700000,
        stock: 120
    },
    {
        name: "Produk muatmuat 10",
        price: 100000,
        stock: 200
    }
]