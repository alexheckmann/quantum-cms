module.exports = {

    friendlyName: 'Delete members',

    description: 'Delete selected members from a working group.',

    inputs: {
        id : {
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
        console.log("inputs.members: " + inputs.members)

        let ids = inputs.members.map(i=>Number(i));
        console.log("ids: " + ids);        

        await WorkingGroup.removeFromCollection(inputs.id, 'workers').members(ids);

        // TODO Fehlerbehandlung und aufräumen
    }
};