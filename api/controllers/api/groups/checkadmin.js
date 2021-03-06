module.exports = {


    friendlyName: 'Check Admin',


    description: 'Checks whether the current user is admin of the selected group.',


    inputs: {
        id: {
            type: 'string',
            required: true
        },
    },


    exits: {

    },

    fn: async function (inputs) {
        var user = await User.findOne({ id: this.req.me.id }).populate('adminOf');

        console.log("Current User:")
        console.log(user);

        // if user is admin of seelcted group return true else false
        if (user.adminOf.filter(e => e.id == inputs.id).length > 0) {
            return true;
          } else {
            return false;
          }
    }
};