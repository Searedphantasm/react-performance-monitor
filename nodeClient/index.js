// The node program that captures local performance data
// and sends it via socket to the server.
// Req:
// - socket.io-client

const os = require("os");
const io = require("socket.io-client");
const options = {
    auth:{
        token: "abcd"
    }
}
const socket = io('http://localhost:3000', options);
socket.on('connect', () => {
    console.log("Connected to the server");

    const nI = os.networkInterfaces();
    let macA;

    for (const nIKey in nI) {
        const isInternetFacing = nI[nIKey][0].internal;
        if (isInternetFacing){
            console.log(nI)
            macA = nI[nIKey][0].mac;
            break;
        }

    }
    console.log(macA)

    const perfDataInterval = setInterval(async () => {
        const perfData = await performanceLoadData();
        perfData.macA = macA;

        socket.emit("perfData", perfData);
    },1000);

    socket.on('disconnect', () => {
        clearInterval(perfDataInterval);
    });
})


// Function to get average CPU times
const cpuAvg = () => {
    const cpus = os.cpus();
    let totalIdle = 0;
    let totalTick = 0;

    // Aggregate times across all CPU cores
    cpus.forEach((cpu) => {
        for (const type in cpu.times) {
            totalTick += cpu.times[type];
        }
        totalIdle += cpu.times.idle;
    });

    // Return average times per core
    return {
        idle: totalIdle / cpus.length,
        total: totalTick / cpus.length
    };
}


const getCpuLoad = () => new Promise((resolve, reject) => {
    const start = cpuAvg();
    setTimeout(() => {
        const end = cpuAvg();
        const idleDiff = end.idle - start.idle;
        const totalDiff = end.total - start.total;

        // calculate the percentage
        const percentOfCpu = 100 - Math.floor(100 * idleDiff / totalDiff);
        console.log(`CPU load: ${percentOfCpu}%`);
        resolve(percentOfCpu);
    },100);
})

const performanceLoadData = () => new Promise(async (resolve, reject) => {


    const osType = os.type();
// Number of seconds uptime
    const upTime = os.uptime();
// in bytes
    const freeMeme = os.freemem();
// total memory
    const totalMeme = os.totalmem();

    const usedMemory = totalMeme - freeMeme;
    const memUsage = Math.floor(usedMemory / totalMeme * 100) /100;

    const cpus = os.cpus();

    const cpuType = cpus[0].model;

    const numCors = cpus.length;

    const cpuSpeed = cpus[0].speed;

    const cpuLoad = await getCpuLoad();

    resolve({
        freeMeme: freeMeme,
        totalMeme: totalMeme,
        cpuLoad: cpuLoad,
        upTime: upTime,
        cpuType: cpuType,
        numCors: numCors,
        cpuSpeed: cpuSpeed,
        usedMemory: usedMemory,
        memUsage: memUsage,
    });
});




const run = async () => {
  const data = await performanceLoadData();
  console.log(data);
}

run();



