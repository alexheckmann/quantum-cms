module.exports = {


    friendlyName: 'Update group',


    description: 'Update a working group.',


    inputs: {
        id: {
            description: 'The id of the working group.',
            type: 'number',
            required: true
        },
        name: {
            description: 'The name of the working group.',
            type: 'string',
            required: true
        },
        description: {
            description: 'The description of the working group.',
            type: 'string',
        },
    },


    exits: {
        success: {
            responseType: 'view',
            viewTemplatePath: 'pages/groups/show'
        },
    },


    fn: async function (inputs) {
        let grp = await WorkingGroup.updateOne({ id: inputs.id }).set(inputs);

        sails.log.debug("Updated group: " + inputs.id)
        sails.log(grp);

        if (!grp) { throw 'notFound'; }
        return {
            message: "Successfully updated.",
            grp: grp
        };
    }
};