import Divider from "../Divider"
import assignTypes from "../../constant/PropTypes";
import { 
    fall, 
    floral, 
    fresh, 
    fruity, 
    orientalAndSpicy, 
    spring, 
    summer, 
    sweet, 
    winter, 
    woodyAndEarthy 
} from "../../assets";
import LazyLoad from "react-lazyload";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";


const Frame = ({title, src, color, handleClick}) => {
    return (
        <div className={`frame ${color}`} onClick={() => handleClick(title)}>
            <div className="imgContainer">
                <LazyLoad height={200} offset={100} once>
                    <img src={src} alt=""/>
                </LazyLoad>
            </div>
            <h4>{title}</h4>
        </div>
    )
}

Frame.propTypes = {
    title: assignTypes.title,
    src: assignTypes.string,
    color: assignTypes.string,
    handleClick: assignTypes.function
}

const ExploreCategories = () => {

    const navigate = useNavigate();
    const seasons = [
        { title: "FALL", img: fall, color: "fallColor"},
        { title: "SPRING" , img: spring, color: "springColor"},
        { title: "SUMMER", img: summer, color: "summerColor"},
        { title: "WINTER", img: winter, color: "winterColor"},
    ];

    const scentProfiles = [
        { title: "FRUITY", img: fruity, color: "fruityColor"},
        { title: "SWEET & GOURMAND", img: sweet, color: "sweetColor"},
        { title: "FRESH & CLEAN", img: fresh, color: "freshColor"},
        { title: "WOODY & EARTHY", img: woodyAndEarthy, color: "woodyColor"},
        { title: "FLORAL", img: floral, color: "floralColor"},
        { title: "ORIENTAL & SPICY", img: orientalAndSpicy, color: "spicyColor"},
    ];

    const settings = {
        dots: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1
      };

    const handleClickOnFrame = (title) => {
        console.log('title: ', title);
        const capitalizedTitle = title
        .split(" ") 
        .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase()) 
        .join(" "); 

        // const finalTitle = 
        //     capitalizedTitle === "Fresh & Clean" ? "Fresh" :
        //     capitalizedTitle === "Sweet & Gourmand" ? "Sweet" :
        //     capitalizedTitle === "Woody & Earthy" ? "woodyAndEarthy" :
        //     capitalizedTitle === "Oriental & Spicy" ? "orientalAndSpicy" :
        //     capitalizedTitle
        navigate(`/categories/${capitalizedTitle}`);
        return
    }   

  return (
    <div className='container exploreCategories' >
        <Divider title="Explore By Categories" id="categories"/>
        <h2>Season of Scents</h2>
        <div className="frameContainer">
            {seasons.map((season, index) => {
                const {title, img, color} = season;
                return (
                    <Frame key={index} title={title} src={img} color={color} handleClick={handleClickOnFrame} />
                )
            })}
        </div>

        <h2>Scent Profiles</h2>

            <Slider {...settings}>
                {scentProfiles.map((season, index) => {
                        const {title, img, color} = season;
                        return (
                            <Frame key={index} title={title} src={img} color={color} handleClick={handleClickOnFrame}/>
                        )
                    })}
            </Slider>
     
    </div>
  )
}

export default ExploreCategories
