import { Story, notes, configs } from '../src/lib/story'
import Rating from '../components/html/rating'

const ratingStory = new Story('rating').addMetas([configs()])

var defaultObj = {
  width: '500',
  height: '100',
  fill: 'red',
  ratedFill: 'red',
  unratedFill: 'blue',
  stroke: 'black',
  ratedStroke: 'black',
  unratedStroke: 'gray',
  strokeWidth: 0,
  orientation: 'LtoR',
  noOfStars: 5,
  rating: 3.5,
  padding: 5,
  justifyContent: 'center',
  alignItems: 'center'
}

ratingStory.addChapter(
  'Default Value',
  story => {
    var newRating = new Rating(story, {})
    if (newRating._validateInput(defaultObj)) {
      newRating._setPathAttribute()
    }
    setTimeout(function () {
      newRating._update({
        ratedFill: 'black'
      })
    }, 3000)
  },
  [
    notes('Rating with default values')
  ]
)

ratingStory.addChapter(
  'Width or Height value 0',
  story => {
    var newRating = new Rating(story, {
      width: 0,
      height: 0
    })
    if (newRating._validateInput(defaultObj)) {
      newRating._setPathAttribute()
    }
  },
  [
    notes('For width = 0 or height = 0 ,default is printed')
  ]
)

ratingStory.addChapter(
  'Width or Height value negative',
  story => {
    var newRating = new Rating(story, {
      width: '-10',
      height: '-11'
    })
    if (newRating._validateInput(defaultObj)) {
      newRating._setPathAttribute()
    }
  },
  [
    notes('For negative values of width or height ,default is printed')
  ]
)

ratingStory.addChapter(
  'Width or Height value not a number',
  story => {
    var newRating = new Rating(story, {
      width: 'abc',
      height: 'abc'
    })
    if (newRating._validateInput(defaultObj)) {
      newRating._setPathAttribute()
    }
  },
  [
    notes('For width = NaN or height = NaN, default is printed')
  ]
)

ratingStory.addChapter(
  'Width or Height value less than 10',
  story => {
    var newRating = new Rating(story, {
      width: '4',
      height: '4'
    })
    if (newRating._validateInput(defaultObj)) {
      newRating._setPathAttribute()
    }
  },
  [
    notes('For width < 10 or height < 10, default is printed')
  ]
)

ratingStory.addChapter(
  'fill value not valid',
  story => {
    var newRating = new Rating(story, {
      fill: '##10'
    })
    if (newRating._validateInput(defaultObj)) {
      newRating._setPathAttribute()
    }
  },
  [
    notes('For invalid fill value, default [fill: red] is applied')
  ]
)

ratingStory.addChapter(
  'ratedFill value not valid',
  story => {
    var newRating = new Rating(story, {
      ratedFill: '##10'
    })
    if (newRating._validateInput(defaultObj)) {
      newRating._setPathAttribute()
    }
  },
  [
    notes('For invalid ratedFill value, default [ratedFill: red] is applied')
  ]
)

ratingStory.addChapter(
  'unratedFill value not valid',
  story => {
    var newRating = new Rating(story, {
      unratedFill: '##10'
    })
    if (newRating._validateInput(defaultObj)) {
      newRating._setPathAttribute()
    }
  },
  [
    notes('For invalid unratedFill value, default [unratedFill: blue] is applied')
  ]
)

ratingStory.addChapter(
  'ratedFill is equal to unratedFill',
  story => {
    var newRating = new Rating(story, {
      ratedFill: 'blue',
      unratedFill: 'blue'
    })
    if (newRating._validateInput(defaultObj)) {
      newRating._setPathAttribute()
    }
  },
  [
    notes('For same value of ratedFill and unratedFill, ratedFill will take fill value')
  ]
)

ratingStory.addChapter(
  'Stroke value invalid',
  story => {
    var newRating = new Rating(story, {
      stroke: '##0'
    })
    if (newRating._validateInput(defaultObj)) {
      newRating._setPathAttribute()
    }
  },
  [
    notes('For invalid stroke value, default [stroke: blue] is applied')
  ]
)

ratingStory.addChapter(
  'Stroke-Width value negative',
  story => {
    var newRating = new Rating(story, {
      strokeWidth: -10
    })
    if (newRating._validateInput(defaultObj)) {
      newRating._setPathAttribute()
    }
  },
  [
    notes('For negative strokeWidth value, default [strokeWidth: 0] is applied')
  ]
)

ratingStory.addChapter(
  'Stroke-Width value not a number',
  story => {
    var newRating = new Rating(story, {
      strokeWidth: 'abc'
    })
    if (newRating._validateInput(defaultObj)) {
      newRating._setPathAttribute()
    }
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
  'Stroke-Width is valid but stroke is not valid',
  story => {
    var newRating = new Rating(story, {
      stroke: '##0',
      strokeWidth: 2
    })
    if (newRating._validateInput(defaultObj)) {
      newRating._setPathAttribute()
    }
  },
  [
    notes('For stroke-width valid and stroke invalid, default is applied')
  ]
)

ratingStory.addChapter(
  'orientation value not valid',
  story => {
    var newRating = new Rating(story, {
      orientation: 'LLR'
    })
    if (newRating._validateInput(defaultObj)) {
      newRating._setPathAttribute()
    }
  },
  [
    notes('For invalid orientation value , default [orientation : LtoR] is applied')
  ]
)

ratingStory.addChapter(
  'padding value NaN',
  story => {
    var newRating = new Rating(story, {
      padding: 'ab'
    })
    if (newRating._validateInput(defaultObj)) {
      newRating._setPathAttribute()
    }
  },
  [
    notes('For padding = NaN, default padding is applied')
  ]
)

ratingStory.addChapter(
  'padding value negative',
  story => {
    var newRating = new Rating(story, {
      padding: -10
    })
    if (newRating._validateInput(defaultObj)) {
      newRating._setPathAttribute()
    }
  },
  [
    notes('For padding value negative, default padding is applied')
  ]
)

ratingStory.addChapter(
  'padding value greater than maximum permissible',
  story => {
    var newRating = new Rating(story, {
      padding: 100
    })
    if (newRating._validateInput(defaultObj)) {
      newRating._setPathAttribute()
    }
  },
  [
    notes('For padding greater than maximum permissible, default padding is applied')
  ]
)

ratingStory.addChapter(
  'justifyContent value not valid',
  story => {
    var newRating = new Rating(story, {
      justifyContent: 'abc'
    })
    if (newRating._validateInput(defaultObj)) {
      newRating._setPathAttribute()
    }
  },
  [
    notes('For justifyContent value invalid, default [justifyContent: center] is applied')
  ]
)

ratingStory.addChapter(
  'alignItems value not valid',
  story => {
    var newRating = new Rating(story, {
      alignItems: 'abc'
    })
    if (newRating._validateInput(defaultObj)) {
      newRating._setPathAttribute()
    }
  },
  [
    notes('For alignItems value invalid, default [alignItems: center] is applied')
  ]
)

ratingStory.addChapter(
  'noOfStars value NaN',
  story => {
    var newRating = new Rating(story, {
      noOfStars: 'abc'
    })
    if (newRating._validateInput(defaultObj)) {
      newRating._setPathAttribute()
    }
  },
  [
    notes('For noOfStars = NaN, no output')
  ]
)

ratingStory.addChapter(
  'noOfStars value negative',
  story => {
    var newRating = new Rating(story, {
      noOfStars: -10
    })
    if (newRating._validateInput(defaultObj)) {
      newRating._setPathAttribute()
    }
  },
  [
    notes('For negative value of noOfStars, no output')
  ]
)

ratingStory.addChapter(
  'noOfStars value 0',
  story => {
    var newRating = new Rating(story, {
      noOfStars: 0
    })
    if (newRating._validateInput(defaultObj)) {
      newRating._setPathAttribute()
    }
  },
  [
    notes('For noOfStars = 0, no output')
  ]
)

ratingStory.addChapter(
  'noOfStars value greater than maximum permissible',
  story => {
    var newRating = new Rating(story, {
      noOfStars: 1000
    })
    if (newRating._validateInput(defaultObj)) {
      newRating._setPathAttribute()
    }
  },
  [
    notes('For noOfStars value greater than maximum permissible, no output')
  ]
)

ratingStory.addChapter(
  'rating value NaN',
  story => {
    var newRating = new Rating(story, {
      rating: 'abc'
    })
    if (newRating._validateInput(defaultObj)) {
      newRating._setPathAttribute()
    }
  },
  [
    notes('For rating value NaN, default [rating : 5] is applied')
  ]
)

ratingStory.addChapter(
  'rating value negative',
  story => {
    var newRating = new Rating(story, {
      rating: -10
    })
    if (newRating._validateInput(defaultObj)) {
      newRating._setPathAttribute()
    }
  },
  [
    notes('For negative rating value , default [rating : 5] is applied')
  ]
)

ratingStory.addChapter(
  'rating value greater than noOfStars',
  story => {
    var newRating = new Rating(story, {
      rating: 10
    })
    if (newRating._validateInput(defaultObj)) {
      newRating._setPathAttribute()
    }
  },
  [
    notes('For rating value greater than noOfStars, default [rating : 5] is applied')
  ]
)

ratingStory.addChapter(
  'BBox size less than 5',
  story => {
    var newRating = new Rating(story, {
      width: '10',
      height: '10',
      noOfStars: 20
    })
    if (newRating._validateInput(defaultObj)) {
      newRating._setPathAttribute()
    }
  },
  [
    notes('When BBox size is less than 5, no output')
  ]
)

ratingStory.addChapter(
  'Update width to invalid value',
  story => {
    var newRating = new Rating(story, obj)
    newRating.update('width', 0)
  },
  [
    notes('Updating width to invalid value sets width to the previous value')
  ]
)

ratingStory.addChapter(
  'Update width to any valid value',
  story => {
    var newRating = new Rating(story, obj)
    newRating.update('width', 500)
  },
  [
    notes('Updated width')
  ]
)

ratingStory.addChapter(
  'Update height to invalid value',
  story => {
    var newRating = new Rating(story, obj)
    newRating.update('height', 0)
  },
  [
    notes('Updating height to invalid value sets height to the previous value')
  ]
)

ratingStory.addChapter(
  'Update height to any valid value',
  story => {
    var newRating = new Rating(story, obj)
    newRating.update('width', 500)
  },
  [
    notes('Updated height')
  ]
)

ratingStory.addChapter(
  'Update fill and stroke to invalid value',
  story => {
    var newRating = new Rating(story, obj)
    newRating.update('fill', 0, 'stroke', 0)
  },
  [
    notes('Updating fill and stroke to invalid value sets them to the previous value')
  ]
)

ratingStory.addChapter(
  'Update fill and stroke to any valid value',
  story => {
    var newRating = new Rating(story, obj)
    var func = newRating.update('fill', 'yellow', 'stroke', 'blue')
    setTimeout(func, 10000)
  },
  [
    notes('Updated fill and stroke')
  ]
)

ratingStory.addChapter(
  'Update ratedFill to any valid value',
  story => {
    var newRating = new Rating(story, obj)
    var func = newRating.update('ratedFill', 'yellow')
    setTimeout(func, 10000)
  },
  [
    notes('Updated ratedFill')
  ]
)

ratingStory.addChapter(
  'Update unratedFill to any valid value',
  story => {
    var newRating = new Rating(story, obj)
    var func = newRating.update('unratedFill', 'yellow')
    setTimeout(func, 10000)
  },
  [
    notes('Updated unratedFill')
  ]
)

ratingStory.addChapter(
  'Update padding to permissible',
  story => {
    obj.padding = 5
    var newRating = new Rating(story, obj)
    newRating.checkSvgDimensions()
  },
  [
    notes('Padding updated')
  ]
)

ratingStory.addChapter(
  'Update justifyContent',
  story => {
    var newRating = new Rating(story, obj)
    setTimeout(function () {
      newRating._update({
        justifyContent: 'end'
      })
    }, 3000)
  },
  [
    notes('JustifyContent updated')
  ]
)

ratingStory.addChapter(
  'Update noOfStars ',
  story => {
    var newRating = new Rating(story, obj)
    setTimeout(function () {
      newRating._update({
        noOfStars: 4
      })
    }, 3000)
  },
  [
    notes('noOfStars value if permissible then updated, else previous output')
  ]
)

ratingStory.addChapter(
  'Update rating',
  story => {
    var newRating = new Rating(story, obj)
    setTimeout(function () {
      newRating._update({
        rating: 4
      })
    }, 3000)
  },
  [
    notes('rating value if permissible then updated, else previous output')
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
