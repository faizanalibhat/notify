module.exports = {
    '/risk-register/api/v1/risks': {
        'GET': 'Listed all risks in risk register',
        'POST': 'Created a new risk in risk register',
    },
    '/risk-register/api/v1/risks/[0-9a-z]+': {
        'PATCH': 'Updated a risk in the risk register',
        'DELETE': 'Deleted a risk in the risk register',
    },
    '/risk-register/api/v1/frameworks': {
        'GET': 'Listed frameworks in the risk register',
        'POST': 'Created a new framework in risk register',
    },
    '/risk-register/api/v1/frameworks/[0-9a-z]+': {
        'PATCH': 'Updated a framework in the risk register',
        'DELETE': 'Deleted a framework in risk register',
    },
    '/risk-register/api/v1/frameworks/[0-9a-z]+/controls': {
        'GET': 'Listed controls of a framework in risk register',
        'POST': 'Created a new control in a framework in risk register',
    },
    '/risk-register/api/v1/frameworks/[0-9a-z]+/controls/[0-9a-z]+': {
        'PATCH': 'Updated a control in a framework in the risk register',
        'DELETE': 'Deleted a control in a framework in the risk register',
    },
};
