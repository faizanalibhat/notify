

function globalValidator(context = {}) {
    const requiredKeys = ["name"];

    let givenKeys = Object.keys(context);

    for (let key of requiredKeys) {
        if (!givenKeys.includes(key)) {
            return false;
        }
    }
    
    return true;
}


const validators = {
    "global": globalValidator
}


const getValidatorForTemplate = (slug) => {
    let validator = validators[slug];

    return validator;
}

module.exports = { getValidatorForTemplate };
