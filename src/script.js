// Config — tweak these to change the grid size and max reds
const SIZE = 25
const MAX_ACTIVE = 3

// State
const board = document.getElementById('board')
const activeBlocks = [] // queue of clicked indices (oldest first)

// Build the grid — each block is focusable and keyboard accessible
for (let i = 0; i < SIZE; i++) {
  const block = document.createElement('div')
  block.className = 'block'
  block.dataset.index = i
  block.tabIndex = 0
  block.setAttribute('role', 'button')
  board.appendChild(block)
}

// Handle clicks — uses event delegation so one listener catches all
//   - If the box is already red, ignore
//   - If at the max limit (3), shift the oldest red off the queue and
//     remove its 'active' class
//   - Push the new index onto the queue and add the 'active' class
board.addEventListener('click', (e) => {
  const block = e.target.closest('.block')
  if (!block) return
  activate(block)
})

// Keyboard support — Enter or Space triggers a block
board.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter' && e.key !== ' ') return
  const block = e.target.closest('.block')
  if (!block) return
  e.preventDefault()
  activate(block)
})

function activate(block) {
  const idx = parseInt(block.dataset.index)
  if (activeBlocks.includes(idx)) return

  if (activeBlocks.length === MAX_ACTIVE) {
    const oldest = activeBlocks.shift()
    board.querySelector(`[data-index="${oldest}"]`).classList.remove('active')
  }

  activeBlocks.push(idx)
  block.classList.add('active')
}

// Reset — empties the queue and removes all reds
document.getElementById('reset').addEventListener('click', reset)

function reset() {
  activeBlocks.length = 0
  for (const block of board.children) {
    block.classList.remove('active')
  }
}
