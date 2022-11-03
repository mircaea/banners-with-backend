const express = require("express");
const {
  getBanners,
  saveBanner,
  deleteBanner,
} = require("../controllers/bannerController");

const router = express.Router();

router.get("/getBanners", getBanners);
router.put("/saveBanner", saveBanner);
router.put("/deleteBanner", deleteBanner);

module.exports = {
  routes: router,
};
