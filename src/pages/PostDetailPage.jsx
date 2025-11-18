import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Heart, MessageCircle, RotateCwSquare, Send, Ellipsis, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// Modal thêm comment
function AddCommentModal({ isOpen, onClose, onSubmit }) {
  const [commentText, setCommentText] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (commentText.trim()) {
      onSubmit(commentText);
      setCommentText('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center md:justify-center">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full md:max-w-xl bg-black rounded-t-3xl md:rounded-3xl max-h-[70vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-800">
          <button
            onClick={onClose}
            className="text-white hover:bg-gray-900 p-2 rounded-full transition"
          >
            <X size={24} />
          </button>
          
          <h1 className="text-lg font-semibold text-white">Thêm bình luận</h1>
          
          <div className="w-10" />
        </div>

        {/* Content */}
        <div className="px-4 py-4">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-semibold text-sm">You</span>
            </div>
            
            <div className="flex-1">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Viết bình luận của bạn..."
                className="w-full bg-transparent text-white placeholder-gray-500 outline-none resize-none text-base"
                rows={4}
                autoFocus
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 bg-black border-t border-gray-800 px-4 py-4">
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={!commentText.trim()}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                commentText.trim()
                  ? 'bg-white text-black hover:bg-gray-200'
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              }`}
            >
              Đăng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component hiển thị từng comment
function CommentItem({ comment }) {
  return (
    <div className="flex gap-3 py-4 border-b border-gray-800">
      <Avatar className="w-10 h-10 flex-shrink-0">
        <AvatarImage src={`https://i.pravatar.cc/150?img=${comment.id}`} />
        <AvatarFallback>{comment.name.charAt(0)}</AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-white">{comment.email.split('@')[0]}</span>
          <span className="text-gray-500 text-sm">• 2h</span>
        </div>
        <p className="text-gray-300 text-sm mb-2">{comment.body}</p>
        
        <div className="flex items-center gap-4 text-gray-500">
          <button className="flex items-center gap-1 hover:text-white transition">
            <Heart size={16} />
            <span className="text-xs">{Math.floor(Math.random() * 50)}</span>
          </button>
          <button className="text-xs hover:text-white transition">
            Trả lời
          </button>
        </div>
      </div>
    </div>
  );
}

function PostDetailPage() {
  const { username, postId } = useParams(); // Lấy username và postId từ URL
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  // Fetch post detail
  useEffect(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Post:", data);
        setPost(data);
      })
      .catch((error) => console.error('Error fetching post:', error))
      .finally(() => setLoading(false));
  }, [postId]);

  // Fetch comments
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Comments:", data);
        setComments(data);
      })
      .catch((error) => console.error('Error fetching comments:', error));
  }, [postId]);

  // Xử lý thêm comment mới
  const handleAddComment = (commentText) => {
    const newComment = {
      id: comments.length + 1,
      name: "Bạn",
      email: "you@example.com",
      body: commentText
    };
    setComments([newComment, ...comments]);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <div className="text-white text-xl">Đang tải...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <div className="text-white text-xl">Không tìm thấy bài viết</div>
      </div>
    );
  }

  const RenderMobile = () => {
    return (
      <div className="block md:hidden">
        {/* Header with username */}
        <div className="sticky top-0 bg-black border-b border-gray-800 px-4 py-3 z-10">
          <div className="flex items-center gap-2">
            <button className="text-white" onClick={() => window.history.back()}>
              ← 
            </button>
            <span className="text-white font-semibold">@{username}</span>
          </div>
        </div>

        {/* Post chính */}
        <div className="flex w-full bg-black gap-5 p-4 border-b border-gray-800">
          <div className="relative flex w-15 h-15 bg-black items-center justify-center">
            <Avatar className="w-10 h-10">
              <AvatarImage src={`https://i.pravatar.cc/150?img=${post.userId}`} />
              <AvatarFallback>U{post.userId}</AvatarFallback>
            </Avatar>
            <Plus className="absolute bottom-3 right-0 w-4 h-4 text-black bg-white rounded-full" />
          </div>
          
          <div className="flex flex-col flex-1 gap-2">
            <span className="text-white pt-4 flex gap-2">
              @{username} <p className="text-gray-400">2h</p>
            </span>
            <span className="text-white font-semibold">{post.title}</span>
            <span className="text-gray-300">{post.body}</span>
            
            <div className="flex flex-wrap items-center gap-0">
              <Button size="sm" className="bg-black">
                <Heart /><p>245</p>
              </Button>
              <Button 
                size="sm" 
                className="bg-black"
                onClick={() => setIsCommentModalOpen(true)}
              >
                <MessageCircle /><p>{comments.length}</p>
              </Button>
              <Button size="sm" className="bg-black">
                <RotateCwSquare /><p>38</p>
              </Button>
              <Button size="sm" className="bg-black">
                <Send /><p>15</p>
              </Button>
            </div>
          </div>
          
          <div className="text-white">
            <Button size="sm" className="bg-black">
              <Ellipsis />
            </Button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="px-4 py-3">
          <h3 className="text-white font-semibold text-lg mb-4">
            Bình luận ({comments.length})
          </h3>
          
          {comments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Chưa có bình luận nào. Hãy là người đầu tiên!
            </div>
          ) : (
            comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))
          )}
        </div>
      </div>
    );
  };

  const RenderDesktop = () => {
    return (
      <div className="hidden md:block max-w-2xl mx-auto bg-[#22201f] rounded-2xl my-6">
        {/* Header with username */}
        <div className="bg-black border-b border-gray-800 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center gap-2">
            <button className="text-white hover:bg-gray-800 p-2 rounded-full" onClick={() => window.history.back()}>
              ← 
            </button>
            <span className="text-white font-semibold text-lg">@{username}</span>
          </div>
        </div>

        {/* Post chính */}
        <div className="flex w-full bg-black gap-5 p-6 border-b-2 border-white">
          <div className="relative flex w-15 h-15 bg-black items-center justify-center">
            <Avatar className="w-10 h-10">
              <AvatarImage src={`https://i.pravatar.cc/150?img=${post.userId}`} />
              <AvatarFallback>U{post.userId}</AvatarFallback>
            </Avatar>
            <Plus className="absolute bottom-3 right-0 w-4 h-4 text-black bg-white rounded-full" />
          </div>
          
          <div className="flex flex-col flex-1 gap-2">
            <span className="text-white pt-4 flex gap-2">
              @{username} <p className="text-gray-400">2h</p>
            </span>
            <span className="text-white font-semibold text-lg">{post.title}</span>
            <span className="text-gray-300">{post.body}</span>
            
            <div className="flex flex-wrap items-center gap-0">
              <Button size="sm" className="bg-black">
                <Heart /><p>245</p>
              </Button>
              <Button 
                size="sm" 
                className="bg-black"
                onClick={() => setIsCommentModalOpen(true)}
              >
                <MessageCircle /><p>{comments.length}</p>
              </Button>
              <Button size="sm" className="bg-black">
                <RotateCwSquare /><p>38</p>
              </Button>
              <Button size="sm" className="bg-black">
                <Send /><p>15</p>
              </Button>
            </div>
          </div>
          
          <div className="text-white ml-auto">
            <Button size="sm" className="bg-black">
              <Ellipsis />
            </Button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="p-6">
          <h3 className="text-white font-semibold text-xl mb-4">
            Bình luận ({comments.length})
          </h3>
          
          {comments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Chưa có bình luận nào. Hãy là người đầu tiên!
            </div>
          ) : (
            comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="h-screen flex flex-col overflow-y-auto flex-1 bg-black mt-12 md:mt-0">
        <RenderMobile />
        <RenderDesktop />
      </div>

      {/* Modal thêm comment */}
      <AddCommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        onSubmit={handleAddComment}
      />
    </>
  );
}

export default PostDetailPage;