import { Button } from './components/ui/button'
import { ArrowUpIcon } from "lucide-react"
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Defaultlayout from './components/Layout/Defaultlayout'
import HomePage from './pages/HomePage'
import FollowingPage from './pages/FollowingPage'
import SearchPage from './pages/SearchPage'
import AddPost from './pages/AddPost'
import ActivityFeed from './pages/FeedScreen'
import UserProfile from './pages/ProfilePage'
import PostDetailPage from './pages/PostDetailPage'
function App() {

  return (
    <Router>
      <Routes>
        <Route element={<Defaultlayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/FollowingPage" element={<FollowingPage />} />
          <Route path="/SearchPage" element={<SearchPage />} />
          <Route path="/FeedScreen" element={<ActivityFeed />}></Route>
          <Route path="/ProfilePage" element={<UserProfile/>}></Route> 
          <Route path="/:username/post/:postId" element={<PostDetailPage />}></Route>
        </Route>
        <Route path="/AddPost" element={<AddPost/>}></Route> 
        

        
      </Routes>
    </Router>
  )
}

export default App;
