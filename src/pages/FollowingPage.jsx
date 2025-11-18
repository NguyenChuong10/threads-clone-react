
import { useEffect } from "react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Heart, MessageCircle, RotateCwSquare, Send, Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import NavigatorBar from "../components/NavigatorBar/NavigatorBar";


function FollowingPage() {

    const [followings, setFollowings] = useState([]);

    useEffect(() => {
        fetch("https://raw.githubusercontent.com/NguyenChuong10/json/refs/heads/main/threads_following_20_users_1763130411945.json")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setFollowings(data.data.user.following);
            })
            .catch((error) =>
                console.error('Error:', error),
            )

    }, []);

    const RenderMobile = ({ following }) => {
        return (
            <>
                <div className=" flex w-full h-full bg-black md-hidden gap-5 md:hidden ">
                    <div className=" relative flex w-15 h-15 bg-black items-center justify-center" >
                        <Avatar className="w-10 h-10">
                            <AvatarImage src={following.profile_pic_url} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <Plus className="absolute bottom-3 right-0 w-4 h-4 text-black bg-white rounded-full " />
                    </div>
                    <div className="flex">
                        <div className="flex flex-col gap-2">
                            <span className="text-white pt-4">{following.full_name}</span>
                            <span className="text-white">{following.bio}</span>
                            <span className="text-white">{following.title} </span>
                            <div className="flex flex-wrap items-center gap-0 md:flex-row ">
                                <Button size="sm" aria-label="Submit" className="bg-black">
                                    <Heart /><p>{following.metrics.likes}</p>
                                </Button>
                                <Button size="sm" aria-label="Submit" className="bg-black">
                                    <MessageCircle /><p>{following.metrics.comments}</p>
                                </Button>
                                <Button size="sm" aria-label="Submit" className="bg-black">
                                    <RotateCwSquare /><p>{following.metrics.reposts}</p>
                                </Button>
                                <Button size="sm" aria-label="Submit" className="bg-black ">
                                    <Send /><p>{following.metrics.shares}</p>
                                </Button>
                            </div>
                            <Separator></Separator>
                        </div>
                    </div>
                    <div className="text-white ml-auto">
                        <Button size="sm" aria-label="Submit" className="bg-black ">
                            <Ellipsis />
                        </Button>
                    </div>
                </div>
            </>
        );
    }

const RenderDesktop = ({following}) => {
    return(
       <> 
        <div className=" flex w-full h-50 bg-black gap-5 ">
                <div className=" relative flex w-15 h-15 bg-black items-center justify-center" >
                    <Avatar className="w-10 h-10">
                        <AvatarImage src={following.profile_pic_url}/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Plus className="absolute bottom-3 right-0 w-4 h-4 text-black bg-white rounded-full " />
                </div>
                <div className="flex ">
                    <div className="flex flex-col gap-2">
                        <span className="text-white pt-4 flex gap-2" >{following.full_name} <p className="text-gray-400">{following.followed_at}</p></span>
                        <span className="text-white">{following.bio}</span>
                        <span className="text-white">{following.title}</span>
                        <div className="flex flex-wrap items-center gap-0 md:flex-row ">
                            <Button size="sm" aria-label="Submit" className="bg-black">
                                <Heart /><p>{following.metrics.likes}</p>
                            </Button>
                            <Button size="sm" aria-label="Submit" className="bg-black">
                                <MessageCircle /><p>{following.metrics.comments}</p>
                            </Button>
                            <Button size="sm" aria-label="Submit" className="bg-black">
                                <RotateCwSquare /><p>{following.metrics.reposts}</p>
                            </Button>
                            <Button size="sm" aria-label="Submit" className="bg-black ">
                                <Send /><p>{following.metrics.shares}</p>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="text-white ml-auto">
                    <Button size="sm" aria-label="Submit" className="bg-black ">
                        <Ellipsis />
                    </Button>
                </div>
            </div>
            <div className="w-full border-b-2 border-white"></div>
        </>
    );
}

    return (
        <>
            <div className="h-screen flex flex-col overflow-y-auto flex-1 bg-black">
                <NavigatorBar />
                <div className="block md:hidden" >
                    <ul>
                        {followings.map((following) => {
                            return (
                                <li key={`mobile-${following.id}`}>
                                    <RenderMobile following={following}/>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className=" hidden md:block md:max-w-2xl md:mx-auto lg:max-w-2xl h-200 bg-[#22201f] rounded-2xl md:relative ">
                        <ul>
                            {followings.map((following)=>{
                                
                                return(
                                    <li key={`desktop-${following.id}`}>
                                        <RenderDesktop following={following}  />
                                    </li>
                                )

                            })}
                        </ul>
                </div>
            </div>
        </>
    );
}

export default FollowingPage;