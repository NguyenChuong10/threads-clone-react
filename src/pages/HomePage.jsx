import { useState, useEffect } from "react";
import { useNavigate } from "react-router"; // Thêm useNavigate
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Heart, MessageCircle, RotateCwSquare, Send, Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import "./HomePage.css"
import "./reset.css"
import NavigatorBar from "../components/NavigatorBar/NavigatorBar";

const listUser = [
    {
        avatar: "https://i.pravatar.cc/150?img=1",
        username: "Nguyễn Văn An",
        timeago: "2 phút trước",
        metrics: {
            likes: 245,
            comments: 52,
            reposts: 38,
            shares: 15,
            timeago: "2h"
        }
    },
    {
        avatar: "https://i.pravatar.cc/150?img=2",
        username: "Trần Thị Bình",
        timeago: "15 phút trước",
        metrics: {
            likes: 89,
            comments: 23,
            reposts: 12,
            shares: 8,
            timeago: "1h"
        }
    },

];

function HomePage() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate(); // Thêm navigate hook

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setPosts(data);
            })
            .catch((error) =>
                console.error('Error:', error),
            )
    }, []);

    // Hàm xử lý click vào post
    const handlePostClick = (post, user) => {
        // Tạo username từ tên user (loại bỏ dấu cách, chuyển thành lowercase)
        const username = user.username.toLowerCase().replace(/\s+/g, '');
        navigate(`/${username}/post/${post.id}`);
    };

    const RenderMobile = ({ post, user }) => {
        return (
            <div 
                className="flex w-full h-full bg-black md-hidden gap-5 md:hidden cursor-pointer hover:bg-gray-900 transition-colors"
                onClick={() => handlePostClick(post, user)} // Truyền cả post và user
            >
                <div className="relative flex w-15 h-15 bg-black items-center justify-center" >
                    <Avatar className="w-10 h-10">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Plus className="absolute bottom-3 right-0 w-4 h-4 text-black bg-white rounded-full " />
                </div>
                <div className="flex">
                    <div className="flex flex-col gap-2">
                        <span className="text-white pt-4 flex gap-2" >{user.username} <p className="text-gray-400">{user.metrics.timeago}</p></span>
                        <span className="text-white">{post.title}</span>
                        <span className="text-white">{post.body} </span>
                        <div className="flex flex-wrap items-center gap-0 md:flex-row ">
                            <Button 
                                size="sm" 
                                aria-label="Submit" 
                                className="bg-black"
                                onClick={(e) => e.stopPropagation()} // Ngăn navigate khi click button
                            >
                                <Heart /><p>{user.metrics.likes}</p>
                            </Button>
                            <Button 
                                size="sm" 
                                aria-label="Submit" 
                                className="bg-black"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <MessageCircle /><p>{user.metrics.comments}</p>
                            </Button>
                            <Button 
                                size="sm" 
                                aria-label="Submit" 
                                className="bg-black"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <RotateCwSquare /><p>{user.metrics.reposts}</p>
                            </Button>
                            <Button 
                                size="sm" 
                                aria-label="Submit" 
                                className="bg-black"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Send /><p>{user.metrics.shares}</p>
                            </Button>
                            <Separator></Separator>
                        </div>
                    </div>
                </div>
                <div className="text-white ml-auto">
                    <Button 
                        size="sm" 
                        aria-label="Submit" 
                        className="bg-black"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Ellipsis />
                    </Button>
                </div>
            </div>
        )
    }

    const RenderDesktop = ({ post, user }) => {
        return (
            <>
                <div 
                    className="flex w-full h-50 bg-black gap-5 cursor-pointer hover:bg-gray-900 transition-colors"
                    onClick={() => handlePostClick(post, user)} // Truyền cả post và user
                >
                    <div className="relative flex w-15 h-15 bg-black items-center justify-center" >
                        <Avatar className="w-10 h-10">
                            <AvatarImage src={user.avatar}/>
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <Plus className="absolute bottom-3 right-0 w-4 h-4 text-black bg-white rounded-full " />
                    </div>
                    <div className="flex ">
                        <div className="flex flex-col gap-2">
                            <span className="text-white pt-4 flex gap-2" >{user.username} <p className="text-gray-400">{user.metrics.timeago}</p></span>
                            <span className="text-white">{post.title}</span>
                            <span className="text-white">{post.body}</span>
                            <div className="flex flex-wrap items-center gap-0 md:flex-row ">
                                <Button 
                                    size="sm" 
                                    aria-label="Submit" 
                                    className="bg-black"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Heart /><p>{user.metrics.likes}</p>
                                </Button>
                                <Button 
                                    size="sm" 
                                    aria-label="Submit" 
                                    className="bg-black"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <MessageCircle /><p>{user.metrics.comments}</p>
                                </Button>
                                <Button 
                                    size="sm" 
                                    aria-label="Submit" 
                                    className="bg-black"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <RotateCwSquare /><p>{user.metrics.reposts}</p>
                                </Button>
                                <Button 
                                    size="sm" 
                                    aria-label="Submit" 
                                    className="bg-black"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Send /><p>{user.metrics.shares}</p>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="text-white ml-auto">
                        <Button 
                            size="sm" 
                            aria-label="Submit" 
                            className="bg-black"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Ellipsis />
                        </Button>
                    </div>
                </div>
                <div className="w-full border-b-2 border-white"></div>
            </>
        )
    }

    return (
        <>
            <div className="h-screen flex flex-col overflow-y-auto flex-1 bg-black">
                <NavigatorBar />
                {/* Thiết kế bài đăng */}
                {/* Thiết kế trang giao diện hiện trên mobile ẩn trên desktop */}
                <div className="block md:hidden" >
                    <ul>
                        {posts.map((post, index) => {
                            const user = listUser[index % listUser.length];
                            return (
                                <li key={`mobile-${post.id}`}>
                                    <RenderMobile post={post} user={user} />
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Thiết kế giao diện desktop và ẩn đi mobile  */}
                <div className="hidden md:block md:max-w-2xl md:mx-auto lg:max-w-2xl h-200 bg-[#22201f] rounded-2xl md:relative ">
                    <ul>
                        {posts.map((post, index) => {
                            const user = listUser[index % listUser.length];
                            return (
                                <li key={`desktop-${post.id}`}>
                                    <RenderDesktop post={post} user={user} />
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default HomePage;