import React from 'react';

const LoadingSpinner = (props) => {
    const styles = {
        height: props.height || '50px',
        width: props.width ||'50px'
    };

    const classNames = `loading-spinner ${props.className}`;

    return (
        <div style={styles} className={classNames}>
            <img src="/spinner.svg" alt="loading spinner" className="spinner__image" />
        </div>
    )
};

export default LoadingSpinner;