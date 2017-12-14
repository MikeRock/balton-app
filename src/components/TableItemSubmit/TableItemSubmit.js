import React, {Component, PropTypes} from 'react'
import css from './styles.css'
import styleable from 'react-styleable'
import {Button} from 'react-bootstrap'

const TableItemSubmit = ({name, type, index, value, button, onSubmit}) => {
let handleSubmit = (e) => {
e.preventDefault()    
onSubmit(type, index, value)    
}    
return <tr><td>{name}</td><td><Button bsStyle="primary" onClick={handleSubmit}>{button}</Button></td></tr>
}

TableItemSubmit.propTypes = {
name: PropTypes.string.isRequired,
button: PropTypes.string.isRequired,
value: PropTypes.oneOf([PropTypes.string,PropTypes.number]).isRequired,
onSubmit: PropTypes.func.isRequired,
type: PropTypes.string    
}
TableItemSubmit.defaultProps = {
type: "ANALOG"    
}
export default styleable(css)(TableItemSubmit)