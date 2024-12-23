import { AboutUs, BestSellers, Carousel, ExploreCategories, ExploreScents, Footer, GetInTouch, NavigationBar } from "../../components"



function Home() {
  return (
    <>
      <NavigationBar currentPage={"Home"}/>
      <Carousel/>
      <ExploreCategories/>
      <BestSellers/>
      <ExploreScents/>
      <AboutUs/>
      <GetInTouch/>
      <Footer/>
    </>
  )
}

export default Home
