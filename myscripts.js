const playbutton=document.getElementsByClassName("play")[0];
        const lapbutton=document.getElementsByClassName("lap")[0];
        const resetbutton=document.getElementsByClassName("reset")[0];
        const clearbutton=document.getElementsByClassName("lap-clear-button")[0];
        const mins=document.getElementsByClassName("minute")[0];
        const second=document.getElementsByClassName("sec")[0];
        const millisecond=document.getElementsByClassName("msec")[0];
        const laps=document.getElementsByClassName("laps")[0];
        const bgcolor=document.getElementsByClassName("outer_rect")[0];
        /*Defining necessary variables for counting minutes,seconds & milliseconds*/
        let isplay=false;
        let seccnt =0;
        let sec;
        let millicnt=0;
        let msecond;
        let min;
        let mntcnt=0;
        let li=0;
        let f=0;
        let isreset=false;
        /*Toggle button funtioning*/
        const togglebutton= (event) =>{
            if( f== 0){
                lapbutton.classList.remove("hide")
                resetbutton.classList.add('hide')
            }
            if ( f== 1 ){
                lapbutton.classList.add('hide')
                resetbutton.classList.remove('hide')
            }

        }
        /*Defining function of play algorithm*/
        const play = () =>{
            if(!isplay && !isreset)
            {
                f = 0;
                playbutton.innerHTML="Pause";
                bgcolor.classList.add("animation");
                min=setInterval(() => {
                mins.innerHTML=(++mntcnt);
            }, 60*1000);
                sec=setInterval(() => {
                    if(seccnt===60){
                        seccnt=0;
                    }
                second.innerHTML=(++seccnt);
            }, 1000);
            msecond=setInterval(() => {
                if(millicnt===100){
                    millicnt=0;
                }
                millisecond.innerHTML=(++millicnt);
            }, 10);
                isplay=true;
                isreset=true;
            }
            else{
                playbutton.innerHTML='Play';
                clearInterval(sec);
                clearInterval(msecond);
                clearInterval(min)
                isplay=false;
                isreset=false;
                f= 1;
                bgcolor.classList.remove("animation");
                }
         togglebutton();
        }
        /*Defining function of reset algorithm*/
        const reset =() => {
            isreset=true;
            play()
            lapbutton.classList.add("hide")
            resetbutton.classList.add("hide")
            second.innerHTML='00 '
            millisecond.innerHTML='00 '
            mins.innerHTML='00 ';
        }
        /*Defining function of lap algorithm*/
        const lap =() =>{
            const lis=document.createElement("lis");
            const n=document.createElement("span");
            const ts= document.createElement("span")
            lis.setAttribute("class","lap-time")
            n.setAttribute("class","num")
            ts.setAttribute("class","time-stamp")
            ts.innerHTML= "0" + " : " +  mntcnt + " : "  + seccnt + " : "  + millicnt;
            localStorage.setItem("time",ts);
            lis.append(n, ts);
            laps.append(lis);
        }
        /*Defining function of clear button algorithm*/
        const clearall = () =>{
            laps.innerHTML= '';
            laps.append(clearbutton);
        }
        /*Defining function of keyboard operation */
        document.addEventListener("keydown",e=> {
            e.preventDefault();
            if(e.key.toLowerCase()=="x"
            && e.ctrlKey)
        {
            
        }
        if(e.key.toLowerCase()=="r"
            && e.ctrlKey)
        {
            resetbutton.innerHTML="reset";
        }
        if(e.key.toLowerCase()=="l"
            && e.ctrlKey)
        {
            lapbutton.innerHTML="lap";
        }
        if(e.key.toLowerCase()=="p"
            && e.ctrlKey)
        {
            togglebutton.event();
        }
    });
       /*Defining function of event listener algorithm*/
        playbutton.addEventListener("click",play);
        resetbutton.addEventListener("click",reset);
        lapbutton.addEventListener("click",lap);
        clearbutton.addEventListener("click",clearall)