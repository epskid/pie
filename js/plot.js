const plotDialog = document.getElementById('plot-dialog')
const plot = document.getElementById('plot')

const plotObserver = new MutationObserver(_ => {
  plotObserver.disconnect()
  plotDialog.showModal()
})

plotObserver.observe(plot, { childList: true })

plotDialog.addEventListener("close", _ => {
  plot.innerHTML = ""
  plotObserver.observe(plot, { childList: true })
})
