import React from "react";
import { getStars } from "./utils";

const ProductFilter = ({
  attributes,
  filters,
  toggleFilter,
  priceFilter,
  setPriceFilter,
  minPrice,
  maxPrice,
  collapsedGroups,
  toggleCollapse,
  isFilterSidebarOpen,
  setIsFilterSidebarOpen
}) => {
  return (
    <div className={`filteringSideBar ${isFilterSidebarOpen ? "open" : ""}`}>
      <button onClick={() => setIsFilterSidebarOpen(false)}>Close</button>

      <h3>Filter</h3>

      <div className="brandFilterWrapper filterGroup">
        <h4
          onClick={() => toggleCollapse("brands")}
          className={collapsedGroups.brands ? "collapsed" : ""}
        >
          Brands
        </h4>

        {!collapsedGroups.brands && (
          <div className="filterContents">
            {attributes.brands.map((brand) => (
              <div key={brand}>
                <input
                  type="checkbox"
                  id={`brand-${brand}`}
                  onChange={() => toggleFilter("brands", brand)}
                  checked={filters.brands.includes(brand)}
                />
                <label htmlFor={`brand-${brand}`}>{brand}</label>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="colorFiltersWrapper filterGroup">
        <h4
          onClick={() => toggleCollapse("colors")}
          className={collapsedGroups.colors ? "collapsed" : ""}
        >
          Colors
        </h4>

        {!collapsedGroups.colors && (
          <div className="filterContents">
            {attributes.colors.map((color) => (
              <div key={color}>
                <input
                  type="checkbox"
                  id={color}
                  className="colorCheckbox"
                  onChange={() => toggleFilter("colors", color)}
                  checked={filters.colors.includes(color)}
                />
                <label
                  htmlFor={color}
                  style={{ backgroundColor: color }}
                ></label>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="sizeFiltersWrapper filterGroup">
        <h4
          onClick={() => toggleCollapse("sizes")}
          className={collapsedGroups.sizes ? "collapsed" : ""}
        >
          Sizes
        </h4>

        {!collapsedGroups.sizes && (
          <div className="filterContents">
            {attributes.sizes.map((size) => (
              <div key={size}>
                <input
                  type="checkbox"
                  id={`size-${size}`}
                  className="sizeCheckbox"
                  checked={filters.sizes.includes(size)}
                  onChange={() => toggleFilter("sizes", size)}
                />
                <label htmlFor={`size-${size}`}>{size}</label>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="ratingFiltersWrapper filterGroup">
        <h4
          onClick={() => toggleCollapse("ratings")}
          className={collapsedGroups.ratings ? "collapsed" : ""}
        >
          Ratings
        </h4>

        {!collapsedGroups.ratings && (
          <div className="filterContents">
            {attributes.ratings
              .sort((a, b) => b - a) // This will sort the ratings in descending order
              .map((rating) => (
                <div key={rating}>
                  <input
                    type="checkbox"
                    id={`rating-${rating}`}
                    checked={filters.ratings.includes(rating)}
                    onChange={() => toggleFilter("ratings", rating)}
                  />
                  <label htmlFor={`rating-${rating}`}>{getStars(rating)}</label>
                </div>
              ))}
          </div>
        )}
      </div>

      <div className="priceFilter">
        <h4>Price Range</h4>
        <div className="priceRangeWrapper">
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={priceFilter.min}
            onChange={(e) =>
              setPriceFilter((prev) => ({
                ...prev,
                min: Number(e.target.value)
              }))
            }
          />
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={priceFilter.max}
            onChange={(e) =>
              setPriceFilter((prev) => ({
                ...prev,
                max: Number(e.target.value)
              }))
            }
          />
        </div>
        <div className="priceUserInput">
          <input
            type="number"
            value={priceFilter.min}
            onChange={(e) =>
              setPriceFilter((prev) => ({
                ...prev,
                min: parseFloat(e.target.value)
              }))
            }
          />
          <input
            type="number"
            value={priceFilter.max}
            onChange={(e) =>
              setPriceFilter((prev) => ({
                ...prev,
                max: parseFloat(e.target.value)
              }))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
