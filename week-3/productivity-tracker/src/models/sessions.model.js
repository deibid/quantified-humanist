// sessions-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const sessions = new Schema({
    sittingArea: {
      type: String,
      required: true
    },
    intendedAmountOfWork: {
      type: Number,
      required: true
    },
    realAmountOfWork: {
      type: Number,
      required: true
    },
    externalInterruptions: {
      type: Number,
      required: true
    },
    internalInterruptions: {
      type: Number,
      required: true
    },
    result: {
      type: String,
      required: true
    },

  }, {
      timestamps: true
    });

  return mongooseClient.model('sessions', sessions);
};
