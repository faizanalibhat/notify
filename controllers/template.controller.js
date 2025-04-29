const { catchError } = require("../utils/catchError"); // Assuming you're using this for error handling
const templateService = require("../services/template.service");


const createTemplateController = catchError(async (req, res) => {
    const orgId = '';
    const { type, slug, raw } = req.body;
    
    const template = await templateService.createTemplate(orgId, type, slug, raw);
    
    res.status(201).json({
        success: true,
        data: template
    });
});


const getAllTemplatesController = catchError(async (req, res) => {
    const orgId = '';
    const { filter = {}, page = 1, limit = 10 } = req.query;
    
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    
    const templates = await templateService.getAllTemplates(orgId, filter, pageNum, limitNum);
    
    return res.json(templates);
});



const getTemplateByIdController = catchError(async (req, res) => {
    const orgId = '';
    const { id } = req.params;
    
    const template = await templateService.getTemplateById(orgId, id);
    
    res.status(200).json(template);
});



const updateTemplateByIdController = catchError(async (req, res) => {
    const orgId = '';
    const { id } = req.params;
    const updates = req.body;
    
    const updatedTemplate = await templateService.updateTemplateById(orgId, id, updates);
    
    res.status(200).json(updatedTemplate)
});


const deleteTemplateByIdController = catchError(async (req, res) => {
    const orgId = '';
    const { id } = req.params;
    
    const deletedTemplate = await templateService.deleteTemplateById(orgId, id);
    
    res.status(200).json(deletedTemplate);
});




const testTemplateByIdController = catchError(async (req, res) => {
    const orgId = '';
    const { id } = req.params;
    const { context, recievers, channels=[] } = req.body;
    
    const slug = await templateService.testTemplateById(orgId, id, context, recievers, channels);
    
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