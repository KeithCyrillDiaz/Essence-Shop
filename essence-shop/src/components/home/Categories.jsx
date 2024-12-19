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


const Frame = ({title, src, color}) => {
    return (
        <div className={`frame ${color}`}>
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
    color: assignTypes.string
}

const Categories = () => {

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

  return (
    <div className='container categories' >
        <Divider title="Explore By Categories" id="categories"/>
        <h2>Season of Scents</h2>
        <div className="frameContainer">
            {seasons.map((season, index) => {
                const {title, img, color} = season;
                return (
                    <Frame key={index} title={title} src={img} color={color}/>
                )
            })}
        </div>

        <h2>Scent Profiles</h2>

            <Slider {...settings}>
                {scentProfiles.map((season, index) => {
                        const {title, img, color} = season;
                        return (
                            <Frame key={index} title={title} src={img} color={color}/>
                        )
                    })}
            </Slider>
     
    </div>
  )
}

export default Categories
