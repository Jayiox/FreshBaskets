const FirstBlock = () => {
  return (
    <>
      <section className='container mx-auto flex justify-between items-center py-20 pt-44 relative'>
        <div className='w-1/2'>
        <div className="flex flex-row gap-2 items-start animate-fadeIn">
            <h1 className="text-5xl font-extrabold text-green-600">Fresh</h1>
            <h1 className="text-5xl font-extrabold text-[#ff8e2b]">Baskets</h1>
          </div>
          <h2 className='text-2xl text-[#8D6E63] mt-4'>
            Experience the convenience of fresh, local produce delivered by
            Fresh Baskets.
          </h2>
        </div>

        <div className='w-1/2 relative'>
          <img
            src='https://th.bing.com/th/id/R.f03db9156e98a0aae2f0c5e509929e0f?rik=DjJ%2bFbRk2Zj7uQ&riu=http%3a%2f%2fcormackenterprisesltd.com%2fwp-content%2fuploads%2f2018%2f09%2fkisspng-vegetable-fruit-basket-century-farms-international-fruits-and-vegetables-5abfb9c60122f5.2485309615225143740047.png&ehk=WjH4KuG6hBuy4IHIZssXisDB95F0d1wsPADXzpcSHKg%3d&risl=&pid=ImgRaw&r=0'
            alt='Basket with local produce'
            className='w-full h-auto'
          />
        </div>
      </section>
    </>
  );
};
export default FirstBlock;
