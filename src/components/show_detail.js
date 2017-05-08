import React from 'react';
import FavoritesUtil from '../utils/favorites.js';

const ShowDetail = ({show, nextepisode, poster, isShowCanceled, onShowSelect}) => {
    if (!show) {
        return (<div className="show-detail col-md-6">Select a show</div>);
    }

    console.log(show);

    let isVisible = false;
    let isFavorite = FavoritesUtil.isFavorite(show.id);
    console.log(isFavorite);
    isShowCanceled = isShowCanceled === undefined ? true : isShowCanceled;

    if (nextepisode != null) {
        let now = new Date();
        let nextepisodeDate = new Date(nextepisode.air_date);

        isVisible = nextepisodeDate > now;
    }

    let imgUrl, summary, showSummary = '';

    if (poster) {
        imgUrl = `http://image.tmdb.org/t/p/w500/` + poster;
    }

    if (show.overview) {
        showSummary = show.overview;
    }

    if(isVisible) {
        if (nextepisode.overview !== '') {
            summary = nextepisode.overview;
        } else {
            summary = `We don't have summary for ${nextepisode.name} yet.`;
        }
    }

    var addToFavorites = function() {
        FavoritesUtil.addToFavorites(show.id);
        isFavorite = true;
        onShowSelect(show);
    };

    var removeFromFavorites = function() {
        FavoritesUtil.removeFromFavorites(show.id);
        isFavorite = false;
        onShowSelect(show);
    };

    return (
        <div className="show-detail col-md-6">
            <div className="row">
                <table className="centered-table">
                    <tbody>
                        <tr>
                            <td valign="top"><img className="showImg-detail" src={imgUrl} /></td>
                            <td valign="middle">
                                <div><b>{show.name}</b></div>
                                <div>{showSummary}</div>
                                {isVisible &&
                                    <div>
                                        <div><br/><b>Next episode: </b> {nextepisode.air_date}</div>
                                    </div>
                                }
                                {!isVisible && !isShowCanceled &&
                                    <div><br/><b>There is no return date yet - keep calm and date will come (:</b></div>
                                }
                                {isShowCanceled &&
                                    <div><br/><b>The show has ended, there are no more episodes coming :(</b></div>
                                }
                            </td>
                        </tr>    
                    </tbody>
                </table>
            </div>
            <div className="row">
                <div className="col-md-12 summary">
                    {isVisible &&
                        <div><br/>
                        Season <b>{nextepisode.season_number}</b> Episode <b>{nextepisode.episode_number}</b> - <b>{nextepisode.name}</b><br/>
                        {summary}<br/>
                        </div>
                    }
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 favorites-section">
                    {!isShowCanceled && 
                        (isFavorite ? <div className="btn btn-danger" onClick={() => removeFromFavorites()}>Remove from Favorites</div>
                            : <div className="btn btn-primary" onClick={() => addToFavorites()}>Add to Favorites</div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default ShowDetail;