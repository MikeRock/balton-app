import React,  {PropTypes} from 'react'
import styleable from 'react-styleable'
import css from './styles.css'
import * as Lang from './../../localization/lang-pl'
const COOL = <i className="fa fa-snowflake-o"></i>
const HEAT = <i className="fa fa-sun-o"></i>
const COOL_GREY = <i className="grey fa fa-snowflake-o"></i>
const HEAT_GREY = <i className="grey fa fa-sun-o"></i>
const BELL = <i className="err fa fa-bell"></i>


function SimpleHeader ({name, heat, cool, alarm}) {
return (
<div className="header"><b>{name}</b>{alarm > 0 ? BELL : ""}</div>    
)    
}

SimpleHeader.propTypes = {
name : PropTypes.string.isRequired,
alarm: PropTypes.string.isRequired    
}

export default styleable(css)(SimpleHeader)