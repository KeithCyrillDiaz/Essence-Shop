import { useParams } from "react-router-dom"
import RenderCategoriesItem from "../../components/client/RenderCategoriesItem"
import { NavigationBar } from "../../components"


const Categories = () => {

    const {category} = useParams()
  
  return (
    <>
          <NavigationBar/>
          <RenderCategoriesItem category={category}/>
    </>
  )
}

export default Categories
