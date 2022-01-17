module.exports = {

    friendlyName: 'Add to group',

    description: 'Add selected members to the working group.',

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
        let ids = inputs.members.map(i=>Number(i));
        console.log("ids: " + ids);      
        
        await WorkingGroup.addToCollection(inputs.id, 'workers').members(ids);

        return true;
    }
};