import { useEffect, useState } from "react";

export const usePhotoUrl = (photoFile) => {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    if (photoFile) {
      const url = URL.createObjectURL(photoFile);
      setPhotoUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setPhotoUrl(null);
    }
  }, [photoFile]);

  return photoUrl;
};
