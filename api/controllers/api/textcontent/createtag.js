module.exports = {


  friendlyName: 'Createtextcontent',


  description: 'Create text content.',


  inputs: {
    name: {
      description: 'The description of the content.',
      type: 'string',
      maxLength: 80,
      required: true
    },
    textcontent: {
      description: 'The id of the text content.',
      type: 'number',
      required: true
    }
  },


  exits: {},


  fn: async function (inputs) {
    sails.log.debug('create tag started');
    let colours = ['lightskyblue', 'lightgreen', 'orangered', 'lightsteelblue', 'lightseagreen', 'lightpink', 'orange'];
    const getRandomInt = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    };

    let generatedColour = colours[getRandomInt(0, colours.length)];
    let tag = {
      colour: generatedColour,
      name: inputs.name,
      textContentTag: inputs.textcontent
    };

    tag = await Tag.create(tag).fetch();

    sails.log.debug(tag);
    if (!tag) {
      throw 'notFound';
    }

    return tag;
  }

};
