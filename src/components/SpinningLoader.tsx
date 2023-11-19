import React from 'react';

const SpinningLoader = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="border-t-4 border-blue-500 border-solid rounded-full h-36 w-36 animate-spin"></div>
        </div>
    );
};

export default SpinningLoader;
