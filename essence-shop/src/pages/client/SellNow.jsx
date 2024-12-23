import { AddItemSection, Footer, Inventory, NavigationBar } from "../../components"


const SellNow = () => {
  return (
    <div className="sellNow">
        <div className="space"></div>
        <NavigationBar/>
        <AddItemSection/>
        <Inventory/>
        <Footer/>
    </div>
  )
}

export default SellNow
