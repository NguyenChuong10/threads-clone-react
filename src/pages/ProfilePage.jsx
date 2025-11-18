import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { BarChart3, UserPlus, Edit3, ArrowLeft } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Heart, MessageCircle, RotateCwSquare, Send, Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";


function PostItem({ post, username, onClick }) {
  return (
    <div 
      className="flex w-full bg-black gap-5 p-4 border-b border-gray-800 cursor-pointer hover:bg-gray-900 transition"
      onClick={onClick}
    >
      <div className="relative flex w-15 h-15 bg-black items-center justify-center">
        <Avatar className="w-10 h-10">
          <AvatarImage src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&fit=crop" />
          <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <Plus className="absolute bottom-3 right-0 w-4 h-4 text-black bg-white rounded-full" />
      </div>
      
      <div className="flex flex-col flex-1 gap-2">
        <span className="text-white pt-4 flex gap-2">
          @{username} <p className="text-gray-400">2h</p>
        </span>
        <span className="text-white font-semibold">{post.title}</span>
        <span className="text-gray-300 text-sm">{post.body}</span>
        
        <div className="flex flex-wrap items-center gap-0">
          <Button size="sm" className="bg-black" onClick={(e) => e.stopPropagation()}>
            <Heart /><p>245</p>
          </Button>
          <Button size="sm" className="bg-black" onClick={(e) => e.stopPropagation()}>
            <MessageCircle /><p>52</p>
          </Button>
          <Button size="sm" className="bg-black" onClick={(e) => e.stopPropagation()}>
            <RotateCwSquare /><p>38</p>
          </Button>
          <Button size="sm" className="bg-black" onClick={(e) => e.stopPropagation()}>
            <Send /><p>15</p>
          </Button>
        </div>
      </div>
      
      <div className="text-white ml-auto">
        <Button size="sm" className="bg-black" onClick={(e) => e.stopPropagation()}>
          <Ellipsis />
        </Button>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { username } = useParams(); 
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('threads');
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: 'threads', label: 'Thread' },
    { id: 'replies', label: 'Thread trả lời' },
    { id: 'media', label: 'File phương tiện' },
    { id: 'reposts', label: 'Bài đăng lại' }
  ];

  // Fetch user info
  useEffect(() => {
    setLoading(true);
    const userId = 1; 
    
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("User:", data);
        setUser(data);
      })
      .catch((error) => console.error('Error fetching user:', error))
      .finally(() => setLoading(false));
  }, [username]);

  // Fetch user posts
  useEffect(() => {
    const userId = 1;
    
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Posts:", data);
        setPosts(data);
      })
      .catch((error) => console.error('Error fetching posts:', error));
  }, [username]);

  // Handle post click
  const handlePostClick = (post) => {
    navigate(`/${username}/post/${post.id}`);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <div className="text-white text-xl">Đang tải...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <div className="text-white text-xl">Không tìm thấy người dùng</div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
   
      {/* ========== MOBILE VIEW ========== */}
      <div className="block md:hidden mt-12">
        {/* Profile Info */}
        <div className="px-4 pb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
              <p className="text-gray-400">@{username || user.username}</p>
            </div>
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-700">
              <img 
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&fit=crop"
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Bio */}
          {user.company && (
            <p className="text-gray-300 mb-4">{user.company.catchPhrase}</p>
          )}

          {/* Followers */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex -space-x-2">
              <div className="w-7 h-7 rounded-full bg-gray-700 border-2 border-black overflow-hidden">
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="w-7 h-7 rounded-full bg-gray-700 border-2 border-black overflow-hidden">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="w-7 h-7 rounded-full bg-gray-700 border-2 border-black overflow-hidden">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop" alt="" className="w-full h-full object-cover" />
              </div>
            </div>
            <button className="text-gray-300 hover:text-white transition text-sm">
              179 người theo dõi
            </button>
            <button className="ml-auto p-2 hover:bg-gray-900 rounded-lg transition">
              <BarChart3 size={20} />
            </button>
          </div>

          {/* Edit Profile Button */}
          <button className="w-full py-3 border border-gray-700 rounded-xl font-semibold hover:bg-gray-900 transition">
            Chỉnh sửa trang cá nhân
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-800">
          <div className="flex">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 text-sm font-medium transition relative ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-6">
          {activeTab === 'threads' && (
            <>
              {/* Quick Post */}
              <div className="flex items-center gap-3 pb-6 border-b border-gray-800 mb-6">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700">
                  <img 
                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&fit=crop"
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-gray-500 flex-1">Có gì mới?</span>
                <button className="px-6 py-2 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition">
                  Đăng
                </button>
              </div>

              {/* Posts List */}
              {posts.length > 0 ? (
                <div className="-mx-4">
                  {posts.map((post) => (
                    <PostItem 
                      key={post.id} 
                      post={post} 
                      username={username || user.username}
                      onClick={() => handlePostClick(post)}
                    />
                  ))}
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Hoàn tất trang cá nhân</h2>
                    <span className="text-gray-400">Còn 2</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 flex flex-col items-center text-center">
                      <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                        <UserPlus size={32} className="text-white" />
                      </div>
                      <h3 className="font-semibold mb-2 text-base">Theo dõi 10 trang</h3>
                      <p className="text-gray-400 text-xs mb-4 leading-relaxed">
                        Hãy lập đầy bảng feed bằng những thread bạn quan tâm.
                      </p>
                      <button className="w-full py-2.5 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition text-sm">
                        Bắt đầu
                      </button>
                    </div>

                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 flex flex-col items-center text-center">
                      <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                        <Edit3 size={32} className="text-white" />
                      </div>
                      <h3 className="font-semibold mb-2 text-base">Thêm tiểu sử</h3>
                      <p className="text-gray-400 text-xs mb-4 leading-relaxed">
                        Hãy giới thiệu về bản thân và cho mọi người biết bạn thích gì.
                      </p>
                      <button className="w-full py-2.5 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition text-sm">
                        Thêm
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab !== 'threads' && (
            <div className="text-center py-12 text-gray-500">
              Nội dung {tabs.find(t => t.id === activeTab)?.label} sẽ hiển thị ở đây
            </div>
          )}
        </div>
      </div>

      {/* ========== DESKTOP VIEW ========== */}
      <div className="hidden md:flex md:justify-center min-h-screen py-6">
        <div className="w-full max-w-2xl max-h-screen overflow-y-auto bg-zinc-900 rounded-2xl">
          {/* Header with Back Button */}
          <div className="sticky top-0 z-10 flex items-center gap-4 px-6 py-4 border-b border-gray-800 bg-zinc-900">
            <button 
              className="text-white hover:bg-gray-800 p-2 rounded-full transition"
              onClick={() => window.history.back()}
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-xl font-bold">Trang cá nhân chương 2ae</h1>
              <p className="text-sm text-gray-400">{posts.length} bài đăng</p>
            </div>
          </div>

          {/* Profile Header */}
          <div className="px-6 py-6 border-b border-gray-800">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1 pr-6">
                <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                <p className="text-gray-400 mb-4">@{username || user.username}</p>
                
                {/* Bio */}
                {user.company && (
                  <p className="text-gray-300 mb-4">{user.company.catchPhrase}</p>
                )}

                {/* Followers */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-700 border-2 border-zinc-900 overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-700 border-2 border-zinc-900 overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-700 border-2 border-zinc-900 overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop" alt="" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <button className="text-gray-300 hover:text-white transition">
                    179 người theo dõi
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="px-6 py-2.5 border border-gray-700 rounded-xl font-semibold hover:bg-gray-800 transition">
                    Chỉnh sửa trang cá nhân
                  </button>
                  <button className="p-2.5 border border-gray-700 rounded-xl hover:bg-gray-800 transition">
                    <BarChart3 size={20} />
                  </button>
                </div>
              </div>

              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&fit=crop"
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="sticky top-[73px] z-10 border-b border-gray-800 bg-zinc-900">
            <div className="flex px-6">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-4 text-sm font-medium transition relative ${
                    activeTab === tab.id
                      ? 'text-white'
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div>
            {activeTab === 'threads' && (
              <>
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <PostItem 
                      key={post.id} 
                      post={post} 
                      username={username || user.username}
                      onClick={() => handlePostClick(post)}
                    />
                  ))
                ) : (
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold">Hoàn tất trang cá nhân</h2>
                      <span className="text-gray-400">Còn 2</span>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 flex flex-col items-center text-center">
                        <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mb-6">
                          <UserPlus size={36} className="text-white" />
                        </div>
                        <h3 className="font-semibold mb-3 text-lg">Theo dõi 10 trang</h3>
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                          Hãy lập đầy bảng feed bằng những thread bạn quan tâm.
                        </p>
                        <button className="w-full py-3 bg-white text-black rounded-xl font-semibold hover:bg-gray-200 transition">
                          Bắt đầu
                        </button>
                      </div>

                      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 flex flex-col items-center text-center">
                        <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mb-6">
                          <Edit3 size={36} className="text-white" />
                        </div>
                        <h3 className="font-semibold mb-3 text-lg">Thêm tiểu sử</h3>
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                          Hãy giới thiệu về bản thân và cho mọi người biết bạn thích gì.
                        </p>
                        <button className="w-full py-3 bg-white text-black rounded-xl font-semibold hover:bg-gray-200 transition">
                          Thêm
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {activeTab !== 'threads' && (
              <div className="text-center py-16 text-gray-500">
                Nội dung {tabs.find(t => t.id === activeTab)?.label} sẽ hiển thị ở đây
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}