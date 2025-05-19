export const deps = []

const depsButton = document.getElementById("deps")
const depsMenu = document.getElementById("deps-menu")
const addDep = document.getElementById("add-dep")
const depList = document.getElementById("dep-list")

function renderDepList() {
  depList.innerHTML = ""

  for (let i = 0; i < deps.length; i++) {
    const li = document.createElement("li")
    li.className = "dep"
    li.innerText = deps[i]
    li.onclick = _ => {
      deps.splice(i, 1)
      renderDepList()
    }
    depList.appendChild(li)
  }
}

depsButton.addEventListener("click", _ => {
  depsMenu.showModal()
  renderDepList()
})

addDep.addEventListener("keyup", e => {
  if (e.keyCode === 13) {
    const dep = addDep.value.trim()
    addDep.value = ""
    if (deps.indexOf(dep) === -1) {
      deps.push(dep)
      renderDepList()
    }
  }
})
