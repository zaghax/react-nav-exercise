
const getMobileBreakpoint = () => {

    let isMobile = false;

    isMobile = !!navigator.userAgent.match(/iPad|iPhone|Android|BlackBerry|Windows Phone|webOS/i);

    return isMobile

}

export default getMobileBreakpoint;