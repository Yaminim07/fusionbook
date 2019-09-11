// import { url } from "inspector";

export default class Rating {
  constructor (container, obj) {
    if (!(container instanceof Element)) {
      console.error('Invalid container')
      return
    }

    this._prop = {}
    this._prop.width = '500'
    this._prop.height = '100'
    this._prop.fill = '#ff0000'
    this._prop.ratedFill = '#ff0000'
    this._prop.unratedFill = '#FA8072'
    this._prop.stroke = '#000000'
    this._prop.ratedStroke = '#000000'
    this._prop.unratedStroke = '#666666'
    this._prop.strokeWidth = 0
    this._prop.orientation = 'LtoR'
    this._prop.noOfStars = 5
    this._prop.rating = 3.5
    this._prop.padding = 5
    this._prop.justifyContent = 'center'
    this._prop.alignItems = 'center'
    this._prop.flow = 'row'
    this._prop.box = 0
    this._prop.innerBox = 0
    this._elem = {}
    this._elem.stars = []
    this._elem.container = container
    this._elem.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    this._elem.defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
    this._elem.container.appendChild(this._elem.svg)
    this._elem.svg.appendChild(this._elem.defs)
    this._elem.hasAnimationFrame = false
    this.onUpdate = null
    this.onDraw = null
    if (this._validateInput(obj)) {
      if (!this._elem.hasAnimationFrame) {
        window.requestAnimationFrame(() => this._createSvg())
      }
    } else {
      console.error('Invalid parameters for drawing SVG')
    }
  }

  _validateInput (obj) {
    var drawSvg = true
    if (obj.hasOwnProperty('width')) {
      let calculatedWidth = getWidth(obj.width)
      if (!calculatedWidth || calculatedWidth < 10) {
      } else {
        this._prop.width = obj.width
      }
    }

    if (obj.hasOwnProperty('height')) {
      let calculatedHeight = getHeight(obj.height)
      if (!calculatedHeight || calculatedHeight < 10) {
      } else {
        this._prop.height = obj.height
      }
    }

    if (obj.ratedFill === obj.unratedFill) {
      obj.ratedFill = this._prop.fill
    }

    if (obj.hasOwnProperty('fill') && checkHexValue(obj.fill)) {
      this._prop.fill = obj.fill
    }

    if (obj.hasOwnProperty('ratedFill') && checkHexValue(obj.ratedFill)) {
      this._prop.ratedFill = obj.ratedFill
    }

    if (obj.hasOwnProperty('unratedFill') && checkHexValue(obj.unratedFill)) {
      this._prop.unratedFill = obj.unratedFill
    }

    if (obj.ratedStroke === obj.unratedStroke) {
      obj.ratedStroke = this._prop.stroke
    }

    if (obj.hasOwnProperty('stroke') && checkHexValue(obj.stroke)) {
      this._prop.stroke = obj.stroke
    }

    if (obj.hasOwnProperty('ratedStroke') && checkHexValue(obj.ratedStroke)) {
      this._prop.ratedStroke = obj.ratedStroke
    }

    if (obj.hasOwnProperty('unratedStroke') && checkHexValue(obj.unratedStroke)) {
      this._prop.unratedStroke = obj.unratedStroke
    }

    if (obj.hasOwnProperty('strokeWidth') && !isNaN(obj.strokeWidth) && obj.strokeWidth > 0) {
      this._prop.strokeWidth = obj.strokeWidth
    }

    if (obj.hasOwnProperty('flow') && ['row', 'column'].includes(obj.flow)) {
      this._prop.flow = obj.flow
    }

    if (obj.hasOwnProperty('orientation') && ['LtoR', 'RtoL', 'TtoB', 'BtoT'].includes(obj.orientation)) {
      this._prop.orientation = obj.orientation
    }

    if (obj.hasOwnProperty('noOfStars')) {
      if (!isNaN(obj.noOfStars) && !(obj.noOfStars < 0) && !(obj.noOfStars === 0)) {
        this._prop.noOfStars = obj.noOfStars
      } else {
        drawSvg = false
      }
    }

    if (obj.hasOwnProperty('rating') && !isNaN(obj.rating) && obj.rating > 0 && obj.rating < this._prop.noOfStars) {
      this._prop.rating = obj.rating
    } else if (obj.rating > this._prop.noOfStars) {
      this._prop.rating = this._prop.noOfStars
    }
    this._prop.box = calculateBoxSize(getWidth(this._prop.width), getHeight(this._prop.height), this._prop.flow, this._prop.noOfStars)

    if (obj.hasOwnProperty('padding') && !isNaN(obj.padding) && !(greaterThanMaximumPadding(this._prop.box, obj.padding)) && (obj.padding > 0)) {
      this._prop.padding = obj.padding
    }

    this._prop.innerBox = this._prop.box - (2 * this._prop.padding)

    if (obj.hasOwnProperty('justifyContent') && ['start', 'end', 'center', 'spaceEvenly'].includes(obj.justifyContent)) {
      this._prop.justifyContent = obj.justifyContent
    }

    if (obj.hasOwnProperty('alignItems') && ['start', 'end', 'center'].includes(obj.alignItems)) {
      this._prop.alignItems = obj.alignItems
    }

    if (obj.hasOwnProperty('onUpdate') && typeof obj.onUpdate === 'function') {
      this.onUpdate = obj.onUpdate
    }

    if (obj.hasOwnProperty('onDraw') && typeof obj.onDraw === 'function') {
      this.onDraw = obj.onDraw
    }

    if (drawSvg) {
      return true
    } else {
      return false
    }
  }

  _createSvg () {
    this._elem.hasAnimationFrame = true
    this._elem.svg.setAttribute('width', this._prop.width)
    this._elem.svg.setAttribute('height', this._prop.height)
    let width = getWidth(this._prop.width)
    let height = getHeight(this._prop.height)

    for (let i = this._elem.stars.length; i < this._prop.noOfStars; i++) {
      let path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      this._elem.svg.appendChild(path)
      this._elem.stars.push(path)
    }
    if (this._prop.flow === 'row') {
      this._createGradient(0, 100, 0, 0)
      let startHeight = this._prop.padding; let startWidth = this._prop.box / 2; let increment = this._prop.box
      if (this._prop.justifyContent === 'start') {

      } else if (this._prop.justifyContent === 'end') {
        startWidth += (width) - (this._prop.box * this._prop.noOfStars)
      } else if (this._prop.justifyContent === 'center') {
        startWidth += ((width) - (this._prop.box * this._prop.noOfStars)) / 2
      } else {
        startWidth += (width - (this._prop.box * this._prop.noOfStars)) / (this._prop.noOfStars)
        increment += (width - (this._prop.box * this._prop.noOfStars)) / (this._prop.noOfStars)
      }

      if (this._prop.alignItems === 'start') {} else if (this._prop.alignItems === 'center') {
        startHeight += (height - this._prop.box) / 2
      } else {
        startHeight += (height - this._prop.box)
      }

      for (let i = 0; i < this._elem.stars.length; i++) {
        this._elem.stars[i].setAttribute('d', this._dAttr(startWidth, startHeight))
        startWidth += increment
      }
    } else { // for column flow
      this._createGradient(0, 0, 0, 100)
      let startHeight = (this._prop.padding); let startWidth = this._prop.box / 2; let increment = this._prop.box
      if (this._prop.alignItems === 'start') {} else if (this._prop.alignItems === 'center') {
        startHeight += (height - (this._prop.box * this._prop.noOfStars)) / 2
      } else {
        startHeight += (height - (this._prop.box * this._prop.noOfStars))
      }

      if (this._prop.justifyContent === 'start') {

      } else if (this._prop.justifyContent === 'end') {
        startWidth += (width) - (this._prop.box * this._prop.noOfStars)
      } else if (this._prop.justifyContent === 'center') {
        startWidth += ((width) - (this._prop.box * this._prop.noOfStars)) / 2
      } else {
        startWidth += (width - (this._prop.box * this._prop.noOfStars)) / (this._prop.noOfStars)
        increment += (width - (this._prop.box * this._prop.noOfStars)) / (this._prop.noOfStars)
      }

      for (let i = 0; i < this._elem.stars.length; i++) {
        this._elem.stars[i].setAttribute('d', this._dAttr(startWidth, startHeight))
        startHeight += increment
      }
    }

    for (let i = this._prop.noOfStars; i < this._elem.stars.length; i++) { // removing stars
      let _elem = this._elem.stars.pop()
      this._elem.svg.removeChild(_elem)
    }

    let rated = Math.trunc(this._prop.rating)
    let fracRating = ((this._prop.rating - Math.trunc(this._prop.rating)).toFixed(2)) * 100
    if (this._prop.orientation === 'LtoR' || this._prop.orientation === 'TtoB') {
      for (let i = 0; i < this._elem.stars.length; i++) {
        if (i < rated) { this._elem.stars[i].setAttribute('fill', this._prop.ratedFill) } else { this._elem.stars[i].setAttribute('fill', this._prop.unratedFill) }
      }

      for (let i = 0; i < this._elem.stars.length; i++) {
        if (i < rated) { this._elem.stars[i].setAttribute('stroke', this._prop.ratedStroke) } else { this._elem.stars[i].setAttribute('stroke', this._prop.unratedStroke) }
        this._elem.stars[i].setAttribute('stroke-width', this._prop.strokeWidth)
      }
    } else {
      for (let i = this._elem.stars.length - 1; i >= 0; i--) {
        if ((this._prop.noOfStars - i - 1) < rated) { this._elem.stars[i].setAttribute('fill', this._prop.ratedFill) } else { this._elem.stars[i].setAttribute('fill', this._prop.unratedFill) }
      }

      for (let i = this._elem.stars.length - 1; i >= 0; i--) {
        if ((this._prop.noOfStars - i - 1) < rated) { this._elem.stars[i].setAttribute('stroke', this._prop.ratedStroke) } else { this._elem.stars[i].setAttribute('stroke', this._prop.unratedStroke) }
        this._elem.stars[i].setAttribute('stroke-width', this._prop.strokeWidth)
      }
    }

    if (fracRating) {
      if (['LtoR', 'TtoB'].includes(this._prop.orientation)) {
        this._elem.defs.children[0].children[0].setAttribute('offset', fracRating + '%')
        this._elem.defs.children[0].children[0].setAttribute('stop-color', this._prop.ratedFill)
        this._elem.defs.children[0].children[1].setAttribute('offset', (100 - fracRating) + '%')
        this._elem.defs.children[0].children[1].setAttribute('stop-color', this._prop.unratedFill)
      } else {
        this._elem.defs.children[0].children[0].setAttribute('offset', fracRating + '%')
        this._elem.defs.children[0].children[0].setAttribute('stop-color', this._prop.unratedFill)
        this._elem.defs.children[0].children[1].setAttribute('offset', (100 - fracRating) + '%')
        this._elem.defs.children[0].children[1].setAttribute('stop-color', this._prop.ratedFill)
      }

      if (['LtoR', 'TtoB'].includes(this._prop.orientation)) {
        this._elem.defs.children[1].children[0].setAttribute('offset', fracRating + '%')
        this._elem.defs.children[1].children[0].setAttribute('stop-color', this._prop.ratedStroke)
        this._elem.defs.children[1].children[1].setAttribute('offset', (100 - fracRating) + '%')
        this._elem.defs.children[1].children[1].setAttribute('stop-color', this._prop.unratedStroke)
      } else {
        this._elem.defs.children[1].children[0].setAttribute('offset', fracRating + '%')
        this._elem.defs.children[1].children[0].setAttribute('stop-color', this._prop.unratedStroke)
        this._elem.defs.children[1].children[1].setAttribute('offset', (100 - fracRating) + '%')
        this._elem.defs.children[1].children[1].setAttribute('stop-color', this._prop.ratedStroke)
      }

      if (['LtoR', 'TtoB'].includes(this._prop.orientation)) {
        this._elem.stars[rated].setAttribute('fill', 'url(#grad1)')
        this._elem.stars[rated].setAttribute('stroke', 'url(#grad2)')
      } else {
        this._elem.stars[this._prop.noOfStars - rated].setAttribute('fill', 'url(#grad1)')
        this._elem.stars[this._prop.noOfStars - rated].setAttribute('stroke', 'url(#grad2)')
      }
    }

    var func = this.onDraw
    if (func) {
      func()
    }
  }

  _dAttr (startWidth, startHeight) {
    let dAttr = 'm' + startWidth + ' ' + startHeight + ' ' +
        'l' + -(this._prop.innerBox / 6) + ' ' + (this._prop.innerBox / 3) + ' ' +
        'l' + -(this._prop.innerBox / 3) + ' ' + 0 + ' ' +
        'l' + (this._prop.innerBox / 5) + ' ' + (this._prop.innerBox / 3) + ' ' +
        'l' + -(this._prop.innerBox / 5) + ' ' + (this._prop.innerBox / 3) + ' ' +
        'l' + (this._prop.innerBox / 2) + ' ' + -(this._prop.innerBox / 5) + ' ' +
        'l' + (this._prop.innerBox / 2) + ' ' + (this._prop.innerBox / 5) + ' ' +
        'l' + -(this._prop.innerBox / 5) + ' ' + -(this._prop.innerBox / 3) + ' ' +
        'l' + (this._prop.innerBox / 5) + ' ' + -(this._prop.innerBox / 3) + ' ' +
        'l' + -(this._prop.innerBox / 3) + ' ' + 0 + 'z'
    return dAttr
  }

  _createGradient (x1, x2, y1, y2) {
    let grad1 = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient')
    grad1.setAttribute('x1', x1 + '%')
    grad1.setAttribute('x2', x2 + '%')
    grad1.setAttribute('y1', y1 + '%')
    grad1.setAttribute('y2', y2 + '%')
    grad1.setAttribute('id', 'grad1')
    let stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
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
    grad2.appendChild(stop3)
    grad2.appendChild(stop4)
    this._elem.defs.appendChild(grad1)
    this._elem.defs.appendChild(grad2)
  }

  update (_prop) {
    if (this._validateInput(_prop)) {
      if (this._elem.hasAnimationFrame) {
        window.requestAnimationFrame(() => this._createSvg())
        this._elem.hasAnimationFrame = false
      }
      var func = this.onUpdate
      if (func) {
        func()
      }
    } else {
      console.error('Invalid parameters for drawing SVG')
    }
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
