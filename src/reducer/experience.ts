export const experienceReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_CONTENT':
      return {
        ...state,
        experience: action.content
      }
    default:
      return state
  }
}