document.addEventListener('DOMContentLoaded', () => {
    let startStopBtn = document.querySelector('.boxes-button');
    let resetBox = document.querySelector('#reset-box'); 
    let timer = false;
    let seconds = 0;
    let minutes = 0;

    startStopBtn.addEventListener('click', () => {
        timer = !timer;

        if(timer){
            pomoWatch();
        }
    });

    resetBox.addEventListener('click', (e)=>{
        e.stopPropagation();
        reset();
    })

    function pomoWatch(){
        if(timer){
            seconds ++;
            
            if(seconds === 60){
                minutes++;
                seconds = 0;
            }
            let min1 = Math.floor(minutes / 10);
            let min2 = minutes % 10;

            let sec1 = Math.floor(seconds / 10);
            let sec2 = seconds % 10;

            document.querySelector('.mn1').textContent = min1;
            document.querySelector('.mn2').textContent = min2;
            document.querySelector('.sc1').textContent = sec1;
            document.querySelector('.sc2').textContent = sec2;

            setTimeout(pomoWatch, 1000);
        }
    }

    function reset() {
        timer = false;
        seconds = 0;
        minutes = 0;
        document.querySelector('.mn1').textContent = '0';
        document.querySelector('.mn2').textContent = '0';
        document.querySelector('.sc1').textContent = '0';
        document.querySelector('.sc2').textContent = '0';
    }

})