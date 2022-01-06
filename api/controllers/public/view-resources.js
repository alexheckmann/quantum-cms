module.exports = {


  friendlyName: 'View resources',


  description: 'Display "Resources" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/public/resources'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
