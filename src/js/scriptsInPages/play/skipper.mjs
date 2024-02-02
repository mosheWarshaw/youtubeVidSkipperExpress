export {Skipper};

class Skipper{
    #arr;
    #isFirstTime = true;
    #player;
    
    onStateChange(event){
        if(event.data === YT.PlayerState.PLAYING && this.#isFirstTime){
            //In seconds.
            let whereToSkipTo;
            //In milliseconds.
            let whenToSkip;
            let timeSkipped = 0;
            const arr = this.#getArr();
            for(let i = 0; i < arr.length; i++){
                /*Explanation for why you subtract timeSkipped:
                if a user has 2 parts to be skipped, for example
                from 10 seconds to 26 seconds, and from 30 seconds
                to 70 seconds, then the first timer should be set to seek
                to 20 seconds 10 seconds after the video started,
                and the second timer should be set to seek to
                70 seconds after 14 seconds. The second timer shouldn't skip
                after 30 seconds, because the video didn't play for
                30 seconds when it reached the 30 second mark of the video.*/
                whenToSkip = (arr[i]["start"] - timeSkipped) * 1000;
                whereToSkipTo = arr[i]["end"];
                timeSkipped += arr[i]["end"] - arr[i]["start"];
                /*If I call the setTimeout (instead of calling
                setTheTimeout) function here, then the final
                values of the loop's whenToSkip and howLongToSkip
                would be used by the callback because
                it would look at its parent's scope when it's time to
                run it.*/
                this.setTheTimeout(whenToSkip, whereToSkipTo);
            }

            this.#isFirstTime = false;
        }
    }

    setTheTimeout(whenToSkip, whereToSkipTo){
        function timeoutCallback(){
            this.#player.seekTo(whereToSkipTo);
        }

        setTimeout(
            timeoutCallback.bind(this),
            whenToSkip
        );
    }

    #getArr(){
        return this.#arr;
    }
    setArr(arr){
        this.#arr = arr;
    }

    setPlayer(player){
        this.#player = player;
    }   
}