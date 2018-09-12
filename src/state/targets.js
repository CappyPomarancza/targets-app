import { database } from '../firebaseConfig'

const SET_TARGETS = 'targets/SET_TARGETS'
const ADD_TARGET = 'targets/ADD_TARGET'
const HANDLE_CHANGE = 'targets/HANDLE_CHANGE'
const TARGETS_STARTED_LOADING = 'targets/TARGETS_STARTED_LOADING'
const TARGETS_STOPPED_LOADING = 'targets/TARGETS_STOPPED_LOADING'
const CLEAR_INPUT = 'targets/CLEAR_INPUT'

export const setTargetsAction = data => ({
    type: SET_TARGETS,
    data
})

export const addTargetAction = value => ({
    type: ADD_TARGET,
    value
})

export const handleChangeAction = event => ({
    type: HANDLE_CHANGE,
    text: event.target.value
})

export const targetsStartedLoadingAction = () => ({
    type: TARGETS_STARTED_LOADING
})

export const targetsStoppedLoadingAction = () => ({
    type: TARGETS_STOPPED_LOADING
})

export const clearInputAction = () => ({
    type: CLEAR_INPUT
})

export const fetchTargetsAction = () => (dispatchEvent, getState) => {
    const state = getState()
    const user = state.auth.user.uid

    database
        .ref(`users/${user}/targets`)
        .on('value', snapshot => {
            const firebaseData = Object.entries(snapshot.val() || {}).map(([uid, value]) => {
                value.uid = uid
                return value
            })
            dispatch(setTargetsAction(firebaseData))
        })
}

export const onAddTargetClickAction = () => (dispatch, getState) => {
    const state = getState()
    const user = state.auth.user.uid

    database
        .ref(`users/${user}/targets`).push({
            targetName: state.targets, text,
        })

    dispatch(clearInputAction())
}

export const onDeletedTargetClickAction = (targetId) => (dispatch, getState) => {
    const state = getState()
    const user = state.auth.user.uid

    database
        .ref(`users/${user}/targets/${targetId}`)
        .remove()
}

const initialState = {
    targets: [],
    text: '',
    isTargetsAreLoading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_TARGETS:
            return {
                ...state,
                targets: action.data
            }
        case ADD_TARGET:
            return {
                ...state,
                targets: state.targets.concat({
                    targetsName: state.text,
                    uid: Date.now(),
                })
            }
        case HANDLE_CHANGE:
            return {
                ...state,
                text: action.text
            }
        case CLEAR_INPUT:
            return {
                ...state,
                text: ''
            }
        default:
            return state
    }
}



