import React, { useEffect } from "react";
import classes from "./landing.module.css";
import BannersFrontend from "../../../components/banners/client/BannersFrontend";
import useFirestore from "../../../hooks/use-firestore";

function Landing() {
  const { getBanners } = useFirestore();

  useEffect(() => {
    getBanners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.Outer}>
      <p>View and export banners</p>
      <BannersFrontend />
    </div>
  );
}

export default Landing;
