export const techStackReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_CONTENT':
      return {
        ...state,
        techStack: action.content
      }
    default:
      return state
  }
}