document.getElementById("javascriptDisabled").setAttribute("hidden", "");
let touchArray = ['0'];
let startCoordinate = { x: 0, y: 0 };
let endCoordinate = { x: 0, y: 0 };
document.body.addEventListener("touchstart", touchStartHandler, { passive: false });
function touchStartHandler(e) {
    touchArray[0] = window.scrollY;
    if(document.body.scrollTop === 0){
        if (typeof e["changedTouches"] !== "undefined") {
            let touch = e.targetTouches[0];
            startCoordinate.x = touch.screenX;
            startCoordinate.y = touch.screenY;
        } else {
            startCoordinate.x = e.screenX;
            startCoordinate.y = e.screenY;
        }
    }
}
document.body.addEventListener("touchend", touchEndHandler, { passive: false });
function touchEndHandler(e) {
    if(window.scrollY === 0){
        if (typeof e["changedTouches"] !== "undefined"){
            let touch = e.changedTouches[0];
            endCoordinate.x = touch.screenX;
            endCoordinate.y = touch.screenY;
        } else {
            endCoordinate.x = e.screenX;
            endCoordinate.y = e.screenY;
        }
        let changeX = startCoordinate.x - endCoordinate.x;
        let changeY = startCoordinate.y - endCoordinate.y;
        let changeBoolean = (changeX, changeY) => {
            return changeY<0 /*not swipeup*/ && ((Math.abs(changeX) <= 100 /*horizontal swipe not more than 100px*/ && Math.abs(changeY) >= 300) /*Vertical swipe more than 300px*/ );
            /* Explanation: this boolean gives 'true' result only if it is a swipedown and (horizontal swipe not more than 100px and vertical swipe more than 300px)*/
        }
        if (changeBoolean(changeX, changeY)){
            window.location.reload();
        }
        touchArray = [];
        if (document.getElementById('reloadFrame')){
            document.body.removeChild(document.getElementById('reloadFrame'));
            document.body.removeChild(document.getElementById('reloadHr'));
            document.body.removeChild(document.getElementById('reloadBackground'));
        }
    }
}
document.body.addEventListener('touchmove', touchMoveHandler, { passive: false });
function touchMoveHandler(e) {
    if (touchArray[0]=== 0){
        touchArray.push(e.changedTouches[0]);
        if (touchArray[1].screenY - touchArray[touchArray.length-1].screenY < (0-50) && touchArray[1].screenX - touchArray[touchArray.length-1].screenX > (0-100) &&  !document.getElementById("reloadFrame")){
            let reloadBackground = document.createElement('div');
            reloadBackground.style.width = '100vw';
            reloadBackground.style.height = '100vh';
            reloadBackground.style.position = 'absolute';
            reloadBackground.style.background = 'rgba(0,0,0,0.5)';
            reloadBackground.style.top = '0';
            reloadBackground.style.left = '0';
            reloadBackground.id = 'reloadBackground';
            let reloadFrameInnerHTML = `<img id='reloadImg' src="./ReloadIcon.png" style='height: 50px; width:50px'>`;
            let reloadFrame = document.createElement('div');
            reloadFrame.id ='reloadFrame';
            reloadFrame.innerHTML = reloadFrameInnerHTML;
            document.body.style.alignItems = 'center';
            reloadFrame.style.left = '50%';
            reloadFrame.style.top = '0px';
            reloadFrame.style.transform = 'translateX(-50%)';
            reloadFrame.style.position = 'absolute';
            reloadFrame.style.transition = 'all 0.2s ease-out'; //adjust the duration of transition as you see fit
            let reloadHr = document.createElement('div');
            reloadHr.id ='reloadHr';
            reloadHr.style.top = '300px';
            reloadHr.style.position = 'absolute';
            reloadHr.style.background = 'white';
            reloadHr.style.width = '100%';
            reloadHr.style.textAlign = 'center';
            reloadHr.innerHTML = `<span> Drag till here to reload</span>`;
            document.body.appendChild(reloadBackground);
            document.body.appendChild(reloadFrame);
            document.body.appendChild(reloadHr);
            document.getElementById('reloadFrame').style.marginTop = '0px';
        }
        if (touchArray[1].screenY - touchArray[touchArray.length-1].screenY < (0-50) && touchArray[1].screenX - touchArray[touchArray.length-1].screenX > (0-100) && touchArray[1].screenY - touchArray[touchArray.length-1].screenY >= (0-300)){
            let marginTopFloat = parseFloat(document.getElementById('reloadFrame').style.marginTop);
            if (marginTopFloat<250){
                marginTopFloat = 0 - (touchArray[1].screenY - touchArray[touchArray.length-1].screenY + 50);
                document.getElementById('reloadFrame').style.marginTop = `${marginTopFloat}px`;
                let rotatedAngle = marginTopFloat*1.44;
                document.getElementById('reloadImg').style.transform = `rotate(${rotatedAngle}deg)`;
            }
        }
    }
}