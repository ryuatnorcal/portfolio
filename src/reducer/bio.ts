export const bioReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_CONTENT':
      return {
        ...state,
        bio: action.content
      }
    default:
      return state
  }
}