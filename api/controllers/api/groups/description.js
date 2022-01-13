module.exports = {


    friendlyName: 'Description',


    description: 'Gets the description to the selected group.',


    inputs: {
        id: {
            type: 'string',
            required: true
        },
    },


    exits: {

    },

    fn: async function (inputs) {
        // selected group
        var grp = await WorkingGroup.findOne({ id: inputs.id });

        console.log("Selected group:")
        console.log(grp);

        let message = []

        if (grp.description.length > 0) {
            message.push({ description: grp.description })
        } else {
            message.push({ description: "" })
        }

        return message;
    }
};