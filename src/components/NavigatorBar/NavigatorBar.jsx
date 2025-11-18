import paths from "../config/Path.js";
import { useState } from "react";
import { NavLink, useLocation } from "react-router";
const listNav = [
    {
        path: paths.home,
        title: " Dành cho bạn ",
        key: "foryou"
    },
    {
        path: paths.following,
        title: " Đang theo dõi",
        key: "following"
    },
    {
        path: paths.canncelfollowing,
        title: "Bài viết tự huỷ",
        key: "canncelpost",
        desktopOnly:true
    },
];


function NavigatorBar() {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(location.pathname === paths.following ? "following" : "foryou");

    const renderItems = () => {
        return listNav.map((item) => {
            return (
                <div 
                    key={item.key}
                    className={item.desktopOnly ? "hidden md:block" : " "}
                >
                    <NavLink to={item.path}>
                        <button
                            onClick={() => setActiveTab(item.key)}
                            className="relative py-4 px-6"
                        >
                            <span className={`relative inline-block ${activeTab === item.key ? 'text-white' : 'text-gray-500'}`}>
                                {item.title}
                                <div className={`absolute bottom-[-16px] left-0 right-0 h-[2px] bg-white transition-transform duration-300 ${activeTab === item.key ? 'scale-x-100' : 'scale-x-0'
                                    }`}></div>
                            </span>
                        </button>
                    </NavLink>
                </div>

            );
        })
    }




    {/* thiết kế đường dẫn  */ }

    return (
        <div className="w-full h-full bg-black mt-[50px] md-hidden md:flex md:justify-center md:gap-10 md:w-full md:h-full md:mt-auto ">
            <div className="flex justify-around h-15 items-center relative border-b border-gray-800 z-10 ">
                {renderItems()}
            </div>
        </div>

    );
}

export default NavigatorBar;