import React, {Fragment} from 'react'
import './Headers.css'

class Headers extends React.Component {
    constructor(props) {
        super(props)
    }


    render() { 
        return (
            <p className="headerStyle">
                THIS IS THE HEADER OF : {this.props.personName}, whose motto {"\n"} : 
                {this.props.motto}
            </p>
        )
    }
}

export default Headers

