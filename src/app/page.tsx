'use client'

import ListComponent from "@/components/ListComponent";
import Loading from "@/components/Loading";
import ModalConfirmation from "@/components/ModalConfirmation";
import ModalProduct from "@/components/ModalProduct";
import Sidebar from "@/components/Sidebar";
import { IProductList } from "@/interfaces/product.interfaces";
import { alertMessageAtom, formAtom, isLoadingAtom, isMobileScreenAtom, openAlertAtom, openModalConfirmationAtom, openModalProductAtom, productListAtom } from "@/store/app.atom";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";

export default function Home() {

  const [productList, setProductList] = useAtom(productListAtom);
  const [openModalProduct, setOpenModalProduct] = useAtom(openModalProductAtom);
  const [openModalConfirmation, setOpenModalConfirmation] = useAtom(openModalConfirmationAtom);

  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const newProduct = useAtomValue(formAtom);

  const setOpenAlert = useSetAtom(openAlertAtom);
  const setAlertMessage = useSetAtom(alertMessageAtom);
  const setForm = useSetAtom(formAtom);
  const setIsMobileScreen = useSetAtom(isMobileScreenAtom);

  const [modalTitle, setModalTitle] = useState<string>('');
  const [isEditOrDeleteButtonClicked, setIsEditOrDeleteButtonClicked] = useState<boolean>(false);
  const [mode, setMode] = useState<'none'|'add'|'edit'|'delete'>('none');

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobileScreen(window.innerWidth < 768);

      window.addEventListener("resize", () => {
        setIsMobileScreen(window.innerWidth < 768);
      });

      return () => {
        window.removeEventListener("resize", () => {});
      };
    }
  }, []);

  useEffect(()=>{
    setTimeout(()=>{
      setIsLoading(false)
    }, 1500)
  }, [])

  const onClickAddModal = () => {
    setMode('add')
    setOpenModalProduct(true)
    setModalTitle("Tambah Produk")
  }

  const onClickEditModal = () => {
    setMode('edit')
    setIsEditOrDeleteButtonClicked(true)
  }

  const onClickDeleteModal = () => {
    setMode('delete')
    setIsEditOrDeleteButtonClicked(true)
  }

  const onClickOk = () => {
    setIsLoading(true)
    setOpenModalProduct(false)
    setMode('none')
    setModalTitle('')
    setIsEditOrDeleteButtonClicked(false)
    setOpenModalConfirmation(false)
    setTimeout(()=>{
      setIsLoading(false)
      setOpenAlert(true)
    if(mode === 'add') {
      setAlertMessage('Produk berhasil ditambahkan')
      setProductList([
        ...productList,
        newProduct
      ])
    }
    if(mode === 'edit') {
      setAlertMessage('Produk berhasil diubah')
      setProductList([
        ...productList.filter((item)=>item.name !== newProduct.name),
        newProduct
      ])
    }
    if(mode === 'delete') {
      setAlertMessage('Produk berhasil dihapus')
      setProductList([
        ...productList.filter((item)=>item.name !== newProduct.name),
      ])
    }
    setTimeout(()=>{
      setOpenAlert(false)
    }, 3000)
    }, 1500)
  }

  const onClickCancel = () => {
    setOpenModalConfirmation(false)
    if(mode === 'delete') {
      setMode('none')
    }
  }

  const onClickProductToEdit = (product: IProductList) => {
    if(mode === 'edit') {
      setOpenModalProduct(true)
      setForm(product)
      setModalTitle("Edit Produk")
    }
    if(mode === 'delete') {
      setOpenModalConfirmation(true)
    }
  }

  return (
    <>
    {isLoading && <Loading/>}
    {openModalProduct && <ModalProduct title={modalTitle} mode={mode} />}
    {openModalConfirmation && <ModalConfirmation onOk={onClickOk} onCancel={onClickCancel}/>}
    <div className="container p-4 md:flex h-screen">
      <Sidebar onClickDeleteModal={onClickDeleteModal} isEditOrDeleteButtonClicked={isEditOrDeleteButtonClicked} onClickAddModal={onClickAddModal} onClickEditModal={onClickEditModal} setIsEditOrDeleteButtonClicked={setIsEditOrDeleteButtonClicked}/>
      <ListComponent isEditOrDeleteButtonClicked={isEditOrDeleteButtonClicked} onClickProductToEdit={onClickProductToEdit}/>
    </div>
    </>
  );
}
