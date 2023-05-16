import React from "react"
import "../scss/main.scss"

function Item({itemid, image, title, category, price, count, handleItemClick}) {
  const totalPrice = (price * count).toFixed(2)

  return (
    <div className="CartItem" id={itemid}>
      <img src={image} alt={title} />
      <div className="details">
        <h4>{title}</h4>
        <h6>{category}</h6>
        <h5>
          {totalPrice} <p>kr</p>
        </h5>
        <h2>{price} kr</h2>
        <button className="delete" onClick={() => handleItemClick("delete")}>
          Radera
        </button>
      </div>
      <div className="quantity">
        <button className="plus" onClick={() => handleItemClick("+")}>
          +
        </button>
        <p className="amount">{count}</p>
        <button className="minus" onClick={() => handleItemClick("-")}>
          -
        </button>
      </div>
    </div>
  )
}

export default Item