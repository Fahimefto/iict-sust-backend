const {Router} = require("express");
const router = Router() ;

const batchController = require("./bController");

//APi routes for batches
router.get("/" ,batchController.getAllBatches);
router.get("/:id" ,batchController.getBatchById);
router.post("/" ,batchController.postBatch);
router.put("/:id" ,batchController.updateBatchById);
router.delete("/:id" ,batchController.deleteBatchById);

module.exports = router ;