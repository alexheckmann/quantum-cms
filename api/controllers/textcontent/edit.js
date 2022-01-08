module.exports = {


  friendlyName: 'Edit',


  description: 'Edit a given text entry',


  inputs: {
    id: {
      description: 'The text content of the user to look up.',
      type: 'number',
      required: true
    }
  },


  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/textcontent/edit'
    },
    notFound: {
      description: 'No text content with the specified ID was found in the database.',
      responseType: 'notFound'
    }
  },

  fn: async function ({id}) {
    // load navbar items
    let textcontents = await TextContent.find({
      author: this.req.session.userId
    }).sort('title ASC');
    if (!textcontents) {throw 'notFound'; }
    // load individual record
    let textcontent = await TextContent.findOne({ id: id }).populate('author').populate('updatedFrom').populate('tags').populate('oldversions');
    if (!textcontent) { throw 'notFound'; }
    textcontent.createdAt = convertDate(textcontent.createdAt);
    textcontent.updatedAt = convertDate(textcontent.updatedAt);
    return {
      textcontents: textcontents,
      textcontent: textcontent
    };
  }
};

/* Converts a JS timestamp from milliseconds to readable time format */
/* TODO move to own file? */
function convertDate(date) {
  let ISODate = new Date(date);

  let day = ISODate.getDate();
  let month = ISODate.getMonth() + 1;
  let year = ISODate.getFullYear();
  let hour = ISODate.getHours();
  let min = ISODate.getMinutes();

  // adds leading zero
  month = (month < 10 ? '0' : '') + month;
  day = (day < 10 ? '0' : '') + day;
  hour = (hour < 10 ? '0' : '') + hour;
  min = (min < 10 ? '0' : '') + min;

  return day + '/' + month + '/' + year + ' ' + hour + ':' + min;
}
