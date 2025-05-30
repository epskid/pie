export const terminalContent = document.getElementById("terminal-content")
const terminalResize = document.getElementById("terminal-resize")
const terminalMin = document.getElementById("terminal-min")

terminalMin.addEventListener("click", e => {
  terminalContent.style.height = "0px"
})

let moveY = 0
let drag = false

terminalResize.addEventListener("mousedown", e => {
  drag = true
})

document.body.addEventListener("mousemove", e => {
  moveY = e.y
  if (drag) {
    terminalContent.style.height =
      Math.min(window.innerHeight / 2, window.innerHeight - (moveY - terminalResize.getBoundingClientRect().height / 2)) + "px"
    e.preventDefault()

    if (document.getElementById("pyterm")) {
      fitPyterm()
    }
  }
})

document.body.addEventListener("mouseup", e => {
  drag = false
})

export function fitPyterm() {
  const pyterm = document.getElementById("pyterm")

  const newRows = Math.round(parseFloat(terminalContent.style.height.slice(0, -2)) / 24) // HACK: why is it 24???
  pyterm.terminal.resize(pyterm.terminal.cols, newRows)
}
