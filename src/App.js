import React, { useState, useEffect } from "react";

import productList from "./list.json";
import ProductFilter from "./productFilter";
import { getStars } from "./utils";
import {
  getUniqueAttributes,
  applyFilters,
  getMinMaxPrice,
} from "./filteringLogic";
import "./styles.css";

const ProductGrid = ({ products }) => {
  const display = products[0]?.size ? "grid" : "list";
  return (
    <div className={display === "grid" ? "product-grid" : "product-list"}>
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <div className="imageContainer anim-loader ">
            <img src={product.thumbnail} alt={product.productName} />
          </div>
          <div className="specs-wrapper">
            <p className="txtSmall">{product.name}</p>
            <h3>{product.productName}</h3>
            <p>
              {getStars(product.rating)}
              <span className="reviewNumber">{product.reviews}</span>
            </p>
            <div className="color-container">
              {product.color.map((colorValue, idx) => (
                <div
                  key={idx}
                  className="color-swatch"
                  style={{ backgroundColor: colorValue }}
                  title={colorValue} // Tooltip on hover
                ></div>
              ))}
            </div>
            <p>
              {product.size
                ? product.size.join(", ")
                : product.features.join(", ")}
            </p>
            <h2>${product.price}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [showShoes, setShowShoes] = useState(true); // Default to visually driven
  const [attributes, setAttributes] = useState(
    getUniqueAttributes(showShoes ? productList.shoes : productList.headphones)
  );

  const productsToDisplay = showShoes
    ? productList.shoes
    : productList.headphones;

  // Use getMinMaxPrice instead of direct calculations
  const { minPrice, maxPrice } = getMinMaxPrice(productsToDisplay);

  const [filters, setFilters] = useState({
    colors: [],
    sizes: [],
    ratings: [],
    brands: [],
  });

  const [priceFilter, setPriceFilter] = useState({
    min: minPrice,
    max: maxPrice,
  });

  useEffect(() => {
    setAttributes(
      getUniqueAttributes(
        showShoes ? productList.shoes : productList.headphones
      )
    );
  }, [showShoes]);

  const toggleFilter = (type, value) => {
    setFilters((prevState) => {
      const updatedFilters = [...prevState[type]];

      if (updatedFilters.includes(value)) {
        const index = updatedFilters.indexOf(value);
        updatedFilters.splice(index, 1);
      } else {
        updatedFilters.push(value);
      }

      return { ...prevState, [type]: updatedFilters };
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      colors: [],
      sizes: [],
      ratings: [],
      brands: [],
    });
  };

  const [collapsedGroups, setCollapsedGroups] = useState({
    colors: false, // true means collapsed, false means expanded
    sizes: false,
    ratings: false,
    brands: false,
    price: false,
  });

  const toggleCollapse = (group) => {
    setCollapsedGroups((prevState) => ({
      ...prevState,
      [group]: !prevState[group],
    }));
  };

  const [sortMethod, setSortMethod] = useState("bestMatch"); // default sort method

  const getSortedProducts = (products, method) => {
    switch (method) {
      case "bestMatch":
        return products.sort((a, b) => b.bestMatchScore - a.bestMatchScore);
      case "newest":
        return products.sort(
          (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
        );
      case "topRated":
        return products.sort((a, b) => b.rating - a.rating);
      case "bestSelling":
        return products.sort((a, b) => b.salesVolume - a.salesVolume);
      case "highToLow":
        return products.sort((a, b) => b.price - a.price);
      case "lowToHigh":
        return products.sort((a, b) => a.price - b.price);
      default:
        return products;
    }
  };

  // Use applyFilters from filteringLogic.js
  let filteredProducts = applyFilters(productsToDisplay, filters, priceFilter);
  filteredProducts = getSortedProducts(filteredProducts, sortMethod);

  const toggleFilterSidebar = () => {
    setIsFilterSidebarOpen((prev) => !prev);
  };

  return (
    <div className="productListWrapper">
      <div className="toggleNav">
        <button id="toggleBtn" onClick={() => setShowShoes(!showShoes)}>
          View {showShoes ? "Headphones" : "Shoes"}
        </button>
      </div>
      <div className="productListHeader">
        <h1>UX-Wise Product List</h1>
        <h3>1200 Products</h3>
      </div>
      <div className="productListBody">
        <div className="productListContent">
          <ProductFilter
            attributes={attributes}
            filters={filters}
            toggleFilter={toggleFilter}
            priceFilter={priceFilter}
            setPriceFilter={setPriceFilter}
            minPrice={minPrice}
            maxPrice={maxPrice}
            collapsedGroups={collapsedGroups}
            toggleCollapse={toggleCollapse}
            isFilterSidebarOpen={isFilterSidebarOpen}
            setIsFilterSidebarOpen={setIsFilterSidebarOpen}
          />
          <div className="listItemContainer">
            <div className="sortingRow">
              <button onClick={toggleFilterSidebar}>Filter</button>

              <div className="sortingContainer">
                <p>Sort by</p>
                <select
                  value={sortMethod}
                  onChange={(e) => setSortMethod(e.target.value)}
                >
                  <option value="bestMatch">Best Matches</option>
                  <option value="newest">Newest</option>
                  <option value="topRated">Top Rated</option>
                  <option value="bestSelling">Best Selling</option>
                  <option value="highToLow">Price (High to Low)</option>
                  <option value="lowToHigh">Price (Low to High)</option>
                </select>
              </div>
            </div>
            <div className="active-filters">
              {Object.keys(filters).map((type) =>
                filters[type].map((value) => (
                  <div className="filter-badge" key={`${type}-${value}`}>
                    <span>
                      {type}: {value}
                    </span>
                    <button onClick={() => toggleFilter(type, value)}>x</button>
                  </div>
                ))
              )}
              {Object.values(filters).some(
                (filterArray) => filterArray.length
              ) && (
                <button className="filterReset" onClick={resetFilters}>
                  Reset All Filters
                </button>
              )}
            </div>
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
