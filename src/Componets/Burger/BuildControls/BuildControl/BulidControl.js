import React from 'react';
import classes from "./BuildControl.css";

const buildControl = (props) =>(
    <div className={classes.BuildControl}>
    <div className={classes.labels}>{props.labels}</div>
    <button className={classes.less} onClick={props.removed} disabled={props.disabled}>Less</button>
    <button className={classes.more} onClick={props.added}>more</button>
</div>
);
export default buildControl;