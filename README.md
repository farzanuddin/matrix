# Matrix Game

A coding interview task demonstrating problem-solving, data structures, algorithms, and front-end fundamentals (HTML, CSS, JavaScript).

## The Task

Create a 5×5 grid of boxes with the following behavior:

- All boxes start **blue**
- Click a box → turns **red**
- Each click adds one more red box
- **At most 3 boxes can be red at any time**
- On the 4th click, the **oldest red** toggles back to blue and the new box becomes red
- On the 5th click, the **next oldest red** toggles back to blue and the new box becomes red
- This cycles indefinitely — a rolling FIFO queue

## Implementation

| Aspect | Approach |
|---|---|
| **Algorithm** | FIFO queue using array `shift()` / `push()` — O(1) per click, O(3) space |
| **Logic** | Event delegation on the board container (1 listener, not 25) |
| **Accessibility** | Tab-index, role="button", keyboard support (Enter / Space) |
| **Styling** | CSS variables, responsive grid, clip-path animation, hover & active states |
| **Stack** | Vanilla JS + Vite (no frameworks) |

## Run Locally

```bash
npm install
npm run dev
```
