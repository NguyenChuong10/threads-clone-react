import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Image, Film, Smile, List, FileText, MapPin } from 'lucide-react';

export default function NewThreadComposer() {
  const [threadText, setThreadText] = useState('');
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/');
  };

  const handlePost = () => {
    if (threadText.trim()) {
      alert('Thread đã được đăng!');
      setThreadText('');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-800">
        <button
          onClick={handleCancel}
          className="text-white hover:bg-gray-900 p-2 rounded-full transition"
        >
          <X size={24} />
        </button>
        
        <h1 className="text-lg font-semibold">Thread mới</h1>
        
        <div className="w-10" />
      </div>

      {/* MAIN CONTENT */}
      <div className="px-4 py-4">
        {/* User Profile và Textarea */}
        <div className="flex gap-3 mb-4">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold text-sm">C2</span>
          </div>
          
          {/* Nội dung */}
          <div className="flex-1">
            <div className="font-semibold mb-1">chuong2ae</div>
            
            <textarea
              value={threadText}
              onChange={(e) => setThreadText(e.target.value)}
              placeholder="Thêm chủ đề có gì mới?"
              className="w-full bg-transparent text-white placeholder-gray-500 outline-none resize-none text-base"
              rows={3}
            />
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex gap-4 ml-14 mb-4">
          <button className="text-gray-400 hover:text-white transition">
            <Image size={22} />
          </button>
          <button className="text-gray-400 hover:text-white transition">
            <Film size={22} />
          </button>
          <button className="text-gray-400 hover:text-white transition">
            <Smile size={22} />
          </button>
          <button className="text-gray-400 hover:text-white transition">
            <List size={22} />
          </button>
          <button className="text-gray-400 hover:text-white transition">
            <FileText size={22} />
          </button>
          <button className="text-gray-400 hover:text-white transition">
            <MapPin size={22} />
          </button>
        </div>

        {/* Add to Thread */}
        <div className="flex items-center gap-3 ml-14 mb-6">
          <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
            <span className="text-gray-400 text-xs">C</span>
          </div>
          <span className="text-gray-500">Thêm vào thread</span>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <div className="flex items-center gap-1">
              <div className="w-5 h-5 border border-gray-600 rounded flex items-center justify-center">
                <span className="text-xs">⚙</span>
              </div>
              <span>Các lựa chọn để kiểm soát câu trả lời</span>
            </div>
          </div>
          <button
            onClick={handlePost}
            disabled={!threadText.trim()}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              threadText.trim()
                ? 'bg-white text-black hover:bg-gray-200'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            Đăng
          </button>
        </div>
      </div>
    </div>
  );
}