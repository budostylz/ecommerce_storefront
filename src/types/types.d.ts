interface StyleInspectorProps {
  fontFamily?: string;
  fontWeight?: string;
  fontSize?: string;
  lineHeight?: string;
  textAlign?: string;
  textColor?: string;
  tokenName?: string; // 🆕 token key for font-family
  backgroundColor?: string;
  containerBackgroundColor?: string;
  onChange: (styles: Record<string, string>) => void;
  onClose: () => void;
}

type EditingTarget = {
  component: string;
  field: string;
  index?: number;
};

type AddWatercraftSectionProps = {
  showScroll?: boolean;
  isPageInside?: boolean;
  isDesignMode?: boolean;
  page?: string;
  
};


type MarketingServicesPromoProps = {
  showScroll?: boolean;
  isPageInside?: boolean;
  isDesignMode?: boolean;
  page?: string;
};

type FooterProps = {
  showScroll?: boolean;
  isPageInside?: boolean;
  isDesignMode?: boolean;
  page?: string;
  
};
