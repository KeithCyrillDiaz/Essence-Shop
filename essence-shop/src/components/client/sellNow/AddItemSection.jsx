import { useEffect, useState } from "react"
import ItemCard from "../../ItemCard"
import { designerFragrances } from "../../../data"
import { desginersName } from "../../../constant/aliases"
import axios from "axios"
import backendRoutes from "../../../routes/backendROutes"
import SessionExpired from "../SessionExpired"
import Loader from "../../Loader"

const AddItemSection = () => {

    const [product, setProduct] = useState({
        "price": 10900,
        "size": "100ml",
        "productName": "Versace Dylan Blue",
        "topNotes": ["Calabrian Bergamot", "Grapefruit", "Fig Leaves", "Aquatic Notes"],
        "middleNotes": ["Violet Leaf", "Papyrus", "Black Pepper", "Patchouli"],
        "baseNotes": ["Musk", "Tonka Bean", "Saffron", "Incense"],
        "brand": "Versace",
        "longevity": "8 - 10 hours",
        "projection": "Strong",
        "occasion": ["Daytime", "Casual"],
        "bestFor": ["Spring", "Summer"],
        "quantity": 10,
        "imageOf": "DylanBlue"
    })

    const [brands, setBrands] = useState([]);
    const [inventory, setInventory] = useState([]);

    const [loading, setLoading] = useState(false);
    const [isSessionExpired, setIsSessionExpired] = useState(false)

    const getBrands = () => {
      const designerBrands = designerFragrances.find((item) => item.Brands);
      const formattedData = designerBrands.Brands.map((brand) => ({
        label: brand,
        value: brand
      }))
      setBrands(formattedData);
    }

    const updateProduct = (field, value) => {
      setProduct((prev) => {

        if(field === "quantity" || field === "price") {
            if(
              (field === "quantity" && value.length > 3) || 
              (field === "price" && value.length > 5)
            ) return prev
        } 
    
        const updatedProduct = { ...prev, [field]: value };

        if (field === "productName") {
          const lowerCaseValue = value.toLowerCase();
    
          for (const [brand, fragrances] of Object.entries(desginersName)) {
            for (const fragrance of fragrances) {
              const lowerCaseAliases = fragrance.aliases.map((alias) => alias.toLowerCase());
    
              if (lowerCaseAliases.includes(lowerCaseValue)) {
                // console.log("Brand: ", brand);
                // console.log("Name: ", fragrance.name);
    
                updatedProduct.brand = brand;

                const brandData = designerFragrances.find((item) => item[brand]);
                if (brandData) {
                  const perfumeDetail = brandData[brand]?.find(
                    (item) => item.name.toLowerCase() === fragrance.name.toLowerCase()
                  );
    
                  if (perfumeDetail) {
                    updatedProduct.topNotes = perfumeDetail.topNotes;
                    updatedProduct.middleNotes = perfumeDetail.middleNotes;
                    updatedProduct.baseNotes = perfumeDetail.baseNotes;
                    updatedProduct.occasion = perfumeDetail.occasion;
                    updatedProduct.bestFor = perfumeDetail.bestFor;
                    updatedProduct.projection = perfumeDetail.projection;
                    updatedProduct.longevity = perfumeDetail.longevity;
                    updatedProduct.imageOf = fragrance.name;
                  }
                }
    
                return updatedProduct; 
              }
            }
          }
        }
    
        return updatedProduct; 
      });
    };

    const handleDiscard = () => {
        setProduct({
          price: "",
          size: "",
          productName: "",
          topNotes: [],
          middleNotes: [],
          baseNotes: [],
          brand: "",
          longevity: "",
          projection: "",
          occasion: [],
          bestFor: [],
          quantity: "",
          imageOf: "",
        });
      };

      const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Adding Item on Inventory")
            setLoading(true);
            console.log("Product added:", product);

            const token = localStorage.getItem('token');

            const response = await axios.post(
              backendRoutes.products.addProduct,
              product,
              {headers: {
                Authorization: `Bearer ${token}`
              }}
            )

            if(response.status === 401){
              setIsSessionExpired(true);
              return
            }


          
        } catch (error) {
            console.error("Error Adding Item on Inventory", error)
        } finally {
          setLoading(false)
        }
        

      };

      const fetchProducts = async () => {
        try {
            console.log("Fetching Products from Inventory");
            const token = localStorage.getItem('token');

            const response = await axios.get(
              backendRoutes.products.getInventoryProducts,
              {headers: {
                Authorization: `Bearer ${token}`
              }}
            )

            if(response.status === 401){
              setIsSessionExpired(true);
              return
            }

            if(!response.data) {
              console.log("Error Fetching Products from Inventory")
              return
            }

            const {data} = response.data;
            
            if(data) setInventory(data);
            console.log("data: ", JSON.stringify(data, null, 2))
            
        } catch (error) {
          console.error("Error Fetching Invventory", error)
        } finally {
          setLoading(false)
        }
      }

      useEffect(()=> {
        getBrands();
        fetchProducts();
      },[])

      if(loading) {
        return <Loader/>
      }

      return (
        <div className="container addItemSection">
          {isSessionExpired && <SessionExpired/>}
          <ItemCard
            item={{
              ...product,
              tags: [...product.occasion, ...product.bestFor],
            }}
            disabled={true}
          />
          <form onSubmit={handleFormSubmit}>
            <div className="row">
              <p>
                <strong>Product Name:</strong>
              </p>
              <input
                type="text"
                value={product.productName}
                onChange={(e) => updateProduct("productName", e.target.value)}
                required
                maxLength={20}
              />
            </div>
    
            <div className="row">
              <p>
                <strong>Brand:</strong>
              </p>
              <select
                  value={product.brand}
                  onChange={(e) => updateProduct("brand", e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {brands.map((item, index)=> {
                    const {value, label} = item;
                    return (
                      <option value={value} key={index}>{label}</option>
                  )
                  })}
                  
                  <option value="Chanel">Chanel</option>
                  <option value="Dior">Dior</option>
                </select>
            </div>
    
            <div className="row">
              <p>
                <strong>Size:</strong>
              </p>
              <select
                value={product.size}
                onChange={(e) => updateProduct("size", e.target.value)}
                required
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="100ml">100ml</option>
                <option value="50ml">50ml</option>
              </select>
            </div>
    
            <div className="row">
              <p>
                <strong>Quantity:</strong>
              </p>
              <input
                type="number"
                value={product.quantity}
                onChange={(e) => updateProduct("quantity", e.target.value)}
                min={1}
                maxLength={4}
                required
              />
            </div>
    
            <div className="row">
              <p>
                <strong>Price:</strong>
              </p>
              <input
                type="number"
                value={product.price}
                onChange={(e) => updateProduct("price", e.target.value)}
                required
              />
            </div>
    
            <div className="buttons">
              <button type="submit">Add Item</button>
              <button className="whiteButton" onClick={handleDiscard}>
                Clear
              </button>
            </div>
          </form>
          
          <div className="notes">
            <div className="boxNotes">
              <h2>Top Notes</h2>
              <p>{product.topNotes.join(', ') || '[Notes Based on Api]'}</p>
            </div>
            <div className="boxNotes">
              <h2>Middle Notes</h2>
              <p>{product.middleNotes.join(', ') || '[Notes Based on Api]'}</p>
            </div>
            <div className="boxNotes">
              <h2>Base Notes</h2>
              <p>{product.baseNotes.join(', ') || '[Notes Based on Api]'}</p>
            </div>
          </div>
        </div>
      );
}

export default AddItemSection
