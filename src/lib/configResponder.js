import animateOut from "./animateOut";
export default function interactionGestures(index, setSprings, onSwipe, interaction) {
  let start = 0;
  return {
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    onPanResponderGrant: (evt, gestureState) => {
      // The gesture has started. Show visual feedback so the user knows
      // create a timestamp to evaluate the length of the touch interation.
      console.log("touch down!");
      // trigger interaction start here
      start = Date.now();
      interaction.startInteraction(index);
      setSprings((i) => (index !== i ? null : { scale: 1.05 }));
    },
    onPanResponderMove: (evt, gestureState) => {
      // The most recent move distance is gestureState.move{X,Y}
      // The accumulated gesture distance since becoming responder is
      setSprings((i) => (index !== i ? null : { x: gestureState.dx }));
    },
    onPanResponderTerminationRequest: (evt, gestureState) => true,
    onPanResponderRelease: (evt, gestureState) => {
      console.log("touch up!");
      interaction.endInteraction();
      // The user has released all touches while this view is the
      // responder. This typically means a gesture has occurred

      // use gestureState.vx || gestureState.vx for x&y velocities
      const touchDuration = Date.now() - start;
      const triggered = Math.abs(gestureState.vx) > 0.5;
      const gone = triggered || Math.abs(gestureState.dx) > 50;
      if (touchDuration < 80 && !gone) {
        // check the length of the touch. if it is <~ 80ms,
        // it was a tap rather than a move gesture...?
        // console.log("tap detected")
        setSprings((i) => (index !== i ? null : { x: 0, y: 0, scale: 1 }))
        // onPress(index)
      } else if (triggered) {
        console.log("swipe detected");
        animateOut(index, gestureState, setSprings);
        onSwipe(getSwipeDirection(gestureState));
      } else {
        // animate the card back to the starting position
        setSprings((i) => (index !== i ? null : { x: 0, y: 0, scale: 1 }));
      }
    },
  };
}
function getSwipeDirection(gesture) {
  if (Math.abs(gesture.vx) > Math.abs(gesture.vy)) {
    return gesture.vx > 0 ? "RIGHT" : "LEFT";
  } else {
    return gesture.vy > 0 ? "UP" : "DOWN";
  }
}
