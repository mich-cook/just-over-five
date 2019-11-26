import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import Disk from './Disk';
import Disks from './Disks';
import AddDiskForm from './AddDiskForm';

import * as serviceWorker from './serviceWorker';

const diskList = [
  { "title": "BD", "games": ["Boulder Dash"], "blocksFree": 400 },
  { "title": "impossible", "games": ["Impossible Mission"], "blocksFree": 257 },
  { "title": "archon2", "games": ["Adept: Archon 2"], "blocksFree": 575}
];

ReactDOM.render(<div>
	<Disk game="DROL" />
	<Disk game="Pogo Joe" />
	<Disk game="Choplifter" />
    <Disks games={diskList} />
    <AddDiskForm />
</div>, document.getElementById('disks'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
