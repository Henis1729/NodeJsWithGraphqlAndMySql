import Express from "express";
import { authRew } from "../middlewares/auth";
const router = new Express.Router();

router.post("/uploadExcelForBaseFoodUOM", authRew, async (req, res) => {
  try {
    console.log("uploadExcelForBaseFoodUOM");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/uploadExcelForFood", authRew, async (req, res) => {
  try {
    console.log("uploadExcelForFood");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
