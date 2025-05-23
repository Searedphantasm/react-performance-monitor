import React from 'react';

const formatMemory = (bytes) => {
    if (bytes >= 1024 * 1024 * 1024) {
        return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
    } else if (bytes >= 1024 * 1024) {
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    } else if (bytes >= 1024) {
        return (bytes / 1024).toFixed(2) + ' KB';
    } else {
        return bytes + ' B';
    }
};

const Mem = ({ data }) => {
    const { freeMeme, totalMeme, memUsage, usedMemory } = data;

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Memory Usage</h2>
                <p>Used: {formatMemory(usedMemory)} / Total: {formatMemory(totalMeme)} ({memUsage}% used)</p>
                <p>Free: {formatMemory(freeMeme)}</p>
                <progress className="progress progress-primary" value={memUsage} max="100"></progress>
            </div>
        </div>
    );
};

export default Mem;