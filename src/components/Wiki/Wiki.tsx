import React from 'react';

import './Wiki.css';
import backgroundImageStyling from "../../styles/backgroundImageStyling";

import MainNavbar from "../../utils/MainNavbar";
import EntryMenu from "./EntryMenu";
import Landing from "./Landing";
import Entry from "./Entry";

//TODO:
// [x] remake with bootstrap components
// [] use states to switch between Landing/Entry components in the rightPane div
// [] add crud interactions

//get navbar logo
const logo = require('../../images/swarmLogoIcon.png');
const background = backgroundImageStyling();

class Wiki extends React.Component{
    componentDidMount() {
        // @ts-ignore, object could possibly be null
        document.getElementsByTagName("BODY")[0].classList.add('wikiBody');
    }

    render(){
        return(
            <section style={background}>
                <MainNavbar logo={logo} />
                <div id='content'>
                  <EntryMenu />
                  <div id='rightPane' className="bg-dark">
                      {/*<Landing />*/}
                      <Entry />
                  </div>
                </div>
            </section>
        );
    }
}

export default Wiki