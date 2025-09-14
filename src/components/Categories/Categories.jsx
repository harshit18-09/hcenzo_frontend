import { useCategory } from "../../context";
import "./Categories.css";

export const Categories = () => {
  const { selectedCategory, setSelectedCategory } = useCategory();

  const categories = ["All", "National Parks", "Camping", "Arctic", "Desert", "Mountains", "Tropical", "Popular"];

  return (
    <section className="categories-container d-flex align-center gap-md">
      {categories.map((category) => (
        <span
          key={category}
          className={`category-chip cursor-pointer ${
            selectedCategory === category ? "selected" : ""
          }`}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </span>
      ))}
    </section>
  );
};
