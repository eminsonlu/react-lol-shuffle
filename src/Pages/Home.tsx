import { Link } from "react-router-dom";
import { useStore } from "../Store";

function App() {
  const { state, dispatch } = useStore();

  return (
    <>
      {state.groups.groups ? (
        <></>
      ) : (
        <div className="text-[#cecece] flex-col items-center gap-4 flex">
          <p>Herhangi bir grup bulunamadı.</p>
          <Link
            to={"/group"}
            onClick={() =>
              dispatch({ type: "SET_GROUP", payload: { groups: true } })
            }
            className="group relative px-4 py-2 bg-gray-300 text-black cursor-pointer"
          >
            <p className="font-semibold group-hover:text-red-800 transition-all">
              Grup Oluşturmak İster Misin?
            </p>
            <span className="w-0 group-hover:w-full h-[3px] absolute top-0 left-0 bg-orange-700 origin-top-left transition-all duration-300"></span>
            <span className="w-0 group-hover:w-full h-[3px] absolute bottom-0 right-0 bg-yellow-700 origin-top-right transition-all duration-300 delay-[600ms]"></span>
            <span className="h-0 group-hover:h-full w-[3px] absolute left-0 bottom-0 bg-red-700 origin-top-left transition-all duration-300 delay-[900ms]"></span>
            <span className="h-0 group-hover:h-full w-[3px] absolute right-0 top-0 bg-green-700 origin-top-left transition-all duration-300 delay-300"></span>
          </Link>
        </div>
      )}
    </>
  );
}

export default App;
