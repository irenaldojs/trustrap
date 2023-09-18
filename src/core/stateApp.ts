var initialState = true

export function InitialCall(){
    initialState = false
}

var stateList: any = {}

export function useState(id: string, initialValue: any ){
    
    if(initialState){
        stateList[id] = initialValue
    }

    let state = stateList[id]
    
    function internalSetState (newState: any){
        stateList[id] = newState
    }

    console.log(state)
    return [ state, internalSetState]
}