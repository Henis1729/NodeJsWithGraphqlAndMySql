import Express from "express";
import { authRew } from "../middlewares/auth";
const router = new Express.Router();

router.post("/downloadExcelOfUsers", authRew, async (req, res) => {
  try {
    console.log("downloadExcelOfUsers");
  } catch (error) {
    console.log("🚀 ~ file: downloadExcel.js:24 ~ router.post ~ error", error);
  }
});
module.exports = router;
