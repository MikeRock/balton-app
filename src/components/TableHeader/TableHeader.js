import React, {PropTypes} from 'react'
import css from './styles.css'
import styleable from 'react-styleable'

function TableHeader ({header, onClick}) {
return (
<tr style={{cursor:"default"}}styleclassName="rowHeader" onClick={onClick}><th>{header}</th><th></th></tr>    
)
}

TableHeader.propTypes = {
header: PropTypes.string.isRequired,
onClick: PropTypes.func    
}

TableHeader.defaultProps = {
onClick: () => {}     
}
export default styleable(css)(TableHeader)
