import { Navbar } from './components/Navbar'
import { Carousel } from "./components/Carousel"

function App() {
  const navItems = ["HOME","ELECTRONICS","BOOKS","MUSIC","MOVIES","CLOTHING","GAMES","FURNITURE","TRAVEL","BOTANICAL"]
  const images = ["Carousel_Images/Image-1.jpg","Carousel_Images/Image-2.jpg","Carousel_Images/Image-3.jpg","Carousel_Images/Image-4.jpg","Carousel_Images/Image-5.jpg"]
  return (
    <div >
        <Navbar navItems={navItems} />
        <Carousel images={images} />
    </div>
  )
}

export default App
