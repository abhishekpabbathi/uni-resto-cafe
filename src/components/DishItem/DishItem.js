import './DishItem.css'

const DishItem = ({ dishDetails, cartQuantities, onAddItem, onRemoveItem }) => {
  const {
    dish_id: dishId,
    dish_name: dishName,
    dish_price: dishPrice,
    dish_currency: dishCurrency,
    dish_calories: dishCalories,
    dish_description: dishDescription,
    dish_Availability: dishAvailability,
    dish_Type: dishType,
    dish_image: dishImage,
    addonCat,
  } = dishDetails

  // Directly retrieve quantity from pre-populated state
  const quantity = cartQuantities[dishId] ?? 0
  const isVeg = dishType === 2

  return (
    <li className="dish-item-card">
      <div className="dish-details-container">
        <div className={`veg-border ${isVeg ? 'veg' : 'non-veg'}`}>
          <div className={`veg-circle ${isVeg ? 'veg' : 'non-veg'}`} />
        </div>

        <div className="dish-info">
          <h1 className="dish-name">{dishName}</h1>

          <p className="dish-price">
            {dishCurrency} {dishPrice}
          </p>

          <p className="dish-description">{dishDescription}</p>

          {dishAvailability ? (
            <div className="quantity-controller">
              <button
                type="button"
                className="quantity-btn"
                onClick={() => onRemoveItem(dishId)}
              >
                -
              </button>
              {/* HTML paragraph element displaying "0" initially */}
              <p className="quantity-text">{quantity}</p>
              <button
                type="button"
                className="quantity-btn"
                onClick={() => onAddItem(dishId)}
              >
                +
              </button>
            </div>
          ) : (
            <p className="not-available-text">Not available</p>
          )}

          {addonCat && addonCat.length > 0 && (
            <p className="customization-text">Customizations available</p>
          )}
        </div>
      </div>

      <div className="dish-right-container">
        <p className="calories-text">{dishCalories} calories</p>
        <img src={dishImage} alt={dishName} className="dish-image" />
      </div>
    </li>
  )
}

export default DishItem