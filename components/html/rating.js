// import { url } from "inspector";

export default class createSvg {
  constructor (container, obj) {
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    this.svgWidth = obj.width
    this.svgHeight = obj.height
    this.stars = obj.noOfStars
    this.container = container
    this.obj = obj
    this.rating = Math.trunc(obj.rating)
    this.fraction = (obj.rating - this.rating) * 100
    // this.createGradient()
  }

  checkSvgDimensions () {
    if (isNaN(this.svgHeight) || isNaN(this.svgWidth) || this.svgHeight === 0 || this.svgWidth === 0 || this.svgWidth === undefined || this.svgHeight === undefined) {
      console.log('Width or height value not valid')
    }
  }

  checkStarProperties () {
    if (typeof this.obj.color !== 'string') {
      console.log('fill property invalid')
    }
    if (typeof this.obj.border !== 'string') {
      console.log('Stroke property invalid')
    }
    if (isNaN(this.obj.noOfStars)) {
      console.log('No. of stars invalid')
    }
  }

  addSvg () {
    this.svg.setAttribute('width', this.svgWidth)
    this.svg.setAttribute('height', this.svgHeight)
    this.container.appendChild(this.svg)
    createGradient(this.svg, this.fraction)
    var box, innerBox

    if (this.obj.orientation === 'LtoR' || this.obj.orientation === 'RtoL') { // Horizontal arrangement
      if ((this.svgWidth / this.stars) > this.svgHeight) { box = this.svgHeight } else { box = this.svgWidth / this.stars }
      innerBox = box - (2 * this.obj.padding)
      var startWidth = (box / 2) + (this.svgWidth - (box * this.stars)) / 2
      var startHeight = (this.svgHeight - box) / 2 + (this.obj.padding)
      for (let i = 0; i < this.stars; i++) {
        createPath(this.svg, innerBox, startWidth, startHeight, this.obj, i, this.rating, this.fraction)
        startWidth += box
      }
    } else { // Vertical arrangement
      if ((this.svgHeight / this.stars) > this.svgWidth) { box = this.svgWidth } else { box = this.svgHeight / this.stars }

      startHeight = (this.svgHeight - (box * this.stars)) / 2
      startWidth = (box / 2) + (this.svgWidth - box) / 2

      for (let i = 0; i < this.stars; i++) {
        createPath(this.svg, box, startWidth, startHeight, this.obj, i)
        startHeight += box
      }
    }
  }

  update (...args) {

  }
  // var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  // var this.svgWidth = obj.width
  // var this.svgHeight = obj.height
  // var this.stars = obj.noOfthis.Stars
  // if (isNaN(this.svgHeight) || isNaN(this.svgWidth) || this.svgHeight === 0 || this.svgWidth === 0) { console.log('Width or height value not valid') } else if (isNaN(this.stars)) { console.log('Star count not valid') } else {
  //   svg.setAttribute('width', this.svgWidth)
  //   svg.setAttribute('height', this.svgHeight)
  //   container.appendChild(svg)
  //   var box

  //   if (obj.horizontal === 'true') { // Horizontal arrangement
  //     if ((this.svgWidth / this.stars) > this.svgHeight) { box = this.svgHeight } else { box = this.svgWidth / this.stars }

  //     var startWidth = (box / 2) + (this.svgWidth - (box * this.stars)) / 2
  //     var startHeight = (this.svgHeight - box) / 2

  //     for (let i = 0; i < this.stars; i++) {
  //       createPath(svg, box, startWidth, startHeight, obj)
  //       startWidth += box
  //     }
  //   } else { // Vertical arrangement
  //     if ((this.svgHeight / this.stars) > this.svgWidth) { box = this.svgWidth } else { box = this.svgHeight / this.stars }

  //     startHeight = (this.svgHeight - (box * this.stars)) / 2
  //     startWidth = (box / 2) + (this.svgWidth - box) / 2

  //     for (let i = 0; i < this.stars; i++) {
  //       createPath(svg, box, startWidth, startHeight, obj)
  //       startHeight += box
  //     }
  //   }
  // }
}

function createPath (svg, box, startWidth, startHeight, obj, index, rating, fraction) {
  var path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  var d_attr = 'm' + startWidth + ' ' + startHeight + ' ' +
      'l' + -(box / 4) + ' ' + (box / 3) + ' ' +
      'l' + -(box / 4) + ' ' + 0 + ' ' +
      'l' + (box / 4) + ' ' + (box / 3) + ' ' +
      'l' + -(box / 4) + ' ' + (box / 3) + ' ' +
      'l' + (box / 2) + ' ' + -(box / 6) + ' ' +
      'l' + (box / 2) + ' ' + (box / 6) + ' ' +
      'l' + -(box / 4) + ' ' + -(box / 3) + ' ' +
      'l' + (box / 4) + ' ' + -(box / 3) + ' ' +
      'l' + -(box / 4) + ' ' + 0 + 'z'

  path.setAttribute('d', d_attr)
  if (index < obj.rating) { path.style.fill = obj.ratedFill } else { path.style.fill = obj.unratedFill }
  if (fraction !== 0) {
    if (rating === index) { path.style.fill = 'url(#grad)' }
  }
  path.style.stroke = obj.stroke
  path.style.strokeWidth = obj.strokeWidth
  svg.appendChild(path)
}

function createGradient (svg, fraction) {
  var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
  var grad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient')
  grad.setAttribute('x1', '0%')
  grad.setAttribute('x2', '100%')
  grad.setAttribute('y1', '0%')
  grad.setAttribute('y2', '0%')
  grad.setAttribute('id', 'grad')
  var stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
  stop1.setAttribute('offset', (fraction + '%'))
  stop1.setAttribute('stop-color', 'red')
  var stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
  stop2.setAttribute('offset', (fraction + '%'))
  stop2.setAttribute('stop-color', 'blue')
  grad.appendChild(stop1)
  grad.appendChild(stop2)
  defs.appendChild(grad)
  svg.appendChild(defs)
}
