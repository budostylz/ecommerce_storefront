import { useEffect, useState } from 'react';
import toast from "react-hot-toast";


// Common layout components
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import HeroSection from '../components/common/HeroSection';

// Page sections
import AddWatercraftSection from '../components/about/AddWatercraftSection';

// Zustand store
import { usePreviewStore } from 'src/store/previewStore';

// Token validation utility
import { validateTokens } from 'src/utils/validateTokens';

const About = () => {
  const overlayMap = usePreviewStore((state) => state.overlayMap);
  const designTokens = usePreviewStore((state) => state.designTokens);
  const resetToDefaults = usePreviewStore((state) => state.resetToDefaults);

  const heroConfig = overlayMap["global"]?.hero;
  const addWatercraftSectionConfig = overlayMap["about"]?.addWatercraftSection;



  const [hasHydrated, setHasHydrated] = useState(false);

  // 🧪 DEV ONLY: Reset store on mount to preview defaults
  /*useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      resetToDefaults();
      console.warn("🧼 Store reset to preview defaults (dev only)");
    }
  }, [resetToDefaults]);*/

  useEffect(() => {
    const hasShownToast = sessionStorage.getItem("hasShownTypographyToast");

    if (!hasShownToast) {
      toast("🎨 👆 Tap a heading or subheading to customize fonts!", {
        icon: "🎨",
        duration: 4000,
        style: {
          background: "#fef3c7",
          border: "1px solid #fcd34d",
          padding: "12px",
          color: "#78350f",
          fontWeight: "600",
        },
      });

      sessionStorage.setItem("hasShownTypographyToast", "true");
    }
  }, []);


  // ✅ Hydration check & token validation
  useEffect(() => {
    const state = usePreviewStore.getState();
    console.log('✅ CURRENT OVERLAY MAP:', state.overlayMap);
    setHasHydrated(true);

    // 🧪 Token validation for About page
    const aboutScopedOverlayMap = {
      global: {
        hero: state.overlayMap.global?.hero || {},
      },
      about: state.overlayMap.about || {},
    };

    const { errors, unusedTokens } = validateTokens(aboutScopedOverlayMap, state.designTokens);

    if (errors.length) {
      console.warn('❌ TOKEN VALIDATION ERRORS (About):\n' + errors.join('\n'));
    }

    if (unusedTokens.length) {
      console.info('ℹ️ Unused Tokens (About scope):\n' + unusedTokens.join('\n'));
    }
  }, []);

  // ⏳ Wait for hydration and config before rendering
  if (!hasHydrated || !heroConfig) {
    return null;
  }

  return (
    <div
      id="site-wrap"
      className="js-animsition animsition"
      data-animsition-in-class="fade-in"
      data-animsition-out-class="fade-out"
    >
      <Header />

      <HeroSection
        showScroll={heroConfig.props.showScroll}
        isPageInside={heroConfig.props.isPageInside}
        isDesignMode={true}
        page="about"
      />

      <AddWatercraftSection
        showScroll={addWatercraftSectionConfig.props.showScroll}
        isPageInside={addWatercraftSectionConfig.props.isPageInside}
        isDesignMode={true}
        page="about"
      />
      <Footer />
    </div>
  );
};

export default About;