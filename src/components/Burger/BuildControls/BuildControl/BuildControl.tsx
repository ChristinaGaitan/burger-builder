import React from 'react'
import classes from './BuildControl.module.css'

interface Props {
  label: string
  disabled: boolean
  added: () => Event
  removed: () => Event
}

const BuildControl = (props: Props) => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button onClick={props.removed} className={classes.Less} disabled={props.disabled}>Less</button>
    <button onClick={props.added} className={classes.More}>More</button>
  </div>
);

export default BuildControl;
