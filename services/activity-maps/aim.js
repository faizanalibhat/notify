module.exports = {
    // AIM API
    '//api/assets': {
        'GET': 'Listed Assets in Asset Inventory',
    },
    '//api/default': {
        'POST': "Created new default Rule",
        'GET': "Listed Default Rules in Asset Inventory",
    },
    '//api/asset-groups/': {
        'GET': "Listed asset groups in Asset Inventory",
        'POST': "Created a new asset group in AIM",
    },
    '//api/exports':  {
        'GET': "Listed API Exports",
        'POST': "Created an Asset Export"
    },
    '//api/integrate/[a-zA-Z0-9]': {
        'POST': "Integrated an Adapter with AIM",
    },
    '//api/integrations/active': {
        'GET': "Listed all active adapters in AIM",
    },
    '//api/integrations/[0-9a-z]+': {
        'DELETE': "Removed an Adapter from AIM"
    },
};
