import axios from "axios";
import { deleteObject, ref } from "firebase/storage";
import { useAppContext } from "../context/AppContext";
import { storage } from "../firebase/config";
import { uploadFile } from "../firebase/storage";
import { BannerType } from "../firebase/types";

const SERVER_URL = `${window.location.protocol}//${window.location.hostname}:8080`;

function useFirestore() {
  const { update_banners, update_banner, delete_banner } = useAppContext();

  const getBanners = async () => {
    try {
      const options = {
        method: "GET",
        url: `${SERVER_URL}/api/getBanners`,
      };
      const result = await axios.request(options);
      if (result?.data) {
        update_banners(result.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveBanner = async (request: BannerType, file?: File) => {
    try {
      let newBanner = { ...request };
      if (file) {
        const urlNew = await uploadFile(file);
        if (urlNew) newBanner.url = urlNew;
      }
      const url = `${SERVER_URL}/api/saveBanner`;
      const result = await axios.put(url, newBanner);
      if (result?.data) {
        update_banner(result.data);
        if (request.url && result.data.url !== request.url) {
          await deleteFile(request.url);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFile = async (path: string) => {
    try {
      const bucketRef = ref(storage, path);
      if (bucketRef) {
        await deleteObject(bucketRef);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteBanner = async (banner: BannerType) => {
    try {
      const { url, id } = banner;
      const reqUrl = `${SERVER_URL}/api/deleteBanner`;
      const result = await axios.put(reqUrl, { id });
      if (result.status === 200) {
        if (url) await deleteFile(url);
        if (id) delete_banner(id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getBanners,
    saveBanner,
    deleteBanner,
  };
}

export default useFirestore;
