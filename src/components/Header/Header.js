import { AiOutlineShoppingCart } from 'react-icons/ai'
import './Header.css'

const Header = ({ restaurantName, cartCount, tabList, activeTabId, onChangeTab }) => {
  return (
    <header className="header-wrapper">
      <div className="top-nav">
        {/* Must be HTML heading element with text content of restaurant_name */}
        <h1 className="restaurant-name">{restaurantName}</h1>
        <div className="cart-container">
          {/* Must always be visible paragraph element with text "My Orders" */}
          <p className="my-orders-text">My Orders</p>
          <div className="cart-icon-wrapper">
            <AiOutlineShoppingCart className="cart-icon" />
            {/* Must be a paragraph or span with current total cart count */}
            <p className="cart-badge">{cartCount}</p>
          </div>
        </div>
      </div>

      <div className="tab-section-wrapper">
        <nav className="tab-list-container">
          {tabList.map(tab => {
            const isActive = tab.menu_category_id === activeTabId
            return (
              <button
                type="button"
                key={tab.menu_category_id}
                className={`tab-btn ${isActive ? 'active-tab' : ''}`}
                onClick={() => onChangeTab(tab.menu_category_id)}
              >
                {tab.menu_category}
              </button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

export default Header