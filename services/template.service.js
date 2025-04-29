const Template = require("../models/templates.model");
const { mqbroker } = require("../services/rabbitmq.service");
const { ApiError } = require("../utils/ApiError");
const { ObjectId } = require("mongoose").Types;


const createTemplate = async (orgId, type, slug, raw) => {
    const template = {
        orgId,
        type,
        slug,
        raw
    };

    const created = await Template.create(template);

    return created;
}


const getAllTemplates = async (orgId, filter={}, page=1, limit=10) => {
    const templates = await Template.find(filter).skip((page-1)*limit).limit(limit);
    const total = await Template.countDocuments({});

    return { templates, total };
}


const getTemplateById = async (orgId, id) => {
    const template = await Template.findOne({ _id: ObjectId.createFromHexString(id) });
    
    if (!template) {
        throw ApiError.notFound("Template not found");
    }

    return template?.toJSON();
}


const getTemplateBySlug = async (slug) => {
    const template = await Template.findOne({ slug });

    if (!template) {
        return { code: 404, status: "failed", message: "template not found" };
    }

    return template.toJSON();
}


const updateTemplateById = async (orgId, id, updates) => {
    const template = await Template.findOneAndUpdate({ _id: ObjectId.createFromHexString(id) }, { $set: updates }, { new: true });
    
    if (!template) {
        throw ApiError.notFound("Template not found");
    }

    return template?.toJSON();
}



const deleteTemplateById = async (orgId, id) => {
    const template = await Template.findOneAndDelete({ _id: ObjectId.createFromHexString(id) });
    
    if (!template) {
        throw ApiError.notFound("Template not found");
    }

    return template?.toJSON();
}



const testTemplateById = async (orgId, id, context, recievers, channels=[]) => {
    const template = await Template.findOne({ _id: ObjectId.createFromHexString(id) });

    if (!template) {
        throw ApiError.notFound("Template not found");
    }

    const { slug } = template.toJSON();

    const payload = {
        orgId,
        slug,
        context,
        recievers,
        notification: {},
        authContext: {},
        sender: {},
        store: false,
        channels: channels 
    }

    // send an email using the slug template and given context
    await mqbroker.publish("notification", "notification", payload);

    return slug;
}



module.exports = {
    createTemplate,
    getAllTemplates,
    getTemplateById,
    getTemplateBySlug,
    updateTemplateById,
    deleteTemplateById,
    testTemplateById
}