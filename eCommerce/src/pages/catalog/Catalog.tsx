import ItemCategoryPath from "../../components/UI/category-path/ItemCategoryPath";
import CategoriesComponent from "../../components/UI/filters/Category-filter";
import Footer from "../../components/UI/footer/Footer";
import Header from "../../components/UI/header/Header";
import ProductList from "../../components/UI/products/products";

function Catalog() {
  

  return (
    <>
      <Header />
      <CategoriesComponent />
      <ItemCategoryPath />
      <ProductList />
      <Footer />
    </>
  );
}

export default Catalog;