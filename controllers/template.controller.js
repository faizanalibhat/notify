const { catchError } = require("../utils/catchError"); // Assuming you're using this for error handling
const templateService = require("../services/template.service");

const testTemplateByIdController = catchError(async (req, res) => {
    const orgId = '';
    const { id } = req.params;
    const { context, recievers } = req.body;
    
    const slug = await templateService.testTemplateById(orgId, id, context, recievers);
    
    res.status(200).json({ slug });
});





module.exports = {
  createTemplateController,
  getAllTemplatesController,
  getTemplateByIdController,
  updateTemplateByIdController,
  deleteTemplateByIdController,
  testTemplateByIdController
};