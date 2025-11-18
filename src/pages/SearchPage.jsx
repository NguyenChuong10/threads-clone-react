import { Search, SlidersHorizontal, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function SearchPage() {
    const [searchText, setSearchText] = useState("");

    const suggestions = [
        {
            id: 1,
            username: "quan.phamanh",
            displayName: "Quân A.P",
            verified: true,
            followers: "606K người theo dõi",
            contact: "For work: 0933783639 - Mr. Quyền\n📧: quanap.240197@gmail.com",
            avatar: "https://i.pravatar.cc/150?img=33"
        },
        {
            id: 2,
            username: "soobin.hoangson",
            displayName: "Sơn Hoàng Nguyễn",
            verified: true,
            followers: "494K người theo dõi",
            avatar: "https://i.pravatar.cc/150?img=12"
        },
        {
            id: 3,
            username: "_chubee28_",
            displayName: "_Chubee🐝_",
            verified: false,
            followers: "311 người theo dõi",
            bio: "🐷🐷",
            avatar: "https://i.pravatar.cc/150?img=45"
        },
        {
            id: 4,
            username: "betien.999",
            displayName: "Tiên Tiên",
            verified: false,
            followers: "2.817 người theo dõi",
            bio: "Người ta mượn rượu tỏ tình\nEm không mượn rượu vẫn dư trịnh của anh ...😎\nViber (0365804619)",
            avatar: "https://i.pravatar.cc/150?img=25"
        }
    ];

    const RenderMobile = (user) => {
        return (
            <div className="flex items-start gap-3 py-4">
                {/* Avatar */}
                <img
                    src={user.avatar}
                    alt={user.displayName}
                    className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                />

                {/* User Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="font-semibold text-base text-white">{user.username}</span>
                        {user.verified && (
                            <div className="w-4 h-4 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0">
                                <Check className="w-3 h-3 text-white" strokeWidth={3} />
                            </div>
                        )}
                    </div>
                    <p className="text-zinc-400 text-sm mb-2">{user.displayName}</p>

                    {user.contact && (
                        <p className="text-sm text-white mb-2 whitespace-pre-line">
                            {user.contact}
                        </p>
                    )}

                    {user.bio && (
                        <p className="text-sm text-white mb-2 whitespace-pre-line">
                            {user.bio}
                        </p>
                    )}

                    <p className="text-zinc-500 text-sm">{user.followers}</p>
                </div>

                {/* Follow Button */}
                <Button
                    className="bg-transparent border-2 border-zinc-700 text-white hover:bg-zinc-800 font-medium px-8 py-2 h-auto rounded-lg flex-shrink-0 text-base"
                >
                    Theo dõi
                </Button>
            </div>
        );
    };

    const RenderDesktop = (user) => {
        return (
            <div className="flex items-start gap-4 py-5 px-6 border-b border-zinc-800">
                {/* Avatar */}
                <img
                    src={user.avatar}
                    alt={user.displayName}
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                />

                {/* User Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-lg text-white">{user.username}</span>
                        {user.verified && (
                            <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0">
                                <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                            </div>
                        )}
                    </div>
                    <p className="text-zinc-400 text-base mb-2">{user.displayName}</p>

                    {user.contact && (
                        <p className="text-sm text-white mb-2 whitespace-pre-line">
                            {user.contact}
                        </p>
                    )}

                    {user.bio && (
                        <p className="text-sm text-white mb-2 whitespace-pre-line">
                            {user.bio}
                        </p>
                    )}

                    <p className="text-zinc-500 text-sm">{user.followers}</p>
                </div>

                {/* Follow Button */}
                <Button
                    className="bg-transparent border-2 border-zinc-700 text-white hover:bg-zinc-800 font-medium px-10 py-2.5 h-auto rounded-lg flex-shrink-0 text-base"
                >
                    Theo dõi
                </Button>
            </div>
        );
    };

    return (
        <div className="h-screen flex flex-col bg-black">
            {/* Mobile View */}
            <div className="block md:hidden flex-1 overflow-y-auto">
                {/* Search Bar */}
                <div className="sticky top-0 z-10 bg-black px-4 py-3">
                    <div className="flex items-center gap-3 bg-zinc-900 rounded-full px-4 py-2.5">
                        <Search className="w-5 h-5 text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-zinc-500"
                        />
                        <SlidersHorizontal className="w-5 h-5 text-zinc-400" />
                    </div>
                </div>

                {/* Suggestions Section */}
                <div className="px-4 py-3">
                    <div className="border border-yellow-500 rounded-lg px-4 py-2.5 mb-4">
                        <h2 className="text-lg font-medium text-white">Gợi ý theo dõi</h2>
                    </div>

                    {/* User List */}
                    <div className="space-y-0 divide-y divide-zinc-800">
                        {suggestions.map((user) => (
                            <RenderMobile key={user.id} {...user} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Desktop View */}
            <div className="hidden md:block flex-1 overflow-y-auto">
                <div className="max-w-2xl mx-auto bg-zinc-900 rounded-2xl my-6">
                    {/* Search Bar Desktop */}
                    <div className="sticky top-0 z-10 bg-zinc-900 px-6 pt-6 pb-4 rounded-t-2xl">
                        <div className="flex items-center gap-3 bg-zinc-800 rounded-full px-5 py-3">
                            <Search className="w-5 h-5 text-zinc-500" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-zinc-500 text-base"
                            />
                            <SlidersHorizontal className="w-5 h-5 text-zinc-400" />
                        </div>
                    </div>

                    {/* Suggestions Section Desktop */}
                    <div className="px-6 pb-6">
                        <div className="border border-yellow-500 rounded-lg px-5 py-3 mb-4">
                            <h2 className="text-xl font-medium text-white">Gợi ý theo dõi</h2>
                        </div>

                        {/* User List Desktop */}
                        <div className="bg-black rounded-lg overflow-hidden">
                            {suggestions.map((user) => (
                                <RenderDesktop key={user.id} {...user} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchPage;