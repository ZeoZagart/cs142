import React from 'react'
import ReactDOM from 'react-dom'
import Example from './components/example/Example'
import States from './components/states/States'
import './styles/main.css'

class P4 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openPage: 1
        }

        this.switchPage = this.switchPage.bind(this)
    }

    switchPage(event) {
        let newPage = 1 - this.state.openPage
        this.setState({
            openPage: newPage
        })
    }

    render() {
        const page = this.state.openPage === 1 ? <Example /> : <States />
        return (
            <div>
                <button onClick={this.switchPage}/>
                {page}
            </div>
        )   
    }
}

ReactDOM.render(
    <P4 />,
    document.getElementById('reactapp'),
)