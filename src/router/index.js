const router = require("express").Router();
const uploadExcelRouter = require("./routes/uploadExcel");
const downloadExcelRouter = require("./routes/downloadExcel");

router.use("/upload", uploadExcelRouter);
router.use("/download", downloadExcelRouter);

module.exports = router;
