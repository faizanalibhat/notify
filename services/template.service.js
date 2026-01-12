const fs = require('fs');
const path = require('path');
const Template = require("../models/templates.model");
const { mqbroker } = require("../services/rabbitmq.service");
const { ApiError } = require("../utils/ApiError");
const { ObjectId } = require("mongoose").Types;
const fileTemplates = require("../templates/map");


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


const getAllTemplates = async (orgId, filter = {}, page = 1, limit = 10) => {
    const templates = await Template.find(filter).skip((page - 1) * limit).limit(limit);
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
    try {
        // 1. Check file-based map first (Override/Standard)
        const fileTemplate = fileTemplates.find(t => t.template_id === slug);
        if (fileTemplate && fileTemplate.active) {
            try {
                const templatePath = path.join(__dirname, "..", fileTemplate.template_path);
                const raw = fs.readFileSync(templatePath, 'utf8');
                return {
                    slug: fileTemplate.template_id,
                    type: fileTemplate.type,
                    raw: raw,
                    status: "active"
                };
            } catch (fsErr) {
                console.error(`[TemplateService] Failed to load file template ${slug}: ${fsErr.message}`);
                // Fallback to DB if file load fails
            }
        }

        // 2. Fallback to Database
        const template = await Template.findOne({ slug });

        if (!template) {
            return { code: 404, status: "failed", message: "template not found" };
        }

        return template.toJSON();
    }
    catch (err) {
        console.log("Error while getting template");
        return { code: 404, status: "failed", message: "template not found" };
    }
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



const testTemplateById = async (orgId, id, context, recievers, channels = []) => {
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