const intialState = {
    cardNumber: -1,
    cardArrayNames:[]
  }
   
  const rootReducer = (state = intialState, action) => {
      switch (action.type) {
        case 'ADD_NEW_CARD':
          return Object.assign({}, state, {
            cardArrayNames: [
              ...state.cardArrayNames,
              {
                name: action.name,
                id:state.cardNumber+1
              }
            ],
            cardNumber:state.cardNumber+1
          });
         case 'DELETE_CARD':
         const filteredNames = state.cardArrayNames.filter((val) => val.id !== action.id)
         console.log('delId',action.id);
         console.log('del',filteredNames);
         return { ...state,
          cardArrayNames: filteredNames}
        default:
          return state
      }
    }
    
    export default rootReducer;