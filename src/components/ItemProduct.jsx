import React, {useState} from "react"
import "../scss/main.scss"

function ItemProduct({itemid, image, title, category, description, price, count, handleItemClick}) {
  const [quantity, setQuantity] = useState(count) // State variable for quantity
  const totalPrice = (price * quantity).toFixed(2)

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1)
  }

  const handleDecrement = () => {
    if (quantity > 1) setQuantity((prevQuantity) => prevQuantity - 1)
  }

  const imageLocation = `/src/assets/images/products/${image}`

  return (
    <div className="CartItem" id={itemid}>
      <img src={imageLocation} alt={title} />
      <div className="details">
        <h4>{title}</h4>
        <h6>{category}</h6>
        <h4>{description}</h4>
        <h2>{price} kr</h2>
        <button className="add" onClick={() => handleItemClick("add")}>
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ItemProduct
