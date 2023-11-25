import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div className="h-screen bg-[#111112] flex justify-center items-center text-white relative overflow-hidden">
            <div className="max-w-[20rem] aspect-[5/2] absolute top-12 left-1/2 -translate-x-1/2">
                <img
                    src="https://upload.wikimedia.org/wikipedia/tr/7/77/League_of_Legends_logo.png"
                    alt="lol-logo"
                    className="w-full h-full object-contain"
                />
            </div>
            <a
                target={"_blank"}
                rel="noreferrer"
                href="https://github.com/eminsonlu"
                className="absolute bottom-4 left-4 underline"
            >
                Eiben
            </a>
            <Outlet />
        </div>
    );
};

export default Layout;
