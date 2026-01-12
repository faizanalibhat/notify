// ==================== METHODS THAT RENDER THE STORED TEMPLATE USING THE GIVEN CONTEXT ========================== //


function replacePlaceholders(template, data) {
    const placeholderRegex = /\{\{([^{}]+)\}\}/g;

    return template.replace(placeholderRegex, (match, placeholderName) => {
        const key = placeholderName.trim();

        return data.hasOwnProperty(key) ? data[key] : match;
    });
}


const Handlebars = require("handlebars");

const renderTemplate = (templateString, context) => {
    try {
        const template = Handlebars.compile(templateString);
        return template(context);
    } catch (err) {
        console.error("Handlebars render error:", err.message);
        throw err;
    }
}

module.exports = { renderTemplate };