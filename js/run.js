import { terminalContent, fitPyterm } from "./terminal.js"
import { deps } from "./deps.js"
import { editor } from "./editor.js"

const pyObserver = new MutationObserver(_ => {
  fitPyterm()
  pyObserver.disconnect()
});

// patch python modules to work nicer on pie
const shims = {
  // makes plt.show() work
  matplotlib: "import matplotlib.pyplot;import pyscript;matplotlib.pyplot.show=lambda:pyscript.display(*map(matplotlib.pyplot.figure,matplotlib.pyplot.get_fignums()),target='plot')"
}

function runCode(code) {
  if (terminalContent.style.height === "0px") {
    terminalContent.style.height = "100px"
  }

  let shimsSer = "import importlib.util"
  for (const [shim, code] of Object.entries(shims)) {
    shimsSer += `\nif importlib.util.find_spec("${shim}") is not None:${code}`
  }
  terminalContent.innerHTML = `<py-script config='{"packages":${JSON.stringify(deps)}}' id="pyterm" terminal worker>${shimsSer}\n${code}</py-script>`
  pyObserver.observe(terminalContent, { childList: true })
}

run.addEventListener("click", _ => {
  runCode(editor.getValue())
}, false)

repl.addEventListener("click", _ => {
  runCode("import code;code.interact()")
}, false)
