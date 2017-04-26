import $ from 'jquery';
import theMovieDb from 'themoviedb-javascript-library';

const CANCELED = 'Canceled';
const ENDED = 'Ended';

class SearchSeries {
    search(seriesName, callback) {
        if (seriesName === '')
            return;

        theMovieDb.search.getTv({"query":seriesName}, (res => {
            callback(JSON.parse(res).results.slice(0,5));
        }), (err => {
            console.log(err);
        }))
    }

    findDataById(id, callback) {
        theMovieDb.tv.getById({"id":id}, (res => {
            callback(JSON.parse(res));
        }), (err => {
            console.log(err);
        }));
    }

    searchSeason(showData, tryNum, callback) {
        theMovieDb.tvSeasons.getById({"id":showData.id, "season_number": showData.seasons.length - tryNum}, 
                    (res => {
                        let season = JSON.parse(res);
                        callback(this.findClosestEpisode(season.episodes), season.poster_path);
                    }), (err => {
                        if (tryNum === 0) {
                            this.searchSeason(showData, 1, callback);
                        }
                    }));
    }

    findClosestEpisode(episodes) {
        let now = new Date();
        let nextepisodeDate, returndEpisode;

        for (var curr = 0; curr < episodes.length; curr++) {
            var episode = episodes[curr];
            nextepisodeDate = new Date(episode.air_date);

            if (nextepisodeDate > now) {
                returndEpisode = episode;
                break;
            }
        }

        return returndEpisode;
    }

    findNextEpisode(show, callback) {
        this.findDataById(show.id, (showData => {
            if (showData.status !== CANCELED && showData.status !== ENDED) {
                this.searchSeason(showData, 0, ((episode, image) => {
                    callback(episode, image, false);
                }));
            } else {
                callback(null, show.poster_path, true);
            }
        }));
    }
}

module.exports = new SearchSeries();