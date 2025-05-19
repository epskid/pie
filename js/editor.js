export const editor = ace.edit("editor")
editor.setTheme("ace/theme/gruvbox")
editor.session.setMode("ace/mode/python")

const keybind = document.getElementById("keybind")
editor.setKeyboardHandler(`ace/keyboard/${keybind.value}`);
keybind.addEventListener("change", e => {
  editor.setKeyboardHandler(`ace/keyboard/${keybind.value}`);
})
