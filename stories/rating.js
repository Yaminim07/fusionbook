import { Story, notes, configs } from '../src/lib/story'
import rating from '../components/html/rating'

const ratingStory = new Story('rating').addMetas([configs()])

ratingStory.addChapter(
  'with defaults',
  story => {
    var obj = {
      color: 'red',
      border: 'blue',
      borderWidth: 2,
      horizontal: 'true',
      width: 500,
      height: 100

    }
    rating(story, obj)
  },
  [
    notes('Horizontal arrangement.')
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
