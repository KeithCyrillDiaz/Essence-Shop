
import { aboutUsImage } from '../../assets'
import Divider from '../Divider'


const AboutUs = () => {

  const text = "At Essence Shop, we are dedicated to supporting fragrance resellers in the Philippines by providing access to high-quality perfumes at competitive prices. Established in 2024, our mission is to make the art of perfumery accessible to all while empowering resellers with the best selections to grow their businesses. We offer a carefully curated collection, featuring designer brands, niche perfumes, and locally inspired fragrances. Each scent is handpicked to ensure quality, authenticity, and variety, catering to every mood, season, and occasion. Whether you're looking for fresh and clean scents, warm and woody aromas, or exotic Oriental blends, Essence Shop is here to guide you in finding the perfect fragrance. Trust us for exceptional service, authentic products, and a passion for scents that inspire."

  return (
      <div className="container aboutUs" id="about">
        <Divider title='About Us'/>
        <div className="contents">
          <div className="imgContainer">
            <img src={aboutUsImage} alt="" />
          </div>
          <p>{text}</p>
        </div>
      </div>
  )
}

export default AboutUs
