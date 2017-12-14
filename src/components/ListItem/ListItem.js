import React from 'react'
import styleable from 'react-styleable'
import css from './styles.css'


function ListItem ({name, value, measure}) {
return <li><span className="title">{name}</span> <span className="value">{value}</span> {measure}</li>
}

ListItem.propTypes = {
name: React.PropTypes.string.isRequired,
value: React.PropTypes.string.isRequired,
measure: React.PropTypes.string    
}
ListItem.defaultProps = {
measure:""    
}

function mapStateToProps(state) {
return {
state: state    
}
}
export default styleable(css)(ListItem)
 