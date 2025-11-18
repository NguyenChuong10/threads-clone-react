import React, { useState } from 'react';
import { Heart, MessageCircle, Repeat2, Send } from 'lucide-react';

export default function ActivityFeed() {
  const [activeTab, setActiveTab] = useState('all');

  const activities = [
    {
      id: 1,
      type: 'multi-like',
      users: ['user1', 'user2', 'user3', 'user4', 'user5'],
      username: 'trangngoc09',
      otherCount: 5,
      time: '10 giờ',
      content: 'từ nay tôi sẽ sử dụng threads như một nhật ký',
      date: '23/11',
      hasLike: true
    },
    {
      id: 2,
      type: 'like',
      username: 'haphuong.vu.52831',
      time: '1 ngày',
      content: 'aniversary',
      hasLike: true,
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
      id: 3,
      type: 'like',
      username: 'haphuong.vu.52831',
      time: '1 ngày',
      content: 'Đã thích thread của bạn',
      hasLike: true,
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
      id: 4,
      type: 'post',
      username: 'kpt9_1',
      time: '4 ngày',
      label: 'Thread gợi ý',
      content: 'nhìn mận nguyên vl 🥺',
      stats: { likes: '1K', comments: 45, reposts: 19, shares: 8 },
      avatar: 'https://i.pravatar.cc/150?img=8'
    },
    {
      id: 5,
      type: 'post',
      username: 'im.lambs',
      time: '1 tuần',
      label: 'Thread gợi ý',
      content: 'Nhanh thật, nay vẫn 28 mai đã là 29 tuổi rồi =))))))',
      stats: { likes: '30', comments: 5, reposts: 1, shares: 0 },
      avatar: 'https://i.pravatar.cc/150?img=9'
    },
    {
      id: 6,
      type: 'follow',
      username: 'dwong.303',
      time: '1 tuần',
      content: 'Gợi ý theo dõi',
      hasFollowButton: true,
      avatar: 'https://i.pravatar.cc/150?img=10',
      hasBlueCheck: true
    }
  ];

  const tabs = [
    { id: 'all', label: 'Tất cả' },
    { id: 'follow', label: 'Lượt theo dõi' },
    { id: 'replies', label: 'Thread trả lời' },
    { id: 'mentions', label: 'Lượt nhắc' }
  ];

  // Component hiển thị từng activity
  const ActivityItem = ({ activity }) => {
    return (
      <div className="px-4 md:px-6 py-4 border-b border-gray-800 hover:bg-gray-900/50 transition">
        <div className="flex gap-3">
          {/* Avatar/Icon */}
          <div className="relative flex-shrink-0">
            {activity.type === 'multi-like' ? (
              <div className="flex">
                <div className="w-10 h-10 rounded-full bg-gray-700 border-2 border-black overflow-hidden">
                  <img src="https://i.pravatar.cc/150?img=2" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-700 border-2 border-black overflow-hidden -ml-3">
                  <img src="https://i.pravatar.cc/150?img=3" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-700 border-2 border-black overflow-hidden -ml-3">
                  <img src="https://i.pravatar.cc/150?img=4" alt="" className="w-full h-full object-cover" />
                </div>
              </div>
            ) : (
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-700 overflow-hidden">
                <img
                  src={activity.avatar || `https://i.pravatar.cc/150?img=${activity.id}`}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {activity.hasLike && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center border-2 border-black">
                <Heart size={12} fill="white" className="text-white" />
              </div>
            )}

            {activity.hasBlueCheck && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-black">
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-semibold text-white">{activity.username}</span>
                  {activity.otherCount && (
                    <span className="text-gray-400">và {activity.otherCount} người khác</span>
                  )}
                  <span className="text-gray-500 text-sm">{activity.time}</span>
                </div>

                {activity.label && (
                  <div className="text-gray-400 text-sm mb-1">{activity.label}</div>
                )}

                <div className="text-gray-300 text-sm md:text-base">
                  {activity.content}
                </div>

                {activity.date && (
                  <div className="text-gray-500 text-sm mt-1">{activity.date}</div>
                )}

                {/* Stats for posts */}
                {activity.stats && (
                  <div className="flex items-center gap-6 mt-3 text-gray-400">
                    <button className="flex items-center gap-2 hover:text-white transition">
                      <Heart size={20} />
                      <span className="text-sm">{activity.stats.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-white transition">
                      <MessageCircle size={20} />
                      <span className="text-sm">{activity.stats.comments}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-white transition">
                      <Repeat2 size={20} />
                      <span className="text-sm">{activity.stats.reposts}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-white transition">
                      <Send size={20} />
                      {activity.stats.shares > 0 && <span className="text-sm">{activity.stats.shares}</span>}
                    </button>
                  </div>
                )}
              </div>

              {/* Follow button */}
              {activity.hasFollowButton && (
                <button className="px-6 py-2 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition whitespace-nowrap text-sm">
                  Theo dõi lại
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Mobile View */}
      <div className="block md:hidden mt-12">
        {/* Tabs */}
        <div className="flex gap-2 px-4 py-3 border-b border-gray-800 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-full whitespace-nowrap transition ${activeTab === tab.id
                  ? 'bg-white text-black font-semibold'
                  : 'bg-transparent text-gray-400 hover:text-white'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Activity List */}
        <div className="divide-y divide-gray-800">
          {activities.map(activity => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex md:justify-center min-h-screen">
        <div className="w-full max-w-2xl bg-zinc-900 rounded-2xl my-6 overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 bg-zinc-900 border-b border-gray-800 z-10">
            <h1 className="text-2xl font-bold px-6 py-4 text-white">Hoạt động</h1>

            {/* Tabs Desktop */}
            <div className="flex gap-2 px-6 pb-3 overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2 rounded-full whitespace-nowrap transition ${activeTab === tab.id
                      ? 'bg-white text-black font-semibold'
                      : 'bg-transparent text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Activity List Desktop */}
          <div className="divide-y divide-gray-800">
            {activities.map(activity => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>

          {/* Load More */}
          <div className="p-6 text-center">
            <button className="text-gray-400 hover:text-white transition">
              Xem thêm hoạt động
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}