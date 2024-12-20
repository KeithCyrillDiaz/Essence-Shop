import { AboutUs, BestSellers, Carousel, Categories, ExploreScents, Footer, GetInTouch, NavigationBar } from "../../components"



function Home() {
  return (
    <>
      <NavigationBar currentPage={"Home"}/>
      <Carousel/>
      <Categories/>
      <BestSellers/>
      <ExploreScents/>
      <AboutUs/>
      <GetInTouch/>
      <Footer/>
    </>
  )
}

export default Home
