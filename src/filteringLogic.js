// Helper function to get unique attributes based on the product list.
export const getUniqueAttributes = (products) => {
  const colors = [...new Set(products.map((p) => p.color).flat())];
  const sizes = [...new Set(products.map((p) => p.size).flat())];
  const ratings = [...new Set(products.map((p) => p.rating))];
  const brands = [...new Set(products.map((p) => p.name))];

  return { colors, sizes, ratings, brands };
};

export const applyFilters = (products, filters, priceFilter) => {
  let filteredProducts = [...products];

  if (filters.colors.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      filters.colors.some((color) => product.color.includes(color))
    );
  }

  if (filters.sizes.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      filters.sizes.some((size) => product.size.includes(size))
    );
  }

  if (filters.ratings.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      filters.ratings.includes(Math.floor(product.rating))
    );
  }

  if (filters.brands.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      filters.brands.includes(product.name)
    );
  }

  // price
  filteredProducts = filteredProducts.filter(
    (product) =>
      product.price >= priceFilter.min && product.price <= priceFilter.max
  );

  return filteredProducts;
};

export const getMinMaxPrice = (products) => {
  const minPrice = Math.min(...products.map((p) => p.price));
  const maxPrice = Math.max(...products.map((p) => p.price));
  return { minPrice, maxPrice };
};
