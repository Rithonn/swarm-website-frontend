import React from 'react';

import './Wiki.css';
import backgroundImageStyling from "../../styles/backgroundImageStyling";

import MainNavbar from "../../utils/MainNavbar";
import EntryMenu from "./EntryMenu";
import Landing from "./Landing";
import Entry from "./Entry";

//TODO:
// [x] remake with bootstrap components
// [x] use states to switch between Landing/Entry components in the rightPane div
// [ ] flush out edit/comments tab
// [ ] add crud interactions

//get navbar logo
const logo = require('../../images/swarmLogoIcon.png');
const background = backgroundImageStyling();

interface wikiState{
    view: string;
}

//component has no props, hence {}
class Wiki extends React.Component<{}, wikiState>{
    constructor(props = {}) {
        super(props);
        this.rightPaneHandler = this.rightPaneHandler.bind(this);
        this.state = {
            view: "landing"
        }
    }

    rightPaneHandler(entryId: string){
        this.setState({
            view: entryId
        });
    }

    componentDidMount() {
        // @ts-ignore, object could possibly be null
        document.getElementsByTagName("BODY")[0].classList.add('wikiBody');
    }

    render(){
        let rightPaneComponent;
        // @ts-ignore
        this.state.view === "landing" ? rightPaneComponent = <Landing /> : rightPaneComponent = <Entry id={this.state.view}/>

        return(
            <section style={background}>
                <MainNavbar logo={logo} />
                <div id='content'>
                  <EntryMenu action={this.rightPaneHandler}/>
                  <div id='rightPane' className="bg-dark">
                      {rightPaneComponent}
                  </div>
                </div>
            </section>
        );
    }
}

export default Wiki