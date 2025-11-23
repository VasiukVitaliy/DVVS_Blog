export default function LogRegWindow({Element}) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col min-w-[40%] max-w-[90%] p-5 rounded-md bg-white shadow-md">
        {Element}
      </div>
    </div>
  );
}
