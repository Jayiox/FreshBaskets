import { BsSearchHeart, BsHeartFill, BsBasket } from 'react-icons/bs';
import { FaAirFreshener } from 'react-icons/fa';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 50 }, // Initial state: hidden with offset
  visible: { opacity: 1, y: 0 }, // Visible state: fully shown
  exit: { opacity: 0, y: 50 },   // Exit state: hidden with offset
};

const CardContents = () => {
  return (
    <>
      <motion.section
        className='relative border border-gray-300 p-8 rounded-md shadow-md w-[600px] h-[250px] mx-auto my-16 flex items-center justify-center'
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: false, amount: 0.5 }} // Control when animation triggers
        transition={{ duration: 0.5 }}
      >
        <div className='absolute -top-4 -left-4 bg-white p-2 rounded-full shadow-md'>
          <BsSearchHeart className='text-gray-600 text-3xl' />
        </div>

        <div className='flex flex-col items-center text-center'>
          <h1 className='text-2xl font-bold text-gray-700 mb-4'>
            Discover Local Farmers
          </h1>
          <p className='text-gray-500'>
            Browse and connect with local farmers near you, knowing exactly where your fresh produce is grown and sourced.
          </p>
        </div>
      </motion.section>

      <motion.section
        className='relative border border-gray-300 p-8 rounded-md shadow-md w-[600px] h-[250px] mx-auto my-16 flex items-center justify-center'
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <div className='absolute -top-5 left-5 bg-white p-2 rounded-full shadow-md'>
          <BsHeartFill className='text-gray-600 text-3xl' />
        </div>

        <div className='flex flex-col items-center text-center'>
          <h1 className='text-2xl font-bold text-gray-700 mb-4'>
            Sustainability at Heart
          </h1>
          <p className='text-gray-500'>
            By choosing Fresh Baskets, you're not only supporting local farmers but also making eco-conscious choices for a sustainable future.
          </p>
        </div>
      </motion.section>

      <motion.section
        className='relative border border-gray-300 p-8 rounded-md shadow-md w-[600px] h-[250px] mx-auto my-16 flex items-center justify-center'
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <div className='absolute -top-5 left-5 bg-white p-2 rounded-full shadow-md'>
          <FaAirFreshener className='text-gray-600 text-3xl' />
        </div>

        <div className='flex flex-col items-center text-center'>
          <h1 className='text-2xl font-bold text-gray-700 mb-4'>
            Freshness Guaranteed
          </h1>
          <p className='text-gray-500'>
            We ensure that all produce is harvested and delivered quickly, guaranteeing farm-to-table freshness for every order.
          </p>
        </div>
      </motion.section>

      <motion.section
        className='relative border border-gray-300 p-8 rounded-md shadow-md w-[600px] h-[250px] mx-auto my-16 flex items-center justify-center'
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <div className='absolute -top-5 left-5 bg-white p-2 rounded-full shadow-md'>
          <BsBasket className='text-gray-600 text-3xl' />
        </div>

        <div className='flex flex-col items-center text-center'>
          <h1 className='text-2xl font-bold text-gray-700 mb-4'>
            Custom Baskets, Your Way
          </h1>
          <p className='text-gray-500'>
            Personalize your basket with the produce you love, whether it's seasonal favorites or everyday essentials—tailored just for you.
          </p>
        </div>
      </motion.section>
    </>
  );
};

export default CardContents;
