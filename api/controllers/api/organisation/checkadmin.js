module.exports = {


    friendlyName: 'Check Admin',


    description: 'Checks whether the current user is admin of the organisation.',


    inputs: {
    },


    exits: {

    },

    fn: async function (inputs) {
        var user = await User.findOne({ id: this.req.me.id }).populate('admin').populate("organisation");

        // if user is admin of the org return true else false
        if (user.admin) {
            return true;
          } else {
            return false;
          }
    }
};