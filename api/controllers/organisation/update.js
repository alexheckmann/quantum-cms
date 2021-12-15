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
    },


    fn: async function (inputs) {
        // update organisation
        sails.log.debug("Update organisation: " + inputs.id)
        sails.log(inputs);

        let org = await Organisation.updateOne({ id: inputs.id }).set(inputs);

        sails.log.debug("Updated organisation: " + inputs.id)
        sails.log(org);

        if (!org) { throw 'notFound'; }
        return {
            message: "Successfully updated your organisation.",
            org: org
        };
    }
};