export default class InteractionHandle {
  constructor () {
    this.animating = [] // list of all cards currently animating.
    this.interacting = false
    this.taskQueue = []
  }

  startInteraction (i) {
    this.interacting = i
    this.animating.push(i)
  }

  clearAnimation (i) {
    if (this.interacting !== i) {
      this.animating = this.animating.filter(handle => handle !== i)
      console.log('animation cleared')
    }
    if (!this.interacting && this.interacting !== 0) {
      // check if all cards have finished animating. if so, start taskQueue
      if (this.animating.length === 0) {
        console.log('taskQueue', this.taskQueue)
        this.taskQueue.forEach((task) => task())
        this.taskQueue.length = 0
      }
    } else console.log('animation tried to clear')
    console.log('this.animating', this.animating)
  }

  endInteraction () {
    this.interacting = false
  }

  runAfterAnimation (fn) {
    this.taskQueue.push(fn)
  }
}
