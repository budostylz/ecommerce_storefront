import { useEffect, useState } from 'react';
import toast from "react-hot-toast";


// Common layout components
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import HeroSection from '../components/common/HeroSection';

// Page sections
import MarketingSection from '../components/home/MarketingServicesPromo';

// Zustand store
import { usePreviewStore } from 'src/store/previewStore';

// Token validation utility
import { validateTokens } from 'src/utils/validateTokens';

const Home = () => {
  const overlayMap = usePreviewStore((state) => state.overlayMap);
  const designTokens = usePreviewStore((state) => state.designTokens);
  const resetToDefaults = usePreviewStore((state) => state.resetToDefaults);

  const heroConfig = overlayMap["global"]?.hero;
  const marketingConfig = overlayMap["/"]?.marketingServicesPromo;
  const blogConfig = overlayMap["/"]?.blogInsightsSection;

  const [hasHydrated, setHasHydrated] = useState(false);


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


  // 🧪 DEV ONLY: Reset Zustand store to previewData on mount
  /*useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      resetToDefaults();
      console.warn("🧼 Store reset to preview defaults (dev only)");
    }
  }, [resetToDefaults]);*/

  // ✅ Wait for hydration and run token validation
  useEffect(() => {
    const state = usePreviewStore.getState();
    console.log('✅ CURRENT OVERLAY MAP:', state.overlayMap);
    setHasHydrated(true);

    const homeScopedOverlayMap = {
      global: {
        hero: state.overlayMap.global?.hero || {},
      },
      "/": state.overlayMap["/"] || {},
    };

    const { errors, unusedTokens } = validateTokens(homeScopedOverlayMap, state.designTokens);

    if (errors.length) {
      console.warn('❌ TOKEN VALIDATION ERRORS (Home):\n' + errors.join('\n'));
    }

    if (unusedTokens.length) {
      console.info('ℹ️ Unused Tokens (Home scope):\n' + unusedTokens.join('\n'));
    }
  }, []);

  if (!hasHydrated || !heroConfig || !marketingConfig) {
    return null; // Optional: display loader or fallback UI
  }

  return (
    <div
      className="js-animsition animsition"
      id="site-wrap"
      data-animsition-in-class="fade-in"
      data-animsition-out-class="fade-out"
    >
      <Header />

      <HeroSection
        showScroll={heroConfig.props.showScroll}
        isPageInside={heroConfig.props.isPageInside}
        isDesignMode={true}
        page="home"
      />

      <MarketingSection
        showScroll={marketingConfig.props.showScroll}
        isPageInside={marketingConfig.props.isPageInside}
        isDesignMode={true}
        page="home"

      />


      <Footer />
    </div>
  );
};

export default Home;