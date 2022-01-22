const sailsHookApianalytics = require("sails-hook-apianalytics");

module.exports = {

    friendlyName: 'Get selected service.',

    description: '',

    inputs: {
        id: {
            description: 'The id of the sub_type',
            type: 'number',
            required: true
        }
    },

    exits: {
        success: {
            responseType: 'view',
            viewTemplatePath: 'pages/subscription/checkorder'
        }
    },

    fn: async function (inputs) {
        // session
        this.req.session.subscription = inputs.id;
        
        console.log("Session sub: " + this.req.session.subscription);

        // sub_type
        let subType = await SubType.findOne({ id: inputs.id });


        return {
            subType: subType,
        }
    }
}