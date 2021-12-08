module.exports = {

  friendlyName: 'Find',

  description: 'Find organisation.',

  inputs: {
  },

  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/organisation/index'
    }
  },

  fn: async function () {
    // gets the current user
    let user = await User.findOne({id: this.req.session.userId}).populate('organisation');

    // gets the organisation to the current user
    var org = await Organisation.find({id: user.organisation.id});
    
    sails.log.debug('user.organisation: '+user.organisation.id)
    sails.log.debug(org)

    return {
      message: "",
      org: org
    };
  }
}
