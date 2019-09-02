export default function createSvg (container, obj) {
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  var svgWidth = obj.width
  var svgHeight = obj.height

  if (isNaN(svgHeight) || isNaN(svgWidth) || svgHeight === 0 || svgWidth === 0) { console.log('Width or height value not valid') } else {
    svg.setAttribute('width', svgWidth)
    svg.setAttribute('height', svgHeight)
    container.appendChild(svg)
    var box

    if (obj.horizontal) { // Horizontal arrangement
      if ((svgWidth / 5) > svgHeight) { box = svgHeight } else { box = svgWidth / 5 }

      var startWidth = (box / 2) + (svgWidth - (box * 5)) / 2
      var startHeight = (svgHeight - box) / 2

      for (let i = 0; i < 5; i++) {
        createPath(svg, box, startWidth, startHeight, obj)
        startWidth += box
      }
    } else { // Vertical arrangement
      if ((svgHeight / 5) > svgWidth) { box = svgWidth } else { box = svgHeight / 5 }

      startHeight = (svgHeight - (box * 5)) / 2
      startWidth = (box / 2) + (svgWidth - box) / 2

      for (let i = 0; i < 5; i++) {
        createPath(svg, box, startWidth, startHeight)
        startHeight += box
      }
    }
  }
}

function createPath (svg, box, startWidth, startHeight, obj) {
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
  path.style.stroke = obj.border
  path.style.fill = obj.color
  path.style.strokeWidth = obj.borderWidth
  svg.appendChild(path)
}
