import { IProductList } from "@/interfaces/product.interfaces";
import { alertMessageAtom, newProductListAtom, openAlertAtom, productListAtom, searchAtom } from "@/store/app.atom";
import { useAtomValue } from "jotai";

export default function ListComponent({onClickProductToEdit, isEditOrDeleteButtonClicked}:{onClickProductToEdit: (item: IProductList)=>void;isEditOrDeleteButtonClicked: boolean;}) {

    const productList = useAtomValue(productListAtom);
    const newProductList = useAtomValue(newProductListAtom);
    const openAlert = useAtomValue(openAlertAtom);
    const alertMessage = useAtomValue(alertMessageAtom);
    const search = useAtomValue(searchAtom);

    const rupiah = (number: number)=>{
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR"
        }).format(number);
      }

    return <>
    <div>
        {isEditOrDeleteButtonClicked && 
        <div className="bg-red-500 p-2 m-2">
          <p className="text-center text-lg">Pilih salah satu produk</p>
        </div>}
        {openAlert && 
        <div className="bg-green-500 p-2 m-2">
          <p className="text-center text-lg">{alertMessage}</p>
        </div>}
      <div className="grid grid-cols-2 md:grid-cols-3">
      {(search ? newProductList : productList).map((item)=>
        <div key={item.name} className={`bg-slate-500 m-2 p-2 flex items-center gap-2 w-fit ${isEditOrDeleteButtonClicked && 'cursor-pointer hover:opacity-50'}`} onClick={isEditOrDeleteButtonClicked ? () => onClickProductToEdit(item) : undefined}>
          <div className="bg-black w-10 h-10"></div>
          <div>
          <p className="w-3/4">{item.name ?? '-'}</p>
          <p>Rp {item.price ? rupiah(item.price) : '-'}</p>
          <p>Stok: {item.stock ?? '-'}</p>
          </div>
        </div>
      )}
      </div>
      </div>
    </>
}