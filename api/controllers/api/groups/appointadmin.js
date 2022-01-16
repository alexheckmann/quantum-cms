module.exports = {

    friendlyName: 'Appoint as admin',

    description: 'Appoint selected members from a working group as admin.',

    inputs: {
        id: {
            type: 'string',
            required: true
        },
        members: {
            type: 'ref',
            required: true
        }
    },

    exits: {
    },


    fn: async function (inputs) {
        let ids = inputs.members.map(i => Number(i));
        console.log("ids: " + ids);

        await WorkingGroup.addToCollection(inputs.id, 'admins').members(ids);

        return true;
    }
};