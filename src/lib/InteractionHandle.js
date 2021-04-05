export default class InteractionHandle {
  constructor () {
    this.animating = [] // list of all cards currently animating.
    this.interacting = false
    this.taskQueue = []
    this.afterAll = null
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
        this.taskQueue.forEach((task) => task())
        this.taskQueue.length = 0

        this.afterAll && setImmediate(this.afterAll)
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

  runAfterAll (fn) {
    this.afterAll = fn
  }
}
