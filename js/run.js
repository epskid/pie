import { terminalContent, fitPyterm } from "./terminal.js"
import { deps } from "./deps.js"
import { editor } from "./editor.js"

const pyObserver = new MutationObserver(_ => {
  fitPyterm()
  pyObserver.disconnect()
});

run.addEventListener("click", async function load() {
  document.getElementById("terminal-content").innerHTML = `<py-script config='{"packages":${JSON.stringify(deps)}}' id="pyterm" terminal worker>${editor.getValue()}</py-script>`
  pyObserver.observe(terminalContent, { childList: true })
}, false)

repl.addEventListener("click", async function load() {
  document.getElementById("terminal-content").innerHTML = `<py-script config='{"packages":${JSON.stringify(deps)}}' id="pyterm" terminal worker>import code;code.interact()</py-script>`
  pyObserver.observe(terminalContent, { childList: true })
}, false)
