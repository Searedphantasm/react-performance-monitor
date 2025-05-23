import React from 'react';

const formatUptime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
};

const Info = ({ data }) => {
    const { macA, cpuType, cpuSpeed, numCors, upTime } = data;

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">System Information</h2>
                <p><strong>MAC Address:</strong> {macA}</p>
                <p><strong>CPU Type:</strong> {cpuType}</p>
                <p><strong>CPU Speed:</strong> {cpuSpeed} MHz</p>
                <p><strong>Number of Cores:</strong> {numCors}</p>
                <p><strong>Uptime:</strong> {formatUptime(upTime)}</p>
            </div>
        </div>
    );
};

export default Info;