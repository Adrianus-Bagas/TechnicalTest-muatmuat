"use client";

import {useAtom, useAtomValue, useSetAtom} from "jotai";
import {useEffect, useState} from "react";

import FetchAPI from "@/components/FetchAPITask";
import ListComponent from "@/components/ListComponent";
import Loading from "@/components/Loading";
import ModalConfirmation from "@/components/ModalConfirmation";
import ModalProduct from "@/components/ModalProduct";
import Sidebar from "@/components/Sidebar";
import {IProductList} from "@/interfaces/product.interfaces";
import {
  alertMessageAtom,
  formAtom,
  isLoadingAtom,
  isMobileScreenAtom,
  openAlertAtom,
  openModalConfirmationAtom,
  openModalProductAtom,
  productListAtom,
  showFetchAPITaskAtom,
} from "@/store/app.atom";

export default function Home() {
  const [productList, setProductList] = useAtom(productListAtom);
  const [openModalProduct, setOpenModalProduct] = useAtom(openModalProductAtom);
  const [openModalConfirmation, setOpenModalConfirmation] = useAtom(openModalConfirmationAtom);

  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const newProduct = useAtomValue(formAtom);
  const showFetchAPITask = useAtomValue(showFetchAPITaskAtom);

  const setOpenAlert = useSetAtom(openAlertAtom);
  const setAlertMessage = useSetAtom(alertMessageAtom);
  const setForm = useSetAtom(formAtom);
  const setIsMobileScreen = useSetAtom(isMobileScreenAtom);

  const [modalTitle, setModalTitle] = useState<string>("");
  const [isEditOrDeleteButtonClicked, setIsEditOrDeleteButtonClicked] = useState<boolean>(false);
  const [mode, setMode] = useState<"none" | "add" | "edit" | "delete">("none");

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

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const onClickAddModal = () => {
    setMode("add");
    setOpenModalProduct(true);
    setModalTitle("Tambah Produk");
  };

  const onClickEditModal = () => {
    setMode("edit");
    setIsEditOrDeleteButtonClicked(true);
  };

  const onClickDeleteModal = () => {
    setMode("delete");
    setIsEditOrDeleteButtonClicked(true);
  };

  const onClickOk = () => {
    setIsLoading(true);
    setOpenModalProduct(false);
    setMode("none");
    setModalTitle("");
    setIsEditOrDeleteButtonClicked(false);
    setOpenModalConfirmation(false);
    setTimeout(() => {
      setIsLoading(false);
      setOpenAlert(true);
      if (mode === "add") {
        setAlertMessage("Produk berhasil ditambahkan");
        setProductList([...productList, newProduct]);
      }
      if (mode === "edit") {
        setAlertMessage("Produk berhasil diubah");
        setProductList([
          ...productList.filter((item) => item.name !== newProduct.name),
          newProduct,
        ]);
      }
      if (mode === "delete") {
        setAlertMessage("Produk berhasil dihapus");
        setProductList([...productList.filter((item) => item.name !== newProduct.name)]);
      }
      setTimeout(() => {
        setOpenAlert(false);
      }, 3000);
    }, 1500);
  };

  const onClickCancel = () => {
    setOpenModalConfirmation(false);
    if (mode === "delete") {
      setMode("none");
    }
  };

  const onClickProductToEdit = (product: IProductList) => {
    if (mode === "edit") {
      setOpenModalProduct(true);
      setForm(product);
      setModalTitle("Edit Produk");
    }
    if (mode === "delete") {
      setOpenModalConfirmation(true);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      {openModalProduct && <ModalProduct mode={mode} title={modalTitle} />}
      {openModalConfirmation && <ModalConfirmation onCancel={onClickCancel} onOk={onClickOk} />}
      <div className="container p-4 md:flex h-screen">
        <Sidebar
          isEditOrDeleteButtonClicked={isEditOrDeleteButtonClicked}
          setIsEditOrDeleteButtonClicked={setIsEditOrDeleteButtonClicked}
          onClickAddModal={onClickAddModal}
          onClickDeleteModal={onClickDeleteModal}
          onClickEditModal={onClickEditModal}
        />
        {showFetchAPITask ? (
          <FetchAPI />
        ) : (
          <ListComponent
            isEditOrDeleteButtonClicked={isEditOrDeleteButtonClicked}
            onClickProductToEdit={onClickProductToEdit}
          />
        )}
      </div>
    </>
  );
}
