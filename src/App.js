import { useState, useEffect } from 'react'
import Header from './components/Header/Header'
import DishItem from './components/DishItem/DishItem'
import './App.css'

const App = () => {
  const [restaurantName, setRestaurantName] = useState('')
  const [tabList, setTabList] = useState([])
  const [activeTabId, setActiveTabId] = useState('')
  const [cartQuantities, setCartQuantities] = useState({})

  useEffect(() => {
    const getRestaurantData = async () => {
      const response = await fetch(
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
      )
      const data = await response.json()
      if (data && data.length > 0) {
        setRestaurantName(data[0].restaurant_name)
        const categories = data[0].table_menu_list
        setTabList(categories)
        if (categories.length > 0) {
          setActiveTabId(categories[0].menu_category_id)
        }

        // Initialize every dish quantity to 0 in state upon API success
        const initialQuantities = {}
        categories.forEach(category => {
          category.category_dishes.forEach(dish => {
            initialQuantities[dish.dish_id] = 0
          })
        })
        setCartQuantities(initialQuantities)
      }
    }
    getRestaurantData()
  }, [])

  const onChangeTab = tabId => {
    setActiveTabId(tabId)
  }

  const onAddItem = dishId => {
    setCartQuantities(prev => ({
      ...prev,
      [dishId]: (prev[dishId] || 0) + 1,
    }))
  }

  const onRemoveItem = dishId => {
    setCartQuantities(prev => {
      const currentQty = prev[dishId] || 0
      // Strict guard: Do not decrement if count is already 0
      if (currentQty <= 0) {
        return prev
      }
      return {
        ...prev,
        [dishId]: currentQty - 1,
      }
    })
  }

  // Calculate cart badge count dynamically across all dishes
  const totalCartCount = Object.values(cartQuantities).reduce(
    (acc, qty) => acc + qty,
    0
  )

  const activeCategory = tabList.find(
    each => each.menu_category_id === activeTabId
  )
  const activeDishes = activeCategory ? activeCategory.category_dishes : []

  return (
    <div className="app-container">
      <Header
        restaurantName={restaurantName}
        cartCount={totalCartCount}
        tabList={tabList}
        activeTabId={activeTabId}
        onChangeTab={onChangeTab}
      />
      <main className="dishes-container">
        <ul className="dishes-list">
          {activeDishes.map(dish => (
            <DishItem
              key={dish.dish_id}
              dishDetails={dish}
              cartQuantities={cartQuantities}
              onAddItem={onAddItem}
              onRemoveItem={onRemoveItem}
            />
          ))}
        </ul>
      </main>
    </div>
  )
}

export default App