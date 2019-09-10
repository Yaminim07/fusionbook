import { Story, notes, configs } from '../src/lib/story'
import Rating from '../components/html/rating'

const ratingStory = new Story('rating').addMetas([configs()])

ratingStory.addChapter(
  'Default Value',
  story => {
    var newRating = new Rating(story, {})
  },
  [
    notes('Rating with default values')
  ]
)

ratingStory.addChapter(
  'Vertical Arrangement',
  story => {
    var newRating = new Rating(story, {
      width: '100',
      height: '800',
      flow: 'column',
      orientation: 'TtoB',
      alignItems: 'end',
      justifyContent: 'start'
    })
  },
  [
    notes('Vertical Arrangement')
  ]
)

ratingStory.addChapter(
  'Width or Height value 0',
  story => {
    var newRating = new Rating(story, {
      width: '0',
      height: '0'
    })
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
      height: '100'
    })
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
  },
  [
    notes('For invalid unratedFill value, default [unratedFill: blue] is applied')
  ]
)

ratingStory.addChapter(
  'ratedFill is equal to unratedFill and ratedStroke is equal to unratedStroke',
  story => {
    var newRating = new Rating(story, {
      ratedFill: '#a52a2a',
      unratedFill: '#a52a2a',
      ratedStroke: '#C0C0C0',
      unratedStroke: '#C0C0C0',
      strokeWidth: 2
    })
  },
  [
    notes('For same value of ratedFill and unratedFill, ratedFill will take fill value.Same for stroke values')
  ]
)

ratingStory.addChapter(
  'Stroke value invalid',
  story => {
    var newRating = new Rating(story, {
      stroke: '##0'
    })
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
  },
  [
    notes('For strokeWidth = NaN, default [strokeWidth: 0] is applied')
  ]
)

ratingStory.addChapter(
  'Stroke-Width is valid but stroke is not valid',
  story => {
    var newRating = new Rating(story, {
      stroke: '##0',
      strokeWidth: 2
    })
  },
  [
    notes('For stroke-width valid and stroke invalid, default stroke is applied')
  ]
)

ratingStory.addChapter(
  'orientation value not valid',
  story => {
    var newRating = new Rating(story, {
      orientation: 'LLR'
    })
  },
  [
    notes('For invalid orientation value , default [orientation : LtoR] is applied')
  ]
)

ratingStory.addChapter(
  'orientation to RtoL and justifyContent to end',
  story => {
    var newRating = new Rating(story, {})
    setTimeout(function () {
      newRating._update({
        orientation: 'RtoL',
        justifyContent: 'end'
      })
    }, 2000)
  },
  [
    notes('Orientation RtoL and justifyContent = end is applied')
  ]
)

ratingStory.addChapter(
  'padding value NaN',
  story => {
    var newRating = new Rating(story, {
      padding: 'ab'
    })
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
  },
  [
    notes('For noOfStars = 0, no output')
  ]
)

ratingStory.addChapter(
  'rating value NaN',
  story => {
    var newRating = new Rating(story, {
      rating: 'abc'
    })
  },
  [
    notes('For rating value NaN, default [rating : 3.5] is applied')
  ]
)

ratingStory.addChapter(
  'rating value negative',
  story => {
    var newRating = new Rating(story, {
      rating: -10
    })
  },
  [
    notes('For negative rating value , default [rating : 3.5] is applied')
  ]
)

ratingStory.addChapter(
  'Update padding to permissible',
  story => {
    var newRating = new Rating(story, {})
    setTimeout(function () {
      newRating._update({
        padding: 10
      })
    }, 2000)
  },
  [
    notes('Padding updated')
  ]
)

ratingStory.addChapter(
  'Update justifyContent',
  story => {
    var newRating = new Rating(story, {})
    setTimeout(function () {
      newRating._update({
        width: '900',
        height: '100',
        justifyContent: 'right'
      })
    }, 2000)
  },
  [
    notes('JustifyContent updated')
  ]
)

ratingStory.addChapter(
  'Update rating to permissible',
  story => {
    var newRating = new Rating(story, {})
    setTimeout(function () {
      newRating._update({
        rating: 4
      })
    }, 2000)
  },
  [
    notes('rating value is permissible')
  ]
)

ratingStory.addChapter(
  'Update rating to greater than noOfStars',
  story => {
    var newRating = new Rating(story, {})
    setTimeout(function () {
      newRating._update({
        rating: 8
      })
    }, 2000)
  },
  [
    notes('when rating value is greater than noOfStars, rating = noOfStars is set')
  ]
)

ratingStory.addChapter(
  'Two updations',
  story => {
    var newRating = new Rating(story, {})
    setTimeout(function () {
      newRating._update({
        width: '5',
        height: '300',
        noOfStars: 20

      })
    }, 2000)
    setTimeout(function () {
      newRating._update({
        width: '2000'

      })
    }, 4000)
  },
  [
    notes('In case of two updations, previous valid value is retained')
  ]
)

ratingStory.addChapter(
  'Count updations in 100ms',
  story => {
    var newRating = new Rating(story, {})
    var count = 0
    var curTime = 0
    var startTime = (new Date().getTime() * 1)
    while (curTime < 100) {
      newRating._update({
        padding: 10
      })
      count++
      curTime = (new Date().getTime() * 1) - startTime
    }
    console.log('count :' + count)
  },
  [
    notes('In case of two updations, previous valid value is retained')
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
