import { Story, notes, configs } from '../src/lib/story'
import Rating from '../components/html/rating'

const ratingStory = new Story('rating').addMetas([configs()])

var obj = {
  width: 500,
  height: 100,
  fill: 'red',
  ratedFill: 'red',
  unratedFill: 'blue',
  stroke: 'blue',
  strokeWidth: 0,
  orientation: 'LtoR',
  noOfStars: 5,
  rating: 3.5,
  padding: 20,
  justifyContent: 'center'
}

ratingStory.addChapter(
  'Default Value',
  story => {
    var newRating = new Rating(story, obj)
    newRating.addSvg()
  },
  [
    notes('Rating with default values')
  ]
)

ratingStory.addChapter(
  'Width or Height value 0',
  story => {
    obj.width = 0
    obj.height = 0
    var newRating = new Rating(story, obj)
    newRating.checkSvgDimensions()
  },
  [
    notes('For width = 0 or height = 0 ,no output')
  ]
)

ratingStory.addChapter(
  'Width or Height value negative',
  story => {
    obj.width = '-10px'
    obj.height = 0
    var newRating = new Rating(story, obj)
    newRating.checkSvgDimensions()
  },
  [
    notes('For negative values of width or height, no output')
  ]
)

ratingStory.addChapter(
  'Width or Height value not a number',
  story => {
    obj.width = 'abc'
    obj.height = 'bcd'
    var newRating = new Rating(story, obj)
    newRating.checkSvgDimensions()
  },
  [
    notes('For width = NaN or height = NaN, no output')
  ]
)

ratingStory.addChapter(
  'fill value not valid',
  story => {
    obj.fill = 'abc'
    var newRating = new Rating(story, obj)
    newRating.checkStarProperties()
  },
  [
    notes('For invalid fill value, default [fill: red] is applied')
  ]
)

ratingStory.addChapter(
  'ratedFill value not valid',
  story => {
    obj.ratedFill = 'abc'
    var newRating = new Rating(story, obj)
    newRating.checkStarProperties()
  },
  [
    notes('For invalid ratedFill value, default [ratedFill: red] is applied')
  ]
)

ratingStory.addChapter(
  'unratedFill value not valid',
  story => {
    obj.unratedFill = 'abc'
    var newRating = new Rating(story, obj)
    newRating.checkStarProperties()
  },
  [
    notes('For invalid unratedFill value, default [unratedFill: blue] is applied')
  ]
)

ratingStory.addChapter(
  'Stroke value invalid',
  story => {
    obj.stroke = 'abc'
    var newRating = new Rating(story, obj)
    newRating.checkStarProperties()
  },
  [
    notes('For invalid stroke value, default [stroke: blue] is applied')
  ]
)

ratingStory.addChapter(
  'Stroke-Width value negative',
  story => {
    obj.strokeWidth = -3
    var newRating = new Rating(story, obj)
    newRating.checkStarProperties()
  },
  [
    notes('For negative strokeWidth value, default [strokeWidth: 0] is applied')
  ]
)

ratingStory.addChapter(
  'Stroke-Width value not a number',
  story => {
    obj.strokeWidth = 'abc'
    var newRating = new Rating(story, obj)
    newRating.checkStarProperties()
  },
  [
    notes('For strokeWidth = NaN, default [strokeWidth: 0] is applied')
  ]
)

ratingStory.addChapter(
  'Stroke-Width value greater than maximum permissible',
  story => {
    obj.strokeWidth = 100
    var newRating = new Rating(story, obj)
    newRating.checkStarProperties()
  },
  [
    notes('For strokeWidth greater than maximum permissible, default [strokeWidth: 0] is applied')
  ]
)

ratingStory.addChapter(
  'orientation value not valid',
  story => {
    obj.orientation = 'LLR'
    var newRating = new Rating(story, obj)
    newRating.checkStarProperties()
  },
  [
    notes('For invalid orientation value , default [orientation : LtoR] is applied')
  ]
)

ratingStory.addChapter(
  'padding value NaN',
  story => {
    obj.padding = 'abc'
    var newRating = new Rating(story, obj)
    newRating.checkStarProperties()
  },
  [
    notes('For padding = NaN, no output')
  ]
)

ratingStory.addChapter(
  'padding value negative',
  story => {
    obj.padding = -10
    var newRating = new Rating(story, obj)
    newRating.checkStarProperties()
  },
  [
    notes('For padding value negative, no output')
  ]
)

ratingStory.addChapter(
  'padding value greater than maximum permissible',
  story => {
    obj.padding = 500
    var newRating = new Rating(story, obj)
    newRating.checkStarProperties()
  },
  [
    notes('For padding greater than maximum permissible, no output')
  ]
)

ratingStory.addChapter(
  'justifyContent value not valid',
  story => {
    obj.justifyContent = 'abc'
    var newRating = new Rating(story, obj)
    newRating.checkStarProperties()
  },
  [
    notes('For justifyContent value invalid, default [justifyContent: center] is applied')
  ]
)

ratingStory.addChapter(
  'noOfStars value NaN',
  story => {
    obj.noOfStars = 'abc'
    var newRating = new Rating(story, obj)
    newRating.checkStarProperties()
  },
  [
    notes('For noOfStars = NaN, no output')
  ]
)

ratingStory.addChapter(
  'noOfStars value negative',
  story => {
    obj.noOfStars = -10
    var newRating = new Rating(story, obj)
    newRating.checkStarProperties()
  },
  [
    notes('For negative value of noOfStars, no output')
  ]
)

ratingStory.addChapter(
  'noOfStars value 0',
  story => {
    obj.noOfStars = 0
    var newRating = new Rating(story, obj)
    newRating.checkStarProperties()
  },
  [
    notes('For noOfStars = 0, no output')
  ]
)

ratingStory.addChapter(
  'noOfStars value greater than maximum permissible',
  story => {
    obj.noOfStars = 20
    var newRating = new Rating(story, obj)
    newRating.checkStarProperties()
  },
  [
    notes('For noOfStars value greater than maximum permissible, no output')
  ]
)

ratingStory.addChapter(
  'rating value NaN',
  story => {
    obj.rating = NaN
    var newRating = new Rating(story, obj)
    newRating.checkStarProperties()
  },
  [
    notes('For rating value NaN, default [rating : 5] is applied')
  ]
)

ratingStory.addChapter(
  'rating value negative',
  story => {
    obj.rating = NaN
    var newRating = new Rating(story, obj)
    newRating.checkStarProperties()
  },
  [
    notes('For negative rating value , default [rating : 5] is applied')
  ]
)

ratingStory.addChapter(
  'rating value greater than noOfStars',
  story => {
    obj.rating = NaN
    var newRating = new Rating(story, obj)
    newRating.checkStarProperties()
  },
  [
    notes('For rating value greater than noOfStars, default [rating : 5] is applied')
  ]
)

// ratingStory.addChapter(
//   'with a 30px dimensions',
//   story => {
//     rating(story, { width: '30px', height: '30px' })
//   },
//   [
//     notes('This is the rating as it appears by default, with 30px width and height')
//   ]
// )

// ratingStory.addChapter(
//   'with a orange color',
//   story => {
//     rating(story, { bgColor: 'orange' })
//   },
//   [
//     notes('This is the rating as it appears when rendered with an orange fill.')
//   ]
// )

export default ratingStory
