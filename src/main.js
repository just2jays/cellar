import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './Counter';
import SongList from './SongList';
 
document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    React.createElement(SongList),
    document.getElementById('mount')
  );
});