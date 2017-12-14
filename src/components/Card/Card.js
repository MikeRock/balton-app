import React, {Component} from 'react'
import styleable from 'react-styleable'
import css from './styles.css'

function Card ({children}) {
return (
<div className="card">{children}</div>    
)    
}

function mapStateToProps(state) {
return {
state: state    
}
}

export default styleable(css)(Card)