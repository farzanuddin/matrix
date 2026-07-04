// Config — tweak these to change the grid size and max reds
const SIZE = 25
const MAX_ACTIVE = 3

// State
const board = document.getElementById('board')
const resetBtn = document.getElementById('reset')
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

// Keyboard support — arrow keys to navigate, Enter/Space to activate
const COLS = 5

document.addEventListener('keydown', (e) => {
  const block = e.target.closest('.block')

  // If no block is focused yet, jump to the first one on any arrow key
  if (!block) {
    if (e.key.startsWith('Arrow')) {
      e.preventDefault()
      board.children[0].focus()
    }
    return
  }

  const idx = parseInt(block.dataset.index)
  const col = idx % COLS

  let targetIdx = null

  switch (e.key) {
    case 'ArrowUp':    targetIdx = idx - COLS; break
    case 'ArrowDown':  targetIdx = idx + COLS; break
    case 'ArrowLeft':  targetIdx = col > 0 ? idx - 1 : null; break
    case 'ArrowRight': targetIdx = col < COLS - 1 ? idx + 1 : null; break
    case 'Enter':
    case ' ':
      e.preventDefault()
      activate(block)
      return
    default:
      return
  }

  if (targetIdx !== null && targetIdx >= 0 && targetIdx < SIZE) {
    e.preventDefault()
    board.children[targetIdx].focus()
  }
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
resetBtn.addEventListener('click', reset)

function reset() {
  activeBlocks.length = 0
  for (const block of board.children) {
    block.classList.remove('active')
  }
}
