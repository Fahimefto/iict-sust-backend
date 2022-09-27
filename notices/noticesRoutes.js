//router import
const { Router } = require("express");
const router = Router();

//notice controller
const noticesController = require("./noticesController");

//API routes of notices
router.get("/", noticesController.getAllNotices);
router.get("/:type", noticesController.getNoticesbyType);
router.post("/", noticesController.postNotice);
router.put("/:id", noticesController.updateNoticebyId);
router.delete("/:id",noticesController.deleteNoticebyId);
router.get("/id/:id", noticesController.getNoticesbyId);

module.exports = router;
