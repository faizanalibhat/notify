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