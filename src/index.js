import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import SearchBar from './components/search_bar';
import ShowsList from './components/shows_list';
import ShowDetail from './components/show_detail';
const API_KEY = 'AIzaSyCmaEVnHC6BU6u5uDiyVNAuYh8ixud_qK0';
const searchSeries = require('./searchSeries.js');

class App extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            shows: [],
            selectedShow: null,
            nextepisode: null,
            currImg: null,
            isShowCanceled: true
        };

        this.showSearch('Fear the Walking Dead');
    }

    showSearch(term) {
        searchSeries.search(term, (shows) => {
            this.setState({
                shows: shows,
                selectedShow: null,
                nextepisode: null
            });
        });
    }

    showSelected(selectedShow) {
        this.setState({selectedShow: selectedShow, nextepisode: null, currImg: selectedShow.poster_path});

        searchSeries.findNextEpisode(selectedShow, (nextepisode, image, isShowCanceled) => {
            if (image === null) {
                image = this.state.currImg;
            }

            this.setState({ nextepisode: nextepisode,
                            currImg: image,
                            isShowCanceled: isShowCanceled  });
        });
    }

    render() {
        const showSearch = _.debounce((term) => { this.showSearch(term) }, 300);
        const showSelected = _.debounce((selectedShow) => { this.showSelected(selectedShow) }, 0)

        return (
            <div>
                <SearchBar onSearchTermChange={ showSearch } />
                <ShowDetail show={ this.state.selectedShow } nextepisode={ this.state.nextepisode } poster={ this.state.currImg } isShowCanceled={ this.state.isShowCanceled } />
                <ShowsList 
                    onShowSelect={ showSelected }
                    shows={ this.state.shows } /> 
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));