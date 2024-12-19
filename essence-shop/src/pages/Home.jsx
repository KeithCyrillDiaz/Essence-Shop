import { AboutUs, BestSellers, Carousel, Categories, ExploreScents, Footer, GetInTouch, NavigationBar } from "../components"



function Home() {
  return (
    <>
      <NavigationBar MainButton={{title: 'SIGN IN', path: '/register'}} currentPage="Home"/>
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
