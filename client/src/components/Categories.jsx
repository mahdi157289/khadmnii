import { Link } from "react-router-dom";
import { categories } from "../data";
import "../styles/Categories.scss";

const Categories = () => {
  return (
    <div className="categories">
      
      <h1>Explore Top Categories</h1>
      <p>
        Explore our wide range of categories to all types of
        jobs. Immerse yourself in the local community, enjoy the comforts of
        home, and find the ones how can fullfill your needs.
      </p>

      <div className="categories_list">
        {categories?.slice(1, 7).map((category, index) => (
          <Link to={`/properties/category/${category.label}`}>
            <div className="category" key={index}>
              <img className="ARR" src={category.img} alt={category.label} />
              <div className="overlay"></div>
              <div className="category_text">
                
                <img className="category_text_icon" src={category.icon} alt={category.label} />
                <p>{category.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
