export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  stopedDate?: Date
  finishedDate?: Date
}

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export enum ActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  STOP_CURRENT_CYCLE = 'STOP_CURRENT_CYCLE',
  FINISH_CURRENT_CYCLE = 'FINISH_CURRENT_CYCLE',
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
      }
    case ActionTypes.STOP_CURRENT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, stopedDate: new Date() }
          } else {
            return cycle
          }
        }),
        activeCycleId: null,
      }
    case ActionTypes.FINISH_CURRENT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, finishedDate: new Date() }
          } else {
            return cycle
          }
        }),
        activeCycleId: null,
      }
    default:
      return state
  }
}
