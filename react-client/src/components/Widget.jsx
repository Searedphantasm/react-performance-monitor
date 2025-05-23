import React from 'react';
import Cpu from "./Cpu.jsx";
import Mem from "./Mem.jsx";
import Info from "./Info.jsx";

const Widget = ({ data }) => {
    const {
        freeMeme,
        totalMeme,
        memUsage,
        usedMemory,
        cpuLoad,
        upTime,
        cpuType,
        numCors,
        cpuSpeed,
        macA,
    } = data;

    const cpuData = {
        cpuLoad,
    };

    const memData = {
        freeMeme,
        totalMeme,
        memUsage,
        usedMemory,
    };

    const infoData = {
        macA,
        cpuType,
        cpuSpeed,
        numCors,
        upTime,
    };

    return (
        <div className="card bg-base-100 shadow-xl mb-4">
            <div className="card-body">
                <h2 className="card-title">Client: {macA}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Cpu data={cpuData} />
                    <Mem data={memData} />
                    <Info data={infoData} />
                </div>
            </div>
        </div>
    );
};

export default Widget;