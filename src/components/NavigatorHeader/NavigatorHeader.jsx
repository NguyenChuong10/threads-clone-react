import { Link } from 'react-router';
import '../NavigatorHeader/NavigatorHeader.css';
import logo from './images/Threadswhite.png';
import { Menu, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

function NavigatorHeader() {
    const [isopenMenu, setisopenMenu] = useState(false);

    const handleopenMenu = () => {
        setisopenMenu(!isopenMenu);
    }

    const handlecloseMenu = () => {
        setisopenMenu(false);
    }

    return (
        <div className='fixed top-0 left-0 right-0 flex w-full h-[50px] justify-center bg-black md:hidden z-40'>
            <ArrowLeft className='text-white items-center absolute top-3 left-1' />
            <Link to="/" className="w-[50px] h-[50px]">
                <img src={logo} alt="LogoThreads" />
            </Link>
            <button className='text-white items-center absolute top-3 right-1 z-50' onClick={handleopenMenu}>
                <Menu className='text-white' />
            </button>

            {isopenMenu && (
                <>
                    <div
                        className='fixed inset-0 top-[50px] bg-opacity-50 z-40'
                        onClick={handlecloseMenu}
                    />
                    <ul className='fixed text-white top-[50px] right-0 bg-stone-700 rounded-lg shadow-lg p-4 w-48 flex flex-col z-50'>
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
        </div>
    );
}

export default NavigatorHeader;