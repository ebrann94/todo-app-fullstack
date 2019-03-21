import React from 'react';
import uuid from 'uuid';

import Header from '../Header';
import List from './List';
import AddItem from './AddItem';
import RemoveItems from './RemoveItems';

class App extends React.Component {

    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <div className="list-widget">
                        <div className="list-controls">
                            <AddItem />
                            <RemoveItems />
                        </div>
                        <List 
                            items={this.props.items} 
                            handleCompleteItem={this.handleCompleteItem}
                            handleRemoveOne={this.handleRemoveOne}
                        />
                    </div>
                </div>

            </div>
        );
    }
}

export default App;