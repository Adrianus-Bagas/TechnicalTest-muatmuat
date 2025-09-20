export default function ModalConfirmation({
  onOk,
  onCancel,
}: {
  onOk: () => void;
  onCancel: () => void;
}) {
  return (
    <>
      <div className="bg-black w-full h-full opacity-50 absolute z-30" />
      <div className="fixed z-40 w-1/4 h-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4">
        <div className="bg-white p-2 text-center">
          <p className="my-2">Apakah anda yakin?</p>
          <div className="flex justify-center items-center gap-2">
            <div className="bg-black text-white p-2 cursor-pointer w-fit" onClick={onOk}>
              Ya
            </div>
            <div className="bg-black text-white p-2 cursor-pointer w-fit" onClick={onCancel}>
              Tidak
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
