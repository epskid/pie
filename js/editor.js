export const editor = ace.edit("editor")
editor.setTheme("ace/theme/gruvbox")
editor.session.setMode("ace/mode/python")

const keybind = document.getElementById("keybind")

function setKeybind() {
  if (keybind.value === "ace") {
    editor.setKeyboardHandler(null)
    return
  }
  editor.setKeyboardHandler(`ace/keyboard/${keybind.value}`)
}

setKeybind()
keybind.addEventListener("change", e => {
  setKeybind()
})
