import { useEffect, useState } from 'react';
import toast from "react-hot-toast";

// Zustand store
import { usePreviewStore } from 'src/store/previewStore';



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
import Banner from '@/components/Banner';
import Trend from '@/components/Trend';
import Discount from '@/components/Discount';
import Services from '@/components/Services';


const Home = () => {
  
    const resetToDefaults = usePreviewStore((state) => state.resetToDefaults);


    // 🧪 DEV ONLY: Reset store on mount to preview defaults
  /*useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      resetToDefaults();
      console.warn("🧼 Store reset to preview defaults (dev only)");
    }
  }, [resetToDefaults]);*/



  return (
    <>
      <Header />
      <Preloader />
      <Categories />
      {/*<OffcanvasMenu />
      <Breadcrumb />*/}


      <Product />
      <Banner />
      <Trend />
      <Discount />
      <Services />



      <Social />
      <Footer />
    </>
  );
};

export default Home;