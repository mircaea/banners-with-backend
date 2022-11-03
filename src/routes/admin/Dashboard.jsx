import { useEffect } from "react";
import BannersDashboard from "../../components/banners/admin/BannersDashboard";
import useFirestore from "../../hooks/use-firestore";
import classes from "./dashboard.module.css";

function Dashboard() {
  const { getBanners } = useFirestore();

  useEffect(() => {
    getBanners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <p className={classes.OtherContent}>
        [using a backend for cruds on banners]
      </p>
      <br />
      <BannersDashboard />
    </>
  );
}

export default Dashboard;
