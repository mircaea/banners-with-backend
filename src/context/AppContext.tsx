import React, { ReactNode, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { BannerType } from "../firebase/types";
import { auth } from "../firebase/config";

interface AppContextType {
  currentUser: User | undefined;
  banners: BannerType[];
  update_banners: (request: BannerType[]) => void;
  update_banner: (request: BannerType) => void;
  delete_banner: (id: string) => void;
}

const AppContext = React.createContext<AppContextType>(null!);

export function useAppContext() {
  return useContext(AppContext);
}

export function ContextProvider({ children }: { children: ReactNode }) {
  let [currentUser, setCurrentUser] = useState<User>();
  const [banners, setBanners] = useState<BannerType[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => setCurrentUser(user ?? undefined),
      // let logged_in = user?.email ? user.email : "";
      // sessionStorage.setItem("logged_in", logged_in);
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [currentUser]);

  const update_banners = (request: BannerType[]) => {
    if (!request) return;
    setBanners(request);
  };
  const update_banner = (request: BannerType) => {
    if (!request) return;
    if (!banners) {
      setBanners([request]);
      return;
    }
    let needToAdd = true;
    let parsedArray = banners.map((el) => {
      if (el.id === request.id) {
        needToAdd = false;
        return request;
      } else return el;
    });
    if (needToAdd) {
      parsedArray = [...banners, request];
    }
    setBanners(parsedArray);
  };
  const delete_banner = (id: string) => {
    if (!id) return;
    if (!banners) {
      // should attempt to delete from db
      return;
    }
    const filtered = banners.filter((pg) => pg.id !== id);
    setBanners(filtered);
  };

  let value = {
    currentUser,
    banners,
    update_banners,
    update_banner,
    delete_banner,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
