import React from 'react';
import ShowListItem from './show_list_item';

const ShowsList = (props) => {
    const showItems = props.shows.map((show) => {
        return (<ShowListItem 
                onShowSelect = {props.onShowSelect}
                key={show.id} 
                show={show} />);
        });

    return (
        <ul className="col-md-4 col-md-offset-2 list-group" >
            {showItems}
        </ul>
    );
};

export default ShowsList;