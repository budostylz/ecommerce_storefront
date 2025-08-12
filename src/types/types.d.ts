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

type StyleUpdates = Partial<{
  textColor: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: string | number;
  lineHeight: string | number;
  textAlign: string;
  textTransform: string;
  backgroundColor: string;
  padding: string;        // e.g. "12px 30px" or "12px 30px 12px 30px"
  borderRadius: string;
}>;

type ContactProps = {
  address?: string;
  phones?: string[];
  supportEmail?: string;
  mapSrc?: string;
  showScroll?: boolean;
  isPageInside?: boolean;
  isDesignMode?: boolean;
  page?: string;
  onSubmit?: (data: { name: string; email: string; website: string; message: string }) => void;
};




