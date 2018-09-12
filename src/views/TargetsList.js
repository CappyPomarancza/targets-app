import React from 'react'
import { conncect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Delete from 'material-ui/svg-icons/action/delete'
import { ListItem } from 'material-ui/ListItem'
import Paper from 'material-ui/Paper'
import targets, { addTargetAction, handleChangeAction, onAddTargetClickAction, onDeletedTargetClickAction } from '../state/targets'
import { connect } from 'http2';


const styles = {
    margin: '20px',
    padding: '20px'
}

const TargetsList = (props) => (
    <div>
        <Paper style={styles}>
            <TextField
                onChange={(value) => props._handleChangeAction(value)}
                placeholder={'Write your new target...'}
                type={'text'}
                value={props._text}
                fullWidth={true}
            />
            <RaisedButton
                onClick={props._onAddTargetClickAction}
                label='Add New Target'
                primary={true}
                fullWidth={true}
            />
        </Paper>
        <Paper style={styles} >
            {
                props._isTargetsAreLoading ?
                    'Loading Targets, please wait for a moment'
                    :
                    props._targets.map((targets, uid) => (
                        <ListItem
                            key={uid}
                            rightIcon={<Delete
                                onClick={() => props._onDeletedTargetClickAction(target.uid)} />}
                        >
                            {target.targetName}
                        </ListItem>
                    ))
            }
        </Paper>
    </div>
)

const mapStateToProps = state => ({
    _text: state.targets.text,
    _targets: state.targets.targets,
    _isTargetsAreLoading: state.targets.isTargetsAreLoading
})
const mapDispatchToProps = dispatch => ({
    _addTargetAction: () => dispatch(addTargetAction()),
    _handleChangeAction: (value) => dispatch(handleChangeAction(value)),
    _onAddTargetClickAction: () => dispatch(onAddTargetClickAction()),
    _onDeletedTargetClickAction: (uid) => dispatch(onDeletedTargetClickAction(uid))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TargetsList)