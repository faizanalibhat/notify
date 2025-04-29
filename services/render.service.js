// ==================== METHODS THAT RENDER THE STORED TEMPLATE USING THE GIVEN CONTEXT ========================== //


function replacePlaceholders(template, data) {
    const placeholderRegex = /\{\{([^{}]+)\}\}/g;
    
    return template.replace(placeholderRegex, (match, placeholderName) => {
        const key = placeholderName.trim();
        
        return data.hasOwnProperty(key) ? data[key] : match;
    });
}


const renderTemplate = (raw, context) => {
    return replacePlaceholders(raw, context);
}



module.exports = { renderTemplate };