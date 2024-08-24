// Rating stars
export const getStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStars = rating - fullStars >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  return (
    "★".repeat(fullStars) + (halfStars ? "⯪" : "") + "☆".repeat(emptyStars)
  );
};
