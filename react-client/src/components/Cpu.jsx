import React from 'react';

const Cpu = ({ data }) => {
    const { cpuLoad } = data;

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">CPU Load</h2>
                <p>{cpuLoad}%</p>
                <progress className="progress progress-primary" value={cpuLoad} max="100"></progress>
            </div>
        </div>
    );
};

export default Cpu;