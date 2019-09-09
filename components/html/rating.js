// import { url } from "inspector";

var defaultObj = {
  width: '500',
  height: '100',
  fill: '#ff0000',
  ratedFill: '#ff0000',
  unratedFill: '#ff7f7f',
  stroke: '#000000',
  ratedStroke: '#000000',
  unratedStroke: '#666666',
  strokeWidth: 2,
  flow: 'row',
  orientation: 'LtoR',
  noOfStars: 5,
  rating: 3.5,
  padding: 2,
  justifyContent: 'center',
  alignItems: 'center'
}

export default class Rating {
  constructor (container, obj) {
    this.obj = {}
    this.obj.width = (obj.width) ? (obj.width) : '500'
    this.obj.height = (obj.height) ? (obj.height) : '100'
    this.obj.fill = (obj.fill) ? (obj.fill) : '#ff0000'
    this.obj.ratedFill = (obj.ratedFill) ? (obj.ratedFill) : '#ff0000'
    this.obj.unratedFill = (obj.unratedFill) ? (obj.unratedFill) : '#ff7f7f'
    this.obj.stroke = (obj.stroke) ? (obj.stroke) : '#000000'
    this.obj.ratedStroke = (obj.ratedStroke) ? (obj.ratedStroke) : '#000000'
    this.obj.unratedStroke = (obj.unratedStroke) ? (obj.unratedStroke) : '#666666'
    this.obj.strokeWidth = (obj.strokeWidth) ? (obj.strokeWidth) : '2'
    this.obj.orientation = (obj.orientation) ? (obj.orientation) : 'LtoR'
    this.obj.noOfStars = (obj.noOfStars) ? (obj.noOfStars) : 5
    this.obj.rating = (obj.rating) ? (obj.rating) : 3.5
    this.obj.padding = (obj.padding) ? (obj.padding) : 5
    this.obj.justifyContent = (obj.justifyContent) ? (obj.justifyContent) : 'center'
    this.obj.alignItems = (obj.alignItems) ? (obj.alignItems) : 'center'
    this.obj.flow = 'row'
    this.obj.box = 0
    this.obj.innerBox = 0
    this.container = container
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    this.container.appendChild(this.svg)
    this._validateInput(defaultObj)
  }

  _validateInput (obj) {
    let flag = {
      width: 'true',
      height: 'true',
      fill: 'true',
      ratedFill: 'true',
      unratedFill: 'true',
      stroke: 'true',
      ratedStroke: 'true',
      unratedStroke: 'true',
      strokeWidth: 'true',
      orientation: 'true',
      noOfStars: 'true',
      rating: 'true',
      padding: 'true',
      justifyContent: 'true',
      alignItems: 'true',
      box: 'true'

    }

    let calculatedWidth = getWidth(this.obj.width)
    let calculatedHeight = getHeight(this.obj.height)
    if (!calculatedWidth || calculatedWidth < 10) {
      this.obj.width = obj.width
    }

    if (!calculatedHeight || calculatedHeight < 10) {
      this.obj.height = obj.height
    }

    if (checkHexValue(this.obj.fill)) {
      this.obj.fill = obj.fill
    }

    if (checkHexValue(this.obj.ratedFill)) {
      this.obj.ratedFill = obj.ratedFill
    }

    if (checkHexValue(this.obj.unratedFill)) {
      this.obj.unratedFill = obj.unratedFill
    }

    if (this.obj.ratedFill === this.obj.unratedFill) {
      this.obj.ratedFill = this.obj.fill
    }

    if (!checkHexValue(this.obj.stroke)) {
      if (!isNaN(this.obj.strokeWidth) && !(this.obj.strokeWidth < 0)) { this.obj.stroke = obj.stroke }
    }

    if (checkHexValue(this.obj.stroke)) {
      this.obj.stroke = obj.stroke
    }

    if (checkHexValue(this.obj.ratedStroke)) {
      this.obj.ratedStroke = obj.ratedStroke
    }

    if (checkHexValue(this.obj.unratedStroke)) {
      this.obj.unratedStroke = obj.unratedStroke
    }

    if (this.obj.ratedStroke === this.obj.unratedStroke) {
      this.obj.ratedStroke = this.obj.stroke
    }

    if (isNaN(this.obj.strokeWidth) || this.obj.strokeWidth < 0) {
      this.obj.strokeWidth = obj.strokeWidth
    }

    if (!(['LtoR', 'RtoL', 'TtoB', 'BtoT'].includes(this.obj.orientation))) {
      this.obj.orientation = obj.orientation
    }

    if (isNaN(this.obj.noOfStars) || this.obj.noOfStars < 0 || this.obj.noOfStars === 0 || greaterThanMaximumStars(getWidth(this.obj.width), getHeight(this.obj.height), this.obj.orientation, this.obj.noOfStars)) {
      this.obj.noOfStars = obj.noOfStars
    }

    if (isNaN(this.obj.rating) || this.obj.rating < 0) {
      this.obj.rating = obj.rating
    }

    if (this.obj.rating > this.obj.noOfStars) {
      this.obj.rating = this.obj.noOfStars
    }

    if (isNaN(this.obj.padding) || greaterThanMaximumPadding(this.obj.box, this.obj.padding) || this.obj.padding < 0) {
      this.obj.padding = obj.padding
    }

    if (!(['start', 'end', 'center', 'spaceEvenly'].includes(this.obj.justifyContent))) {
      this.obj.justifyContent = obj.justifyContent
    }

    if (!(['start', 'end', 'center'].includes(this.obj.alignItems))) {
      this.obj.alignItems = obj.alignItems
    }

    if (this.obj.box < 5) {
      flag.box = false
    }

    let drawSvg = true
    for (let prop in flag) {
      if (flag.hasOwnProperty(prop) && flag[prop] === 'false') { drawSvg = false }
    }
    if (drawSvg) { this._createSvg() }
  }

  _createSvg () {
    let child = this.svg.lastElementChild
    while (child) {
      this.svg.removeChild(child)
      child = this.svg.lastElementChild
    }
    this.svg.setAttribute('width', this.obj.width)
    this.svg.setAttribute('height', this.obj.height)
    this.obj.box = calculateBoxSize(getWidth(this.obj.width), getHeight(this.obj.height), this.obj.orientation, this.obj.noOfStars)
    this.obj.innerBox = this.obj.box - (2 * this.obj.padding)
    this._setPathAttribute()
  }

  _setPathAttribute () {
    let width = getWidth(this.obj.width)
    let height = getHeight(this.obj.height)
    if (this.flow === 'row') {
      this._createGradient(0, 100, 0, 0)
      let startHeight = (height - this.obj.box) / 2 + (this.obj.padding); let startWidth = this.obj.box / 2; let increment = this.obj.box
      if (this.obj.justifyContent === 'start') {

      } else if (this.obj.justifyContent === 'end') {
        startWidth += (width) - (this.obj.box * this.obj.noOfStars)
      } else if (this.obj.justifyContent === 'center') {
        startWidth += ((width) - (this.obj.box * this.obj.noOfStars)) / 2
      } else {
        startWidth += (width - (this.obj.box * this.obj.noOfStars)) / (this.obj.noOfStars)
        increment += (width - (this.obj.box * this.obj.noOfStars)) / (this.obj.noOfStars)
      }

      for (let i = 0; i < this.obj.noOfStars; i++) {
        this._createPath(startWidth, startHeight, i)
        startWidth += increment
      }
    } else {
      this._createGradient(0, 0, 0, 100)
      let startHeight = (this.obj.padding); let startWidth = this.obj.box / 2; let increment = this.obj.box
      if (this.obj.alignItems === 'start') {} else if (this.obj.alignItems === 'center') {
        startHeight += (height - (this.obj.box * this.obj.noOfStars)) / 2
      } else {
        startHeight += (height - (this.obj.box * this.obj.noOfStars))
      }

      if (this.obj.justifyContent === 'start') {

      } else if (this.obj.justifyContent === 'end') {
        startWidth += (width) - (this.obj.box * this.obj.noOfStars)
      } else if (this.obj.justifyContent === 'center') {
        startWidth += ((width) - (this.obj.box * this.obj.noOfStars)) / 2
      } else {
        startWidth += (width - (this.obj.box * this.obj.noOfStars)) / (this.obj.noOfStars)
        increment += (width - (this.obj.box * this.obj.noOfStars)) / (this.obj.noOfStars)
      }

      for (let i = 0; i < this.obj.noOfStars; i++) {
        this._createPath(startWidth, startHeight, i)
        startHeight += increment
      }
    }
  }

  _createPath (startWidth, startHeight, index) {
    let path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    let dAttr = 'm' + startWidth + ' ' + startHeight + ' ' +
        'l' + -(this.obj.innerBox / 4) + ' ' + (this.obj.innerBox / 3) + ' ' +
        'l' + -(this.obj.innerBox / 4) + ' ' + 0 + ' ' +
        'l' + (this.obj.innerBox / 4) + ' ' + (this.obj.innerBox / 3) + ' ' +
        'l' + -(this.obj.innerBox / 4) + ' ' + (this.obj.innerBox / 3) + ' ' +
        'l' + (this.obj.innerBox / 2) + ' ' + -(this.obj.innerBox / 6) + ' ' +
        'l' + (this.obj.innerBox / 2) + ' ' + (this.obj.innerBox / 6) + ' ' +
        'l' + -(this.obj.innerBox / 4) + ' ' + -(this.obj.innerBox / 3) + ' ' +
        'l' + (this.obj.innerBox / 4) + ' ' + -(this.obj.innerBox / 3) + ' ' +
        'l' + -(this.obj.innerBox / 4) + ' ' + 0 + 'z'

    path.setAttribute('d', dAttr)
    if (index < this.obj.rating) {
      path.style.fill = this.obj.ratedFill
      path.style.stroke = this.obj.ratedStroke
    } else {
      path.style.fill = this.obj.unratedFill
      path.style.stroke = this.obj.unratedStroke
    }
    if (getFraction(this.obj.rating) !== 0) {
      if (getPartialRated(this.obj.rating) === index) {
        path.style.fill = 'url(#grad)'
      }
    }
    path.style.strokeWidth = this.obj.strokeWidth
    this.svg.appendChild(path)
  }

  _createGradient (x1, x2, y1, y2) {
    let defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
    let grad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient')
    grad.setAttribute('x1', x1 + '%')
    grad.setAttribute('x2', x2 + '%')
    grad.setAttribute('y1', y1 + '%')
    grad.setAttribute('y2', y2 + '%')
    grad.setAttribute('id', 'grad')
    let stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
    stop1.setAttribute('offset', (getFraction(this.obj.rating) + '%'))
    stop1.setAttribute('stop-color', this.obj.ratedFill)
    var stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
    stop2.setAttribute('offset', (getFraction(this.obj.rating) + '%'))
    stop2.setAttribute('stop-color', this.obj.unratedFill)
    grad.appendChild(stop1)
    grad.appendChild(stop2)
    defs.appendChild(grad)
    this.svg.appendChild(defs)
  }

  _update (obj) {
    let prevObj = Object.assign({}, this.obj)
    if (obj.width) { this.obj.width = obj.width }
    if (obj.height) { this.obj.height = obj.height }
    if (obj.fill) { this.obj.fill = obj.fill }
    if (obj.ratedFill) { this.obj.ratedFill = obj.ratedFill }
    if (obj.unratedFill) { this.obj.unratedFill = obj.unratedFill }
    if (obj.stroke) { this.obj.stroke = obj.stroke }
    if (obj.ratedStroke) { this.obj.ratedStroke = obj.ratedStroke }
    if (obj.unratedStroke) { this.obj.unratedStroke = obj.unratedStroke }
    if (obj.strokeWidth) { this.obj.strokeWidth = obj.strokeWidth }
    if (obj.orientation) { this.obj.orientation = obj.orientation }
    if (obj.noOfStars) { this.obj.noOfStars = obj.noOfStars }
    if (obj.rating) { this.obj.rating = obj.rating }
    if (obj.padding) { this.obj.padding = obj.padding }
    if (obj.justifyContent) { this.obj.justifyContent = obj.justifyContent }
    if (obj.alignItems) { this.obj.alignItems = obj.alignItems }
    this._validateInput(prevObj)
  }
}

function checkHexValue (str) {
  let regExpr = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
  if (regExpr.test(str)) { return true }
  return false
}

function calculateBoxSize (width, height, flow, noOfStars) {
  if (flow === 'row') {
    return ((width / noOfStars) < height) ? (width / noOfStars) : height
  } else {
    return ((height / noOfStars) < width) ? (height / noOfStars) : width
  }
}

function getFraction (rating) {
  return (rating - (Math.trunc(rating))) * 100
}

function getPartialRated (rating) {
  return Math.trunc(rating)
}

function greaterThanMaximumStars (width, height, orientation, noOfStars) {
  let box = calculateBoxSize(width, height, orientation, noOfStars)
  if (box <= 10) { return true }
  return false
}

function greaterThanMaximumPadding (box, padding) {
  if (padding > (box * 10 / 100)) { return true }
  return false
}

function getWidth (width) {
  let widthArgs = width.split('%')
  let w = Number(widthArgs[0])
  return w
}

function getHeight (height) {
  let heightArgs = height.split('%')
  let h = Number(heightArgs[0])
  return h
}
