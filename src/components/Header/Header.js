import React,  {PropTypes} from 'react'
import styleable from 'react-styleable'
import css from './styles.css'
import * as Lang from './../../localization/lang-pl'
const COOL = <i className="fa fa-snowflake-o"></i>
const HEAT = <i className="fa fa-sun-o"></i>
const COOL_GREY = <i className="grey fa fa-snowflake-o"></i>
const HEAT_GREY = <i className="grey fa fa-sun-o"></i>
const BELL = <i className="err fa fa-bell"></i>


function Header ({name, heat, cool, alarm}) {
return (
<div className="header"><b>{name}</b>{alarm > 0 ? BELL : ""} {Number(heat)==1 ? HEAT : (Number(cool) == 1 ? COOL : <span>{Lang.WORKING_IN}<b>{Lang.DEADZONE}</b></span>) } </div>    
)    
}

Header.propTypes = {
name : PropTypes.string.isRequired,
heat : PropTypes.string.isRequired,
cool: PropTypes.string.isRequired,
alarm: PropTypes.string.isRequired    
}

export default styleable(css)(Header)