// import { url } from "inspector";

export default class Rating {
  constructor (container, obj) {
    this.prop = {}
    this.prop.width = '500'
    this.prop.height = '100'
    this.prop.fill = '#ff0000'
    this.prop.ratedFill = '#ff0000'
    this.prop.unratedFill = '#FA8072'
    this.prop.stroke = '#000000'
    this.prop.ratedStroke = '#000000'
    this.prop.unratedStroke = '#666666'
    this.prop.strokeWidth = 0
    this.prop.orientation = 'LtoR'
    this.prop.noOfStars = 5
    this.prop.rating = 3.5
    this.prop.padding = 5
    this.prop.justifyContent = 'center'
    this.prop.alignItems = 'center'
    this.prop.flow = 'row'
    this.prop.box = 0
    this.prop.innerBox = 0
    this.stars = []
    this.container = container
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    this.defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
    this.container.appendChild(this.svg)
    this.svg.appendChild(this.defs)
    this._validateInput(obj)
  }

  _validateInput (obj) {
    var drawSvg = true

    if (obj.hasOwnProperty('width')) {
      let calculatedWidth = getWidth(obj.width)
      if (!calculatedWidth || calculatedWidth < 10) {
      } else {
        this.prop.width = obj.width
      }
    }

    if (obj.hasOwnProperty('height')) {
      let calculatedHeight = getHeight(obj.height)
      if (!calculatedHeight || calculatedHeight < 10) {
      } else {
        this.prop.height = obj.height
      }
    }

    if (obj.ratedFill === obj.unratedFill) {
      obj.ratedFill = this.prop.fill
    }

    if (obj.hasOwnProperty('fill') && checkHexValue(obj.fill)) {
      this.prop.fill = obj.fill
    }

    if (obj.hasOwnProperty('ratedFill') && checkHexValue(obj.ratedFill)) {
      this.prop.ratedFill = obj.ratedFill
    }

    if (obj.hasOwnProperty('unratedFill') && checkHexValue(obj.unratedFill)) {
      this.prop.unratedFill = obj.unratedFill
    }

    if (obj.ratedStroke === obj.unratedStroke) {
      obj.ratedStroke = this.prop.stroke
    }

    if (obj.hasOwnProperty('stroke') && checkHexValue(obj.stroke)) {
      this.prop.stroke = obj.stroke
    }

    if (obj.hasOwnProperty('ratedStroke') && checkHexValue(obj.ratedStroke)) {
      this.prop.ratedStroke = obj.ratedStroke
    }

    if (obj.hasOwnProperty('unratedStroke') && checkHexValue(obj.unratedStroke)) {
      this.prop.unratedStroke = obj.unratedStroke
    }

    if (obj.hasOwnProperty('strokeWidth') && !isNaN(obj.strokeWidth) && obj.strokeWidth > 0) {
      this.prop.strokeWidth = obj.strokeWidth
    }

    if (obj.hasOwnProperty('flow') && ['row', 'column'].includes(obj.flow)) {
      this.prop.flow = obj.flow
    }

    if (obj.hasOwnProperty('orientation') && ['LtoR', 'RtoL', 'TtoB', 'BtoT'].includes(obj.orientation)) {
      this.prop.orientation = obj.orientation
    }

    if (obj.hasOwnProperty('noOfStars')) {
      if (!isNaN(obj.noOfStars) && !(obj.noOfStars < 0) && !(obj.noOfStars === 0)) {
        this.prop.noOfStars = obj.noOfStars
      } else {
        drawSvg = false
      }
    }

    if (obj.hasOwnProperty('rating') && !isNaN(obj.rating) && obj.rating > 0 && obj.rating < this.prop.noOfStars) {
      this.prop.rating = obj.rating
    } else if (obj.rating > this.prop.noOfStars) {
      this.prop.rating = this.prop.noOfStars
    }

    if (obj.hasOwnProperty('padding') && !isNaN(obj.padding) && !(greaterThanMaximumPadding(this.prop.box, obj.padding)) && (obj.padding > 0)) {
      this.prop.padding = obj.padding
    }

    if (obj.hasOwnProperty('justifyContent') && ['start', 'end', 'center', 'spaceEvenly'].includes(obj.justifyContent)) {
      this.prop.justifyContent = obj.justifyContent
    }

    if (obj.hasOwnProperty('alignItems') && ['start', 'end', 'center'].includes(obj.alignItems)) {
      this.prop.alignItems = obj.alignItems
    }

    if (drawSvg) { this._createSvg() }
  }

  _createSvg () {
    this.svg.setAttribute('width', this.prop.width)
    this.svg.setAttribute('height', this.prop.height)
    this.prop.box = calculateBoxSize(getWidth(this.prop.width), getHeight(this.prop.height), this.prop.flow, this.prop.noOfStars)
    this.prop.innerBox = this.prop.box - (2 * this.prop.padding)
    let width = getWidth(this.prop.width)
    let height = getHeight(this.prop.height)

    for (let i = this.stars.length; i < this.prop.noOfStars; i++) {
      let path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      this.svg.appendChild(path)
      this.stars.push(path)
    }
    if (this.prop.flow === 'row') {
      this._createGradient(0, 100, 0, 0)
      let startHeight = this.prop.padding; let startWidth = this.prop.box / 2; let increment = this.prop.box
      if (this.prop.justifyContent === 'start') {

      } else if (this.prop.justifyContent === 'end') {
        startWidth += (width) - (this.prop.box * this.prop.noOfStars)
      } else if (this.prop.justifyContent === 'center') {
        startWidth += ((width) - (this.prop.box * this.prop.noOfStars)) / 2
      } else {
        startWidth += (width - (this.prop.box * this.prop.noOfStars)) / (this.prop.noOfStars)
        increment += (width - (this.prop.box * this.prop.noOfStars)) / (this.prop.noOfStars)
      }

      if (this.prop.alignItems === 'start') {} else if (this.prop.alignItems === 'center') {
        startHeight += (height - this.prop.box) / 2
      } else {
        startHeight += (height - this.prop.box)
      }

      for (let i = 0; i < this.stars.length; i++) {
        this.stars[i].setAttribute('d', this._dAttr(startWidth, startHeight))
        startWidth += increment
      }
    } else { // for column flow
      this._createGradient(0, 0, 0, 100)
      let startHeight = (this.prop.padding); let startWidth = this.prop.box / 2; let increment = this.prop.box
      if (this.prop.alignItems === 'start') {} else if (this.prop.alignItems === 'center') {
        startHeight += (height - (this.prop.box * this.prop.noOfStars)) / 2
      } else {
        startHeight += (height - (this.prop.box * this.prop.noOfStars))
      }

      if (this.prop.justifyContent === 'start') {

      } else if (this.prop.justifyContent === 'end') {
        startWidth += (width) - (this.prop.box * this.prop.noOfStars)
      } else if (this.prop.justifyContent === 'center') {
        startWidth += ((width) - (this.prop.box * this.prop.noOfStars)) / 2
      } else {
        startWidth += (width - (this.prop.box * this.prop.noOfStars)) / (this.prop.noOfStars)
        increment += (width - (this.prop.box * this.prop.noOfStars)) / (this.prop.noOfStars)
      }

      for (let i = 0; i < this.stars.length; i++) {
        this.stars[i].setAttribute('d', this._dAttr(startWidth, startHeight))
        startHeight += increment
      }
    }

    for (let i = this.prop.noOfStars; i < this.stars.length; i++) { // removing stars
      let elem = this.stars.pop()
      this.svg.removeChild(elem)
    }

    let rated = Math.trunc(this.prop.rating)
    let fracRating = ((this.prop.rating - Math.trunc(this.prop.rating)).toFixed(2)) * 100
    if (this.prop.orientation === 'LtoR' || this.prop.orientation === 'TtoB') {
      for (let i = 0; i < this.stars.length; i++) {
        if (i < rated) { this.stars[i].setAttribute('fill', this.prop.ratedFill) } else { this.stars[i].setAttribute('fill', this.prop.unratedFill) }
      }

      for (let i = 0; i < this.stars.length; i++) {
        if (i < rated) { this.stars[i].setAttribute('stroke', this.prop.ratedStroke) } else { this.stars[i].setAttribute('stroke', this.prop.unratedStroke) }
        this.stars[i].setAttribute('stroke-width', this.prop.strokeWidth)
      }
    } else {
      for (let i = this.stars.length - 1; i >= 0; i--) {
        if ((this.prop.noOfStars - i - 1) < rated) { this.stars[i].setAttribute('fill', this.prop.ratedFill) } else { this.stars[i].setAttribute('fill', this.prop.unratedFill) }
      }

      for (let i = this.stars.length - 1; i >= 0; i--) {
        if ((this.prop.noOfStars - i - 1) < rated) { this.stars[i].setAttribute('stroke', this.prop.ratedStroke) } else { this.stars[i].setAttribute('stroke', this.prop.unratedStroke) }
        this.stars[i].setAttribute('stroke-width', this.prop.strokeWidth)
      }
    }

    if (fracRating) {
      if (['LtoR', 'TtoB'].includes(this.prop.orientation)) {
        this.defs.children[0].children[0].setAttribute('offset', fracRating + '%')
        this.defs.children[0].children[0].setAttribute('stop-color', this.prop.ratedFill)
        this.defs.children[0].children[1].setAttribute('offset', (100 - fracRating) + '%')
        this.defs.children[0].children[1].setAttribute('stop-color', this.prop.unratedFill)
      } else {
        this.defs.children[0].children[0].setAttribute('offset', fracRating + '%')
        this.defs.children[0].children[0].setAttribute('stop-color', this.prop.unratedFill)
        this.defs.children[0].children[1].setAttribute('offset', (100 - fracRating) + '%')
        this.defs.children[0].children[1].setAttribute('stop-color', this.prop.ratedFill)
      }

      if (['LtoR', 'TtoB'].includes(this.prop.orientation)) {
        this.defs.children[1].children[0].setAttribute('offset', fracRating + '%')
        this.defs.children[1].children[0].setAttribute('stop-color', this.prop.ratedStroke)
        this.defs.children[1].children[1].setAttribute('offset', (100 - fracRating) + '%')
        this.defs.children[1].children[1].setAttribute('stop-color', this.prop.unratedStroke)
      } else {
        this.defs.children[1].children[0].setAttribute('offset', fracRating + '%')
        this.defs.children[1].children[0].setAttribute('stop-color', this.prop.unratedStroke)
        this.defs.children[1].children[1].setAttribute('offset', (100 - fracRating) + '%')
        this.defs.children[1].children[1].setAttribute('stop-color', this.prop.ratedStroke)
      }

      if (['LtoR', 'TtoB'].includes(this.prop.orientation)) {
        this.stars[rated].setAttribute('fill', 'url(#grad1)')
        this.stars[rated].setAttribute('stroke', 'url(#grad2)')
      } else {
        this.stars[this.prop.noOfStars - rated].setAttribute('fill', 'url(#grad1)')
        this.stars[this.prop.noOfStars - rated].setAttribute('stroke', 'url(#grad2)')
      }
    }
  }

  _dAttr (startWidth, startHeight) {
    let dAttr = 'm' + startWidth + ' ' + startHeight + ' ' +
        'l' + -(this.prop.innerBox / 4) + ' ' + (this.prop.innerBox / 3) + ' ' +
        'l' + -(this.prop.innerBox / 4) + ' ' + 0 + ' ' +
        'l' + (this.prop.innerBox / 4) + ' ' + (this.prop.innerBox / 3) + ' ' +
        'l' + -(this.prop.innerBox / 4) + ' ' + (this.prop.innerBox / 3) + ' ' +
        'l' + (this.prop.innerBox / 2) + ' ' + -(this.prop.innerBox / 6) + ' ' +
        'l' + (this.prop.innerBox / 2) + ' ' + (this.prop.innerBox / 6) + ' ' +
        'l' + -(this.prop.innerBox / 4) + ' ' + -(this.prop.innerBox / 3) + ' ' +
        'l' + (this.prop.innerBox / 4) + ' ' + -(this.prop.innerBox / 3) + ' ' +
        'l' + -(this.prop.innerBox / 4) + ' ' + 0 + 'z'
    return dAttr
    // path.setAttribute('d', dAttr)
    // if (index < this.prop.rating) {
    //   path.style.fill = this.prop.ratedFill
    //   path.style.stroke = this.prop.ratedStroke
    // } else {
    //   path.style.fill = this.prop.unratedFill
    //   path.style.stroke = this.prop.unratedStroke
    // }
    // if (getFraction(this.prop.rating) !== 0) {
    //   if (getPartialRated(this.prop.rating) === index) {
    //     path.style.fill = 'url(#grad)'
    //   }
    // }
    // path.style.strokeWidth = this.prop.strokeWidth
    // this.svg.appendChild(path)
    // this.stars.push(path)
  }

  _createGradient (x1, x2, y1, y2) {
    let grad1 = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient')
    grad1.setAttribute('x1', x1 + '%')
    grad1.setAttribute('x2', x2 + '%')
    grad1.setAttribute('y1', y1 + '%')
    grad1.setAttribute('y2', y2 + '%')
    grad1.setAttribute('id', 'grad1')
    let stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
    // stop1.setAttribute('offset', (getFraction(this.prop.rating) + '%'))
    // stop1.setAttribute('stop-color', this.prop.ratedFill)
    var stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
    grad1.appendChild(stop1)
    grad1.appendChild(stop2)
    let grad2 = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient')
    grad2.setAttribute('x1', x1 + '%')
    grad2.setAttribute('x2', x2 + '%')
    grad2.setAttribute('y1', y1 + '%')
    grad2.setAttribute('y2', y2 + '%')
    grad2.setAttribute('id', 'grad2')
    var stop3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
    var stop4 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
    // stop2.setAttribute('offset', (getFraction(this.prop.rating) + '%'))
    // stop2.setAttribute('stop-color', this.prop.unratedFill)
    grad2.appendChild(stop3)
    grad2.appendChild(stop4)
    this.defs.appendChild(grad1)
    this.defs.appendChild(grad2)
  }

  _update (prop) {
    this._validateInput(prop)
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
