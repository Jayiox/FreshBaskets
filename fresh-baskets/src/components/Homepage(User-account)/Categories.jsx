const Categories = ({ onCategoryClick }) => {
    return (
      <>
        <section className='flex flex-wrap justify-center items-center gap-12 p-6'>
          <div onClick={() => onCategoryClick('Fruits')}>
            <div className='flex flex-col items-center cursor-pointer'>
              <img
                src='../fruits-icon.png'
                alt='fruits-icon'
                className='w-12 h-12 object-cover hover:scale-125 transition-transform'
              />
              <p className='mt-2 text-lg font-medium text-[#ff8e2b]'>Fruits</p>
            </div>
          </div>
  
          <div onClick={() => onCategoryClick('Vegetables')}>
            <div className='flex flex-col items-center cursor-pointer'>
              <img
                src='../vegetable-icon.png'
                alt='vegetable-icon'
                className='w-12 h-12 object-cover hover:scale-125 transition-transform'
              />
              <p className='mt-2 text-lg font-medium text-[#ff8e2b]'>Vegetables</p>
            </div>
          </div>
  
          <div onClick={() => onCategoryClick('Meat & Poultry')}>
            <div className='flex flex-col items-center cursor-pointer'>
              <img
                src='../meat&poultry-icon.png'
                alt='meat&poultry-icon'
                className='w-12 h-12 object-cover hover:scale-125 transition-transform'
              />
              <p className='mt-2 text-lg font-medium text-[#ff8e2b]'>Meat & Poultry</p>
            </div>
          </div>
  
          <div onClick={() => onCategoryClick('Dairy Products')}>
            <div className='flex flex-col items-center cursor-pointer'>
              <img
                src='../dairy-products-icon.png'
                alt='dairy-products-icon'
                className='w-12 h-12 object-cover hover:scale-125 transition-transform'
              />
              <p className='mt-2 text-lg font-medium text-[#ff8e2b]'>Dairy Products</p>
            </div>
          </div>
  
          <div onClick={() => onCategoryClick('Bakery')}>
            <div className='flex flex-col items-center cursor-pointer'>
              <img
                src='../bakery-icon.png'
                alt='bakery-icon'
                className='w-12 h-12 object-cover hover:scale-125 transition-transform'
              />
              <p className='mt-2 text-lg font-medium text-[#ff8e2b]'>Bakery</p>
            </div>
          </div>
        </section>
      </>
    );
  };
  
  export default Categories;
  