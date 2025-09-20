export default function Loading() {
  return (
    <>
      <div className="bg-black w-full h-full opacity-50 absolute z-50" />
      <div className="fixed z-40 w-1/3 md:w-1/12 h-1/12 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4">
        <div className="bg-white p-1 text-center">
          <p className="my-2">Loading....</p>
        </div>
      </div>
    </>
  );
}
