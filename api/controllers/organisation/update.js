module.exports = {


    friendlyName: 'Update',


    description: 'Update a organisation.',


    inputs: {
        id: {
            description: 'The id of the organisation.',
            type: 'number',
            required: true
        },
        name: {
            description: 'The name of the organisation.',
            type: 'string',
            required: true
        },
    },


    exits: {
        success: {
            responseType: 'view',
            viewTemplatePath: 'pages/organisation/show'
        },
        notFound: {
            description: 'No organisation with the specified ID was found in the database.',
            responseType: 'notFound'
        }
    },


    fn: async function (inputs) {
        // update organisation
        let org = await Organisation.updateOne({ id: inputs.id }).set(inputs);

        if (!org) { throw 'notFound'; }
        return {
            message: "Successfully updated your organisation.",
            org: org
        };
    }
};