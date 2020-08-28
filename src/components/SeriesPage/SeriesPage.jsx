import React from 'react';

const SeriesPage = ({match}) => {
    const id = match.params.id;
    return ( 
        <div>Will show data about tv series, id: {id}</div>
    );
}
 
export default SeriesPage;