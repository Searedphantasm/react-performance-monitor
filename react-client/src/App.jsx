import {useState, useEffect} from 'react';
import viteLogo from '/vite.svg';
import socket from './lib/socketConnection.js';
import './App.css';
import Widget from "./components/Widget.jsx";

function App() {

    const [performanceData, setPerformanceData] = useState({});

    useEffect(() => {
        socket.on('perfData', (data) => {
            const copyPerfData = {...performanceData};
            copyPerfData[data.macA] = data;
            setPerformanceData(copyPerfData);
        })
    }, []);

    const widgets = Object.values(performanceData).map(d => <Widget key={d.macA} data={d} />)

    return (
        <>
            <header className={"bg-base-200 py-3"}>
                <h1 className={"text-xl text-center text-primary "}>
                    React Performance Monitor
                </h1>
            </header>
            <main className={"container mx-auto"}>
                <section>
                    {widgets}
                </section>
            </main>
        </>
    )
}

export default App
