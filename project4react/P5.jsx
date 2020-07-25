import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter, Route} from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Example from './components/example/Example'
import States from './components/states/States'
import './styles/main.css'

class P5 extends React.Component {
    statePage = "states"
    example = "ex"
    browserHistory = createBrowserHistory()
    constructor(props) {
        super(props)
        this.state = {
            openPage: 1
        }
        this.switchPage = this.switchPage.bind(this)
    }

    switchPage(event) {
        let newPage = 1 - this.state.openPage
        let link = newPage === 1 ? this.statePage : this.example
        this.setState({openPage: newPage})
        this.browserHistory.push(link)
    }

    render() {
        const page = this.state.openPage === 1 ? <Example /> : <States />
        return (
            <div>
                <button onClick={this.switchPage}/>
                <HashRouter history={this.browserHistory}>
                    <Route path={this.statePage} component={States}/>
                    <Route path={this.example} component={Example}/>
                </HashRouter>
                {page}
            </div>
        )   
    }
}

ReactDOM.render(
    <P5 />,
    document.getElementById('reactapp'),
)