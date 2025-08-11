// utils/uploadImageWithDimensions.ts

import { toast } from "react-hot-toast";

type UploadOptions = {
  file: File;
  templateWidth: number;
  templateHeight: number;
  onSuccess: (imageUrl: string) => void;
};

export const uploadImageWithDimensions = ({
  file,
  templateWidth,
  templateHeight,
  onSuccess,
}: UploadOptions) => {
  const img = new Image();
  const objectURL = URL.createObjectURL(file);

  img.onload = () => {
    const { width, height } = img;

    if (width === templateWidth && height === templateHeight) {
      toast.success(`🔥 Perfect ${width}x${height}px match.`, { duration: 6000 });
    } else {
      toast(`🎯 Image is ${width}x${height}px. Resize for best results.`, {
        icon: "🧙",
        duration: 8000,
      });
    }

    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result as string;
      onSuccess(imageUrl);
      URL.revokeObjectURL(objectURL);
    };

    reader.readAsDataURL(file);
  };

  img.onerror = () => {
    toast.error("⚠️ Could not read image dimensions.");
    URL.revokeObjectURL(objectURL);
  };

  img.src = objectURL;
};
