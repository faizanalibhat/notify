const fs = require('fs');
const path = require('path');
const { mqbroker } = require("../services/rabbitmq.service");
const fileTemplates = require("../templates/map");


const getTemplateBySlug = async (slug) => {
    try {
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
            }
        }
    }
    catch (err) {
        console.log("Error while getting template");
        return { code: 404, status: "failed", message: "template not found" };
    }
}


const testTemplateById = async (orgId, id, context, recievers) => {

    const payload = {
        orgId,
        template_id: id,
        context,
        recievers,
    }

    await mqbroker.publish("notification", "notification.email", payload);

    return id;
}



module.exports = {
    getTemplateBySlug,
    testTemplateById
}