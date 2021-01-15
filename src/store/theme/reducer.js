import useColorScheme from "react-native/Libraries/Utilities/useColorScheme";

const initialState = useColorScheme(),


export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
