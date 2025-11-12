import { Button } from './components/ui/button'
import { ArrowUpIcon } from "lucide-react"
import './App.css'
import { BrowserRouter as Router , Routes , Route } from 'react-router'
import Defaultlayout from './components/Layout/Defaultlayout'
import HomePage from './pages/HomePage'


function App() {

  return (
        <Router>
            <Routes>
               <Route element={<Defaultlayout />}>
                  <Route path="/" element={<HomePage />} />
              </Route>
            </Routes>
        </Router>
  )
}

export default App;
