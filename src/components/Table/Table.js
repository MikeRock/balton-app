import React, {PropTypes} from 'react'
import styleable from 'react-styleable'
import css from './styles.css'
import {Table as Tab} from 'react-bootstrap' 

function Table ({children, header}) {
 const child_arr = React.Children.toArray(children)
return  (
 <Tab className="table">
 {header ? <thead>
 <tr>
    <th colspan="2">Nazwa</th>
</tr>
 </thead> :""}
 <tbody>
{children}   
</tbody> 
 </Tab>)
}
Table.propTypes = {
header: PropTypes.bool
}
Table.defaultProps = {
header: true    
}

export default styleable(css)(Table)