import { useEffect, useState } from 'react';
import toast from "react-hot-toast";


// Common layout components
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Preloader from '@/components/common/Preloader';
import OffcanvasMenu from '@/components/common/OffcanvasMenu';
import Breadcrumb from '@/components/common/Breadcrumb';
import Social from '@/components/common/Social';

//Local components
import Categories from '@/components/Categories';
import Product from '@/components/Product';


const Home = () => {



  return (
    <>
      <Header />
      <Preloader />
      <Categories />
      {/*<OffcanvasMenu />
      <Breadcrumb />*/}

      <Social />
      <Product />

    


      <Footer />
   </>
  );
};

export default Home;