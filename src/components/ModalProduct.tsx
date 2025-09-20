import { blankProduct } from "@/constants/products";
import { formAtom, openModalConfirmationAtom, openModalProductAtom, productListAtom } from "@/store/app.atom";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";

export default function ModalProduct({title, mode}:{title: string; mode: 'none' | 'add' | 'edit' | 'delete';}) {

    const setOpenModalProduct = useSetAtom(openModalProductAtom);
    const setOpenModalConfirmation = useSetAtom(openModalConfirmationAtom);
    const productList = useAtomValue(productListAtom);
    const [form, setForm] = useAtom(formAtom);
    const [error, setError] = useState<string>('');

    const onChangeForm = (props: 'name' | 'price' | 'stock', value: string | number) => {
        setForm({
            ...form,
            [props]: value
        })
    }

    const onClickSave = () => {
        const isFormEmpty = !form.name || form.price === undefined || form.stock === undefined;
        const isNameExist = productList.find((item)=>item.name.toLowerCase() === form.name);
        if(isFormEmpty) {
            setError("Form tidak boleh kosong")
            setTimeout(()=>{
                setError('')
            }, 3000)
        } else if(mode === 'add' && isNameExist){
            setError("Nama tidak boleh sama")
            setTimeout(()=>{
                setError('')
            }, 3000)
        }else {
            setOpenModalConfirmation(true)
        }
    }

    const onClickClose = () => {
        setOpenModalProduct(false)
        setForm(blankProduct)
        setError('')
    }

    return <>
    <div className="bg-black w-full h-full opacity-50 absolute z-10"></div>
        <div className="fixed z-20 w-full md:w-1/2 h-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <div className="bg-white p-2">
        <p className="text-right cursor-pointer" onClick={onClickClose}>X</p>
        <p className="text-center">{title}</p>
        <div className="flex flex-col items-center gap-4 my-4">
        <div className="flex gap-2 items-center">
            <p>Nama</p>
            <input onChange={(event)=>onChangeForm('name', event.target.value)} className="border-black border-2 p-1" type="text" value={mode === 'edit' ? form.name : undefined} />
        </div>
        <div className="flex gap-2 items-center">
            <p>Harga</p>
            <input onChange={(event)=>onChangeForm('price', parseInt(event.target.value))} className="border-black border-2 p-1" type="number" min={0} value={mode === 'edit' ? form.price : undefined}/>
        </div>
        <div className="flex gap-5 items-center">
            <p>Stok</p>
            <input onChange={(event)=>onChangeForm('stock', parseInt(event.target.value))} className="border-black border-2 p-1" type="number" min={0} value={mode === 'edit' ? form.stock : undefined}/>
        </div>
        </div>
        <p className="text-center text-red-600">{error}</p>
        <div className="flex justify-center items-center">
            <div className="bg-black text-white p-2 cursor-pointer w-fit" onClick={onClickSave}>
                Simpan
            </div>
        </div>
    </div>
        </div>
    </>
}