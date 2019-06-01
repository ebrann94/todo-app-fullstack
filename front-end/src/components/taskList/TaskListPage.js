import React from 'react';
import Header from '../Header';
import List from './List';
import AddItem from './AddItem';
import RemoveItems from './RemoveItems';

const App = () => {
    return (
        <div>
            <Header />
            <div className="container">
                <div className="list-widget">
                    <div className="list-controls">
                        <AddItem />
                        <RemoveItems />
                    </div>
                    <List />
                </div>
            </div>
        </div>
    );
};

export default App;