export const projectReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_CONTENT':
      return {
        ...state,
        project: action.content
      }
    default:
      return state
  }
}