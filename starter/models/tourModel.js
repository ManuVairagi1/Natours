const { default: mongoose } = require('mongoose');

const toursSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      Required: [true, 'You must contain a name'],
      unique: true,
    },
    duration: {
      type: Number,
      required: [true, 'Must have duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'Must have group'],
    },
    difficulty: {
      type: String,
      required: [true, 'must have difficulty'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },

    price: {
      type: Number,
    },
    priceDiscount: {
      type: Number,
    },
    Summary: {
      type: String,
      // required: [true, 'required summary'],
      trim: true,
    },
    stops: {
      type: Number,
    },
    rating: {
      type: Number,
    },
    description: {
      type: String,
    },
    imageCover: {
      type: String,
      required: [true, 'image Required'],
    },
    images: [String],
    CreatedAt: {
      type: Date,
      default: Date.now(),
    },
    startDate: [Date],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

toursSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

const Tour = mongoose.model('Tour', toursSchema);

module.exports = Tour;
