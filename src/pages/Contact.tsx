import { useEffect, useState } from 'react';
import toast from "react-hot-toast";


// Common layout components
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Preloader from '../components/common/Preloader';
import OffcanvasMenu from '../components/common/OffcanvasMenu';
import Breadcrumb from '../components/common/Breadcrumb';

// Local components
import ContactSection from '../components/Contact';

const Contact = () => {



  return (
    <>
      <Header />
      <Preloader />
      <OffcanvasMenu />
      <Breadcrumb />
      <ContactSection />


    


      <Footer />
   </>
  );
};

export default Contact;