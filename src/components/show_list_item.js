import React from 'react';

const ShowListItem = ({show, onShowSelect}) => {
    var imgUrl = '';

    if (show.poster_path) {
        imgUrl = `http://image.tmdb.org/t/p/w500/` + show.poster_path;
    }

    return (
        <li className="list-group-item" onClick={() => onShowSelect(show)}>
            <div className="show-list">
                <table>
                    <tbody>
                        <tr>
                            <td><img valign="top" className="media-object showImg" src={imgUrl} /></td>
                            <td><span valign="middle">{show.name}</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </li>
    );
};

export default ShowListItem;