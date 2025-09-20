import {useAtom, useAtomValue, useSetAtom} from "jotai";
import {useState} from "react";

import {categories, sortTypes} from "@/constants/products";
import {
  isLoadingAtom,
  newProductListAtom,
  productListAtom,
  searchAtom,
  showFetchAPITaskAtom,
} from "@/store/app.atom";

export default function Sidebar({
  isEditOrDeleteButtonClicked,
  onClickAddModal,
  onClickEditModal,
  setIsEditOrDeleteButtonClicked,
  onClickDeleteModal,
}: {
  isEditOrDeleteButtonClicked: boolean;
  setIsEditOrDeleteButtonClicked: React.Dispatch<React.SetStateAction<boolean>>;
  onClickAddModal: () => void;
  onClickEditModal: () => void;
  onClickDeleteModal: () => void;
}) {
  const [showFetchAPITask, setShowFetchAPITask] = useAtom(showFetchAPITaskAtom);
  const productList = useAtomValue(productListAtom);
  const setIsLoading = useSetAtom(isLoadingAtom);
  const setNewProductList = useSetAtom(newProductListAtom);
  const setSearch = useSetAtom(searchAtom);

  const [category, setCategory] = useState<string>("name");
  const [sortType, setSortType] = useState<string>("asc");

  const debounce = (callback: (value: string) => void) => {
    let timer;

    return (search: string) => {
      clearTimeout(300);
      timer = setTimeout(() => callback(search), 300);
    };
  };

  const searchFunction = (value: string) => {
    setSearch(value);
    const copyProductList = productList;
    const newProductList = copyProductList.filter((item) => item.name.includes(value));

    setNewProductList(newProductList);
  };

  const onChange = debounce(searchFunction);

  const onClickSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (category === "name") {
        sortType === "asc"
          ? productList.sort((a, b) => a.name.localeCompare(b.name))
          : productList.sort((a, b) => b.name.localeCompare(a.name));
      }
      if (category === "price") {
        sortType === "asc"
          ? productList.sort((a, b) => a.price - b.price)
          : productList.sort((a, b) => b.price - a.price);
      }
      if (category === "stock") {
        sortType === "asc"
          ? productList.sort((a, b) => a.stock - b.stock)
          : productList.sort((a, b) => b.stock - a.stock);
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <>
      <div className="bg-black w-full md:w-1/4 p-2 flex flex-col justify-end items-center">
        {isEditOrDeleteButtonClicked ? (
          <div
            className="bg-white m-2 w-1/3 p-1 cursor-pointer text-center"
            onClick={() => setIsEditOrDeleteButtonClicked(false)}
          >
            Batal
          </div>
        ) : (
          <>
            <div className="flex flex-col">
              <div className="my-3">
                <div
                  className="bg-white m-2 p-1 cursor-pointer text-center"
                  onClick={() => setShowFetchAPITask(!showFetchAPITask)}
                >
                  {showFetchAPITask ? "Hide" : "Show"} Fetch API Task
                </div>
              </div>
              <div className="flex gap-2 items-center my-4">
                <p className="text-white">Cari</p>
                <input
                  className="border-black border-2 p-1"
                  type="text"
                  onInput={(event) => onChange(event.currentTarget.value)}
                />
              </div>
              <label className="text-white" htmlFor="category">
                Diurutkan berdasarkan
              </label>
              <div className="flex gap-1">
                <select
                  className="w-1/2"
                  id="category"
                  name="category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                >
                  {categories.map((choice) => (
                    <option key={choice.value} value={choice.value}>
                      {choice.name}
                    </option>
                  ))}
                </select>
                <select
                  className="w-1/2"
                  id="category1"
                  name="category1"
                  value={sortType}
                  onChange={(event) => setSortType(event.target.value)}
                >
                  {sortTypes.map((choice) => (
                    <option key={choice.value} value={choice.value}>
                      {choice.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="my-3">
              <div className="bg-white m-2 p-1 cursor-pointer text-center" onClick={onClickSave}>
                Simpan
              </div>
            </div>
            <div
              className="bg-white m-2 w-1/3 p-1 cursor-pointer text-center"
              onClick={onClickAddModal}
            >
              Tambah Produk
            </div>
            <div
              className="bg-white m-2 w-1/3 p-1 cursor-pointer text-center"
              onClick={onClickEditModal}
            >
              Edit Produk
            </div>
            <div
              className="bg-white m-2 w-1/3 p-1 cursor-pointer text-center"
              onClick={onClickDeleteModal}
            >
              Hapus Produk
            </div>
          </>
        )}
      </div>
    </>
  );
}
