'use strict'

let watermark = {}

let setWatermark = (str) => {
  let arr = str.split('-')
  let id = '1.23452384164.123412415'
  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id))
  }
  console.log(arr)
  let can = document.createElement('canvas')
  can.width = 400
  can.height = 300
  let cans = can.getContext('2d')
  cans.rotate(-5 * Math.PI / 180)
  cans.font = '20px Vedana'
  cans.fillStyle = 'rgba(200, 200, 200, 0.5)'
  cans.textAlign = 'left'
  cans.textBaseline = 'Middle'
  cans.fillText(arr[0], can.width/2, can.height -40)
  cans.fillText(arr[1], can.width/2, can.height -80)
  cans.fillText(arr[2], can.width/2, can.height -120)
  cans.fillText(arr[3], can.width/2, can.height -160)
  let div = document.createElement('div')
  div.id = id
  div.style.pointerEvents = 'none'
  div.style.top = '70px'
  div.style.left = '0px'
  div.style.position = 'fixed'
  div.style.zIndex = '100000'
  div.style.width = document.documentElement.clientWidth - 10 + 'px'
  div.style.height = document.documentElement.clientHeight - 10 + 'px'
  div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat'
  document.body.appendChild(div)
  return id
}

// 该方法只允许调用一次
watermark.set = (str) => {
  let id = setWatermark(str)
  setInterval(() => {
    if (document.getElementById(id) === null) {
      id = setWatermark(str)
    }
  }, 500)
  window.onresize = () => {
    setWatermark(str)
  }
}

export default watermark