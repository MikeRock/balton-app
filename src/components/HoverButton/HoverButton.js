import React, {Component} from 'react'
import {Button, ButtonToolbar, OverlayTrigger, Popover} from 'react-bootstrap'
const icon = <i className="fa fa-circle-thin"></i>
const circle = <i style={{color:"rgb(81, 200, 186)"}} className="fa fa-circle"></i>
const HoverButton = ({name, values}) => {
let popover = (
    <Popover title={name}>
    <div>
    {Object.keys(values).map((key, index) => <div>{circle}{key}{' '}<b>{values[key]}</b></div>)}
    </div>
    </Popover>)    
return (
    <span>
    <ButtonToolbar style={{display: "inline-block", marginRight:"6px"}}>
    <OverlayTrigger trigger="hover" placement="bottom" overlay={popover}>
      <Button >{icon}{name}</Button>
    </OverlayTrigger>
    </ButtonToolbar>
    </span>
)
}

export default HoverButton