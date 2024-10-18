import { useState } from 'react';
import Header from './Header';
import ProductListing from './ProductListing';
import Categories from './Categories';
import { categorizedProducts } from '../../datas';
import { FaFilter } from "react-icons/fa";

const Homepage = () => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [showMoreCount, setShowMoreCount] = useState(13);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [selectedCategory, setSelectedCategory] = useState(null);

  const allProducts = Object.values(categorizedProducts).flat();

  const toggleFilter = () => setShowFilter((prev) => !prev);

  const handleFilterChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedFilters((prevFilters) => [...prevFilters, value]);
    } else {
      setSelectedFilters((prevFilters) =>
        prevFilters.filter((filter) => filter !== value)
      );
    }
    setShowMoreCount(13);
  };


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
    setShowMoreCount(13); 
  };

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      setSelectedFilters([]);
    } else {
      setSelectedCategory(category);
      setSelectedFilters([category]);
    }
    setShowMoreCount(13);
  };

  const handleLogoClick = () => {
    setSelectedCategory(null);
    setSelectedFilters([]);
    setSearchQuery('');
    setShowMoreCount(13);
  };

  const filteredProducts = allProducts.filter((product) => {
    const inSelectedCategory =
      selectedFilters.length === 0 ||
      selectedFilters.includes(
        Object.keys(categorizedProducts).find((category) =>
          categorizedProducts[category].some((p) => p.name === product.name)
        )
      );
    const matchesSearch = product.name.toLowerCase().includes(searchQuery);
    return inSelectedCategory && matchesSearch;
  });

  const visibleFilteredProducts = filteredProducts.slice(0, showMoreCount);

  const handleShowMore = () => {
    setShowMoreCount((prevCount) => prevCount + 13); 
  };

  return (
    <>
      <Header searchQuery={searchQuery} onSearchChange={handleSearchChange} onLogoClick={handleLogoClick} />
      
      <Categories onCategoryClick={handleCategoryClick} />

      <div className="p-6 flex justify-between items-center">
        <h2 className="text-xl font-bold">Products</h2>
        <FaFilter onClick={toggleFilter} className="text-2xl cursor-pointer hover:text-green-600" />
      </div>

      {showFilter && (
        <div className="p-6">
          <h2 className="text-xl font-bold">Filter by Category</h2>
          <div className="flex flex-wrap gap-4 mt-4">
            {Object.keys(categorizedProducts).map((category) => (
              <label key={category} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={category}
                  onChange={handleFilterChange}
                  checked={selectedFilters.includes(category)}
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <ProductListing products={visibleFilteredProducts} />

      {visibleFilteredProducts.length < filteredProducts.length && (
        <div className="flex justify-center my-6">
          <button
            onClick={handleShowMore}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            See More
          </button>
        </div>
      )}
    </>
  );
};

export default Homepage;
