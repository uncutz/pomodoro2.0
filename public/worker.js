let intervalId;
//timer
onmessage = (e) => {

    if (e.data.type === 'start') {
        clearInterval(intervalId);
        let time   = e.data.time || 0;
        intervalId = setInterval(() => {
            time++;
            console.log(time)
            //time is achieved, stop timer
            if (time > e.data.maxDuration) {
                postMessage({
                                time:    time - 1,
                                running: false
                            });
                clearInterval(intervalId);
            } else { //timer still running
                postMessage({
                                time:    time,
                                running: true
                            });
            }
        }, 1000);
    } else {
        clearInterval(intervalId)
    }
};