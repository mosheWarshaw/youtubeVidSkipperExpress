$('#navigation').slimmenu({
    /*Setting it to such a large number is
    to keep it as a drop down menu rather than
    having the links displayed as a header.*/
    resizeWidth: "10000000",
    collapserTitle: "Menu",
    animSpeed: "medium",
    easingEffect: null,
    indentChildren: false,
    childrenIndenter: "&nbsp;"
});


//This uses my custom logo insead of the collapserTitle.
$(".menu-collapser").html(`
    <div id="logoWrapper">
        <div id="logo">
            <div id="topBar">
                <div id="topOfTopBar"></div>
                <div id="bottomOfTopBar"></div>
            </div>
                
            <div id="leftBar"></div>
            <div id="rightBar"></div>
            
            <div id="leftCircle"></div>
            <div id="rightCircle"></div>
        </div>
    </div>

    <style>
        #logoWrapper{
            background-color: rgb(156, 201, 163);
            display: block;
            float: left;
        }
        #logo {
            width: 65px;
            height: 65px;
            background-image: radial-gradient(rgb(156, 201, 163), rgb(67, 66, 76));
            border-radius: 5%;
            margin: auto;
            margin-top: 5px;
        }
        
        #topBar {
            transform: rotate(355deg);
            position: relative;
            z-index: 2;
            margin-left: 18px;
            padding-top: 12px;
        }
        #topOfTopBar {
            width: 30px;
            height: 7px;
            background-color: black;
            border-radius: 50%;
            position: relative;
            z-index: 3;
        }
        #bottomOfTopBar {
            width: 30px;
            height: 5px;
            background-color: black;
            margin-top: -3px;
            position: relative;
            z-index: 4;
            border-radius: 40%;
        }
        
        #leftBar {
            width: 4px;
            height: 30px;
            background-color: black;
            margin-top: -4px;
            margin-left: 18px;
            position: relative;
            z-index: 12;
            border-radius: 20%;
        }
        #rightBar {
            width: 4px;
            height: 30px;
            background-color: black;
            margin-top: -33px;
            margin-left: 45px;
            border-radius: 25%;
            position: relative;
            z-index: 11;
        }
        
        #leftCircle,
        #rightCircle {
            z-index: 20;
            background-color: black;
            width: 12px;
            height: 8px;
            border-radius: 50%;
        }
        #leftCircle {
            margin-top: -1.5px;
            margin-left: 9.5px;
        }
        #rightCircle {
            margin-top: -12px;
            margin-left: 36.5px;
        }
    </style>


    <div class="collapse-button">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
    </div>
`);