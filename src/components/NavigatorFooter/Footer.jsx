import { Button } from '@/components/ui/button';
import { House, Search, Plus, Heart, User , AtSign , Menu} from 'lucide-react';
import { NavLink } from "react-router";
import { useState } from 'react';


import Paths from '../NavigatorFooter/config/Paths';

const listNavFooter = [
    {
        id: 1,
        path: Paths.home,
        icon: House
    },
    {
        id: 2,
        path: Paths.search,
        icon: Search
    },
    {
        id: 3,
        path: Paths.addPost,
        icon: Plus
    },
    {
        id: 4,
        path: Paths.feedscreen,
        icon: Heart
    },
    {
        id: 5,
        path: Paths.profilepage,
        icon: User
    },

]

function Footer() {
    const [activeIcon, setActiveIcon] = useState(1);

    const [isopenMenu, setisopenMenu] = useState(false);

    const handleopenMenu = () => {
        setisopenMenu(!isopenMenu);
    }

    const handlecloseMenu = () => {
        setisopenMenu(false);
    }

    const renderNav = () => {
        return listNavFooter.map((item) => {
            const IconItem = item.icon;
            return (
                <li key={item.id}>
                    <NavLink to={item.path} className="inline-flex">
                        <Button
                            onClick={() => setActiveIcon(item.id)}
                            variant="ghost"
                            aria-label="Home"
                            className="text-white hover:text-white/80"
                        >
                            <IconItem
                                className={`!h-8 !w-8 ${activeIcon === item.id ? 'text-white' : 'text-gray-400'}`}
                            />
                        </Button>
                    </NavLink>
                </li>
            )
        })
    }


    return (
        <nav className="fixed bottom-0 left-0 right-0 w-full h-[50px] bg-black  border-t border-gray-800 md:flex md:flex-col md: gap-10 md:top-0 md:bottom-auto md:right-auto md:w-[80px] md:h-full md:items-center " >
            <div className=' hidden md:flex md:w-full md:h-15 md:text-white md:justify-center md:items-center'>
                <AtSign size={32} />
            </div>
            <ul className=' flex justify-around items-center h-full max-w-screen-xl mx-auto px-2 md:flex-col md:justify-center md:gap-4 md:pt-8' >
                {renderNav()}
            </ul>
            <button className=' hidden md:flex md:w-full md:h-15 md:text-white md:justify-center md:items-center' onClick={handleopenMenu}>
                <Menu size={32} />
            </button>
            {isopenMenu && (
                <>
                    <div
                        className='fixed inset-0 top-[50px] bg-opacity-50 z-40'
                        onClick={handlecloseMenu}
                    />
                    <ul className='fixed text-white bottom-[30px] left-20 bg-stone-700 rounded-lg shadow-lg p-4 w-48 flex flex-col z-50'>
                        <li className='menu-item-base'>Giao diện</li>
                        <li className='menu-item-base'>Thông tin chi tiết</li>
                        <li className='menu-item-base'>Cài đặt</li>
                        <li className='menu-item-base'>Bảng feed</li>
                        <li className='menu-item-base'>Đã lưu</li>
                        <li className='menu-item-base'>Đã thích</li>
                        <li className='menu-item-base'>Báo cáo sự cố</li>
                        <li className='menu-item-base text-red-500'>Đăng xuất</li>
                    </ul>
                </>
            )}
        </nav>
    );
}

export default Footer;