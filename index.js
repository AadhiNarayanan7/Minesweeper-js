var minesgrid=[];
var minescountgrid=[];
var minesoppenedgrid=[];
var height,width;
var mines=10;
height=20;
width=20;
var isStarted=false;
createGrid(height,width);

function createGrid(h,w){
    minesgrid=[];
    minescountgrid=[];
    minesoppenedgrid=[];
    for(var a=0;a<height;a++){
        minesgrid[a]=new Array(width);
        minescountgrid[a]=new Array(width);
        minesoppenedgrid[a]=new Array(width);
    }
    document.querySelector("div.set").innerHTML="";
    var row="",column="";
 for(var a=0;a<h;a++){
    row=row+" 1fr";
    column="";
    for(var b=0;b<w;b++){
        column=column+" 1fr";
        document.querySelector("div.set").innerHTML=document.querySelector("div.set").innerHTML+"<button class='btnbox' id='"+a+","+b+"'></button>";
        //document.getElementById(a+""+b).addEventListener("click",open);
    }
 }
 for(var a=0;a<h;a++){
    for(var b=0;b<w;b++){
        document.getElementById(a+","+b).addEventListener("click",open);
        document.getElementById(a+","+b).addEventListener("mousedown",function(e){
            if(e.button==2 && isStarted){ 
                if(document.getElementById(this.id).innerText=="🚩") document.getElementById(this.id).innerText="";
                else document.getElementById(this.id).innerText="🚩";
            }
            return;
        });
    }
 }
 document.getElementById("gamegrid").style.setProperty("grid-template-columns",column);
 document.getElementById("gamegrid").style.setProperty("grid-template-rows",row);
 document.getElementById("gamegrid").style.setProperty("width",(w*20)+"px");
}

function open(){

    var tmpid=this.id+"";
    if(!isStarted){
    for(var a=0;a<height;a++){
        for(var b=0;b<width;b++){
            minesgrid[a][b]=0;
            minescountgrid[a][b]=0;
            minesoppenedgrid[a][b]=0;
        }
    }
    setStyle(this.id+"");
    var tempBool=true;
    var count=0;
    var h,w;
    while(tempBool){
        h=Math.floor(Math.random()*height);
        w=Math.floor(Math.random()*width);
        if(minesgrid[h][w]===0 && this.id!=(h+","+w)){
            minesgrid[h][w]=1;
            count++;
        }
        if(count===mines) tempBool=false;
    }
    isStarted=true;
    countMines();
    //minesoppenedgrid[(tmpid.slice(0,tmpid.indexOf(","))*1)][(tmpid.slice(tmpid.indexOf(",")+1,tmpid.length)*1)]=1;
    //for(var a=0;a<height;a++){
    //    for(var b=0;b<width;b++)
            //document.getElementById(a+","+b).innerText=minescountgrid[a][b];
    //}
    }
   openBox((tmpid.slice(0,tmpid.indexOf(","))*1),(tmpid.slice(tmpid.indexOf(",")+1,tmpid.length)*1));
}
function openBox(h1,w1){
    //alert(minesgrid[h][w]);
    //alert(h+","+w);
    var isempty=true;
    if(minesgrid[h1][w1]===1){
        document.getElementById(h1+","+w1).innerText="💥";
        document.getElementById(h1+","+w1).classList.remove("btnbox");
        document.getElementById(h1+","+w1).style.setProperty("background-image","red");
        document.getElementById(h1+","+w1).style.setProperty("color","white");
        document.getElementById(h1+","+w1).style.setProperty("height","20px");
        document.getElementById(h1+","+w1).style.setProperty("width","20px");
        document.getElementById(h1+","+w1).style.setProperty("margin","0px");
        document.getElementById(h1+","+w1).style.setProperty("padding","0px");
        var tmpaud=new Audio("sounds/wrong.mp3");
        tmpaud.play();
        for(var a=0;a<height;a++){
            for(var b=0;b<width;b++){
                if(minesgrid[a][b]===1){
                    document.getElementById(a+","+b).innerText="💥";
                    //document.getElementById(a+","+b).classList.remove("btnbox");
                    //document.getElementById(a+","+b).style.setProperty("background-color","red");
                    document.getElementById(a+","+b).style.setProperty("color","white");
                    document.getElementById(a+","+b).style.setProperty("height","20px");
                    document.getElementById(a+","+b).style.setProperty("width","20px");
                }
                document.getElementById(a+","+b).disabled=true;
            }
        }
        isStarted=false;
    }
    else{
      if(minescountgrid[h1][w1]>0){
        minesoppenedgrid[h1][w1]=2;
        setStyle(h1+","+w1);
        document.getElementById(h1+","+w1).innerText=minescountgrid[h1][w1];
        }
      else
      {
        minesoppenedgrid[h1][w1]=1;
        setStyle(h1+","+w1);
        var minesoppened=0;
        while(isempty){
            for(var h=0;h<height;h++){
                for(var w=0;w<width;w++){
                    if(minesoppenedgrid[h][w]===1){
                        if(h===0){
                            if(w===0){
                                if(minescountgrid[h+1][w]===0 && minesoppenedgrid[h+1][w]!=1){setStyle((h+1)+","+w);minesoppenedgrid[h+1][w]=1; minesoppened++;}
                                if(minescountgrid[h+1][w+1]===0 && minesoppenedgrid[h+1][w+1]!=1){setStyle((h+1)+","+(w+1));minesoppenedgrid[h+1][w+1]=1; minesoppened++;}
                                if(minescountgrid[h][w+1]===0 && minesoppenedgrid[h][w+1]!=1){setStyle((h)+","+(w+1));minesoppenedgrid[h][w+1]=1; minesoppened++;}
                            }else if(w===(width-1)){
                                if(minescountgrid[h+1][w]===0 && minesoppenedgrid[h+1][w]!=1){setStyle((h+1)+","+w);minesoppenedgrid[h+1][w]=1; minesoppened++;}
                                if(minescountgrid[h+1][w-1]===0 && minesoppenedgrid[h+1][w-1]!=1){setStyle((h+1)+","+(w-1));minesoppenedgrid[h+1][w-1]=1; minesoppened++;}
                                if(minescountgrid[h][w-1]===0 && minesoppenedgrid[h][w-1]!=1){setStyle((h)+","+(w-1));minesoppenedgrid[h][w-1]=1; minesoppened++;}
                            }
                            else{
                                if(minescountgrid[h][w-1]===0 && minesoppenedgrid[h][w-1]!=1){setStyle((h)+","+(w-1));minesoppenedgrid[h][w-1]=1; minesoppened++;}
                                if(minescountgrid[h][w+1]===0 && minesoppenedgrid[h][w+1]!=1){setStyle((h)+","+(w+1));minesoppenedgrid[h][w+1]=1; minesoppened++;}
                                if(minescountgrid[h+1][w-1]===0 && minesoppenedgrid[h+1][w-1]!=1){setStyle((h+1)+","+(w-1));minesoppenedgrid[h+1][w-1]=1; minesoppened++;}
                                if(minescountgrid[h+1][w]===0 && minesoppenedgrid[h+1][w]!=1){setStyle((h+1)+","+w);minesoppenedgrid[h+1][w]=1; minesoppened++;}
                                if(minescountgrid[h+1][w+1]===0 && minesoppenedgrid[h+1][w+1]!=1){setStyle((h+1)+","+(w+1));minesoppenedgrid[h+1][w+1]=1; minesoppened++;}
                            }
                        }else if(h===(height-1)){
                            if(w===0){
                               if(minescountgrid[h-1][w]===0 && minesoppenedgrid[h-1][w]!=1){setStyle((h-1)+","+w);minesoppenedgrid[h-1][w]=1; minesoppened++;}
                               if(minescountgrid[h-1][w+1]===0 && minesoppenedgrid[h-1][w+1]!=1){setStyle((h-1)+","+(w+1));minesoppenedgrid[h-1][w+1]=1; minesoppened++;}
                               if(minescountgrid[h][w+1]===0 && minesoppenedgrid[h][w+1]!=1){setStyle((h)+","+(w+1));minesoppenedgrid[h][w+1]=1; minesoppened++;}
                            }else if(w===(width-1)){
                                if(minescountgrid[h-1][w]===0 && minesoppenedgrid[h-1][w]!=1){setStyle((h-1)+","+w);minesoppenedgrid[h-1][w]=1; minesoppened++;}
                                if(minescountgrid[h-1][w-1]===0 && minesoppenedgrid[h-1][w-1]!=1){setStyle((h-1)+","+(w-1));minesoppenedgrid[h-1][w-1]=1; minesoppened++;}
                                if(minescountgrid[h][w-1]===0 && minesoppenedgrid[h][w-1]!=1){setStyle((h)+","+(w-1));minesoppenedgrid[h][w-1]=1; minesoppened++;}
                            }
                            else{
                                if(minescountgrid[h][w-1]===0 && minesoppenedgrid[h][w-1]!=1){setStyle((h)+","+(w-1));minesoppenedgrid[h][w-1]=1; minesoppened++;}
                                if(minescountgrid[h][w+1]===0 && minesoppenedgrid[h][w+1]!=1){setStyle((h)+","+(w+1));minesoppenedgrid[h][w+1]=1; minesoppened++;}
                                if(minescountgrid[h-1][w-1]===0 && minesoppenedgrid[h-1][w-1]!=1){setStyle((h-1)+","+(w-1));minesoppenedgrid[h-1][w-1]=1; minesoppened++;}
                                if(minescountgrid[h-1][w]===0 && minesoppenedgrid[h-1][w]!=1){setStyle((h-1)+","+w);minesoppenedgrid[h-1][w]=1; minesoppened++;}
                                if(minescountgrid[h-1][w+1]===0 && minesoppenedgrid[h-1][w+1]!=1){setStyle((h-1)+","+(w+1));minesoppenedgrid[h-1][w+1]=1; minesoppened++;}
                            }
                        }else if(w===0){
                                if(minescountgrid[h-1][w]===0 && minesoppenedgrid[h-1][w]!=1){setStyle((h-1)+","+w);minesoppenedgrid[h-1][w]=1; minesoppened++;}
                                if(minescountgrid[h+1][w]===0 && minesoppenedgrid[h+1][w]!=1){setStyle((h+1)+","+w);minesoppenedgrid[h+1][w]=1; minesoppened++;}
                                if(minescountgrid[h-1][w+1]===0 && minesoppenedgrid[h-1][w+1]!=1){setStyle((h-1)+","+(w+1));minesoppenedgrid[h-1][w+1]=1; minesoppened++;}
                                if(minescountgrid[h][w+1]===0 && minesoppenedgrid[h][w+1]!=1){setStyle((h)+","+(w+1));minesoppenedgrid[h][w+1]=1; minesoppened++;}
                                if(minescountgrid[h+1][w+1]===0 && minesoppenedgrid[h+1][w+1]!=1){setStyle((h+1)+","+(w+1));minesoppenedgrid[h+1][w+1]=1; minesoppened++;}
                            }
                        else if(w===(width-1)){
                            if(minescountgrid[h-1][w]===0 && minesoppenedgrid[h-1][w]!=1){setStyle((h-1)+","+w);minesoppenedgrid[h-1][w]=1; minesoppened++;}
                            if(minescountgrid[h+1][w]===0 && minesoppenedgrid[h+1][w]!=1){setStyle((h+1)+","+w);minesoppenedgrid[h+1][w]=1; minesoppened++;}
                            if(minescountgrid[h-1][w-1]===0 && minesoppenedgrid[h-1][w-1]!=1){setStyle((h-1)+","+(w-1));minesoppenedgrid[h-1][w-1]=1; minesoppened++;}
                            if(minescountgrid[h][w-1]===0 && minesoppenedgrid[h][w-1]!=1){setStyle((h)+","+(w-1));minesoppenedgrid[h][w-1]=1; minesoppened++;}
                            if(minescountgrid[h+1][w-1]===0 && minesoppenedgrid[h+1][w-1]!=1){setStyle((h+1)+","+(w-1));minesoppenedgrid[h+1][w-1]=1; minesoppened++;}
                        }else{
                            if(minescountgrid[h-1][w]===0 && minesoppenedgrid[h-1][w]!=1){setStyle((h-1)+","+w);minesoppenedgrid[h-1][w]=1; minesoppened++;}
                            if(minescountgrid[h-1][w+1]===0 && minesoppenedgrid[h-1][w+1]!=1){setStyle((h-1)+","+(w+1));minesoppenedgrid[h-1][w+1]=1; minesoppened++;}
                            if(minescountgrid[h-1][w-1]===0 && minesoppenedgrid[h-1][w-1]!=1){setStyle((h-1)+","+(w-1));minesoppenedgrid[h-1][w-1]=1; minesoppened++;}
                            if(minescountgrid[h+1][w]===0 && minesoppenedgrid[h+1][w]!=1){setStyle((h+1)+","+w);minesoppenedgrid[h+1][w]=1; minesoppened++;}
                            if(minescountgrid[h+1][w+1]===0 && minesoppenedgrid[h+1][w+1]!=1){setStyle((h+1)+","+(w+1));minesoppenedgrid[h+1][w+1]=1; minesoppened++;}
                            if(minescountgrid[h+1][w-1]===0 && minesoppenedgrid[h+1][w-1]!=1){setStyle((h+1)+","+(w-1));minesoppenedgrid[h+1][w-1]=1; minesoppened++;}
                            if(minescountgrid[h][w+1]===0 && minesoppenedgrid[h][w+1]!=1){setStyle((h)+","+(w+1));minesoppenedgrid[h][w+1]=1; minesoppened++;}
                            if(minescountgrid[h][w-1]===0 && minesoppenedgrid[h][w-1]!=1){setStyle((h)+","+(w-1));minesoppenedgrid[h][w-1]=1; minesoppened++;}
                        }
                    }
                        if(minesoppened>0){
                        break;
                        }
                }
                        if(minesoppened>0){
                        break;
                        }
            }
            if(minesoppened>0){
                minesoppened=0;
            }else{
                isempty=false;
            }
        }
        for(var h=0;h<height;h++){
            for(var w=0;w<width;w++){
                if(minesoppenedgrid[h][w]===1){
                    if(h===0){
                        if(w===0){
                            if(minescountgrid[h+1][w]!=9 && minesoppenedgrid[h+1][w] ===0){minesoppenedgrid[h+1][w] =2;setStyle((h+1)+","+w);document.getElementById((h+1)+","+w).innerText=minescountgrid[h+1][w]; }
                            if(minescountgrid[h+1][w+1]!=9 && minesoppenedgrid[h+1][w+1] ===0){minesoppenedgrid[h+1][w+1] =2;setStyle((h+1)+","+(w+1));document.getElementById((h+1)+","+(w+1)).innerText=minescountgrid[h+1][w+1]; }
                            if(minescountgrid[h][w+1]!=9 && minesoppenedgrid[h][w+1] ===0){minesoppenedgrid[h][w+1] =2;setStyle((h)+","+(w+1));document.getElementById((h)+","+(w+1)).innerText=minescountgrid[h][w+1]; }
                        }else if(w===(width-1)){
                            if(minescountgrid[h+1][w]!=9 && minesoppenedgrid[h+1][w] ===0){minesoppenedgrid[h+1][w] =2;setStyle((h+1)+","+w);document.getElementById((h+1)+","+w).innerText=minescountgrid[h+1][w]; }
                            if(minescountgrid[h+1][w-1]!=9 && minesoppenedgrid[h+1][w-1] ===0){minesoppenedgrid[h+1][w-1] =2;setStyle((h+1)+","+(w-1));document.getElementById((h+1)+","+(w-1)).innerText=minescountgrid[h+1][w-1]; }
                            if(minescountgrid[h][w-1]!=9 && minesoppenedgrid[h][w-1] ===0){minesoppenedgrid[h][w-1] =2;setStyle((h)+","+(w-1));document.getElementById((h)+","+(w-1)).innerText=minescountgrid[h][w-1]; }
                        }
                        else{
                            if(minescountgrid[h][w-1]!=9 && minesoppenedgrid[h][w-1] ===0){minesoppenedgrid[h][w-1] =2;setStyle((h)+","+(w-1));document.getElementById((h)+","+(w-1)).innerText=minescountgrid[h][w-1]; }
                            if(minescountgrid[h][w+1]!=9 && minesoppenedgrid[h][w+1] ===0){minesoppenedgrid[h][w+1] =2;setStyle((h)+","+(w+1));document.getElementById((h)+","+(w+1)).innerText=minescountgrid[h][w+1]; }
                            if(minescountgrid[h+1][w-1]!=9 && minesoppenedgrid[h+1][w-1] ===0){minesoppenedgrid[h+1][w-1] =2;setStyle((h+1)+","+(w-1));document.getElementById((h+1)+","+(w-1)).innerText=minescountgrid[h+1][w-1]; }
                            if(minescountgrid[h+1][w]!=9 && minesoppenedgrid[h+1][w] ===0){minesoppenedgrid[h+1][w] =2;setStyle((h+1)+","+w);document.getElementById((h+1)+","+w).innerText=minescountgrid[h+1][w]; }
                            if(minescountgrid[h+1][w+1]!=9 && minesoppenedgrid[h+1][w+1] ===0){minesoppenedgrid[h+1][w+1] =2;setStyle((h+1)+","+(w+1));document.getElementById((h+1)+","+(w+1)).innerText=minescountgrid[h+1][w+1]; }
                        }
                    }else if(h===(height-1)){
                        if(w===0){
                           if(minescountgrid[h-1][w]!=9 && minesoppenedgrid[h-1][w] ===0){minesoppenedgrid[h-1][w] =2;setStyle((h-1)+","+w);document.getElementById((h-1)+","+w).innerText=minescountgrid[h-1][w]; }
                           if(minescountgrid[h-1][w+1]!=9 && minesoppenedgrid[h-1][w+1] ===0){minesoppenedgrid[h-1][w+1] =2;setStyle((h-1)+","+(w+1));document.getElementById((h-1)+","+(w+1)).innerText=minescountgrid[h-1][w+1]; }
                           if(minescountgrid[h][w+1]===9 && minesoppenedgrid[h][w+1] ===0){minesoppenedgrid[h][w+1] =2;setStyle((h)+","+(w+1));document.getElementById((h)+","+(w+1)).innerText=minescountgrid[h][w+1]; }
                        }else if(w===(width-1)){
                            if(minescountgrid[h-1][w]!=9 && minesoppenedgrid[h-1][w] ===0){minesoppenedgrid[h-1][w] =2;setStyle((h-1)+","+w);document.getElementById((h-1)+","+w).innerText=minescountgrid[h-1][w]; }
                            if(minescountgrid[h-1][w-1]!=9 && minesoppenedgrid[h-1][w-1] ===0){minesoppenedgrid[h-1][w-1] =2;setStyle((h-1)+","+(w-1));document.getElementById((h-1)+","+(w-1)).innerText=minescountgrid[h-1][w-1]; }
                            if(minescountgrid[h][w-1]!=9 && minesoppenedgrid[h][w-1] ===0){minesoppenedgrid[h][w-1] =2;setStyle((h)+","+(w-1));document.getElementById((h)+","+(w-1)).innerText=minescountgrid[h][w-1]; }
                        }
                        else{
                            if(minescountgrid[h][w-1]!=9 && minesoppenedgrid[h][w-1] ===0){minesoppenedgrid[h][w-1] =2;setStyle((h)+","+(w-1));document.getElementById((h)+","+(w-1)).innerText=minescountgrid[h][w-1]; }
                            if(minescountgrid[h][w+1]!=9 && minesoppenedgrid[h][w+1] ===0){minesoppenedgrid[h][w+1] =2;setStyle((h)+","+(w+1));document.getElementById((h)+","+(w+1)).innerText=minescountgrid[h][w+1]; }
                            if(minescountgrid[h-1][w-1]!=9 && minesoppenedgrid[h-1][w-1] ===0){minesoppenedgrid[h-1][w-1] =2;setStyle((h-1)+","+(w-1));document.getElementById((h-1)+","+(w-1)).innerText=minescountgrid[h-1][w-1]; }
                            if(minescountgrid[h-1][w]!=9 && minesoppenedgrid[h-1][w] ===0){minesoppenedgrid[h-1][w] =2;setStyle((h-1)+","+w);document.getElementById((h-1)+","+w).innerText=minescountgrid[h-1][w]; }
                            if(minescountgrid[h-1][w+1]!=9 && minesoppenedgrid[h-1][w+1] ===0){minesoppenedgrid[h-1][w+1] =2;setStyle((h-1)+","+(w+1));document.getElementById((h-1)+","+(w+1)).innerText=minescountgrid[h-1][w+1]; }
                        }
                    }else if(w===0){
                            if(minescountgrid[h-1][w]!=9 && minesoppenedgrid[h-1][w] ===0){minesoppenedgrid[h-1][w] =2;setStyle((h-1)+","+w);document.getElementById((h-1)+","+w).innerText=minescountgrid[h-1][w]; }
                            if(minescountgrid[h+1][w]!=9 && minesoppenedgrid[h+1][w] ===0){minesoppenedgrid[h+1][w] =2;setStyle((h+1)+","+w);document.getElementById((h+1)+","+w).innerText=minescountgrid[h+1][w]; }
                            if(minescountgrid[h-1][w+1]!=9 && minesoppenedgrid[h-1][w+1] ===0){minesoppenedgrid[h-1][w+1] =2;setStyle((h-1)+","+(w+1));document.getElementById((h-1)+","+(w+1)).innerText=minescountgrid[h-1][w+1]; }
                            if(minescountgrid[h][w+1]!=9 && minesoppenedgrid[h][w+1] ===0){minesoppenedgrid[h][w+1] =2;setStyle((h)+","+(w+1));document.getElementById((h)+","+(w+1)).innerText=minescountgrid[h][w+1]; }
                            if(minescountgrid[h+1][w+1]!=9 && minesoppenedgrid[h+1][w+1] ===0){minesoppenedgrid[h+1][w+1] =2;setStyle((h+1)+","+(w+1));document.getElementById((h+1)+","+(w+1)).innerText=minescountgrid[h+1][w+1]; }
                        }
                    else if(w===(width-1)){
                        if(minescountgrid[h-1][w]!=9 && minesoppenedgrid[h-1][w] ===0){minesoppenedgrid[h-1][w] =2;setStyle((h-1)+","+w);document.getElementById((h-1)+","+w).innerText=minescountgrid[h-1][w]; }
                        if(minescountgrid[h+1][w]!=9 && minesoppenedgrid[h+1][w] ===0){minesoppenedgrid[h+1][w] =2;setStyle((h+1)+","+w);document.getElementById((h+1)+","+w).innerText=minescountgrid[h+1][w]; }
                        if(minescountgrid[h-1][w-1]!=9 && minesoppenedgrid[h-1][w-1] ===0){minesoppenedgrid[h-1][w-1] =2;setStyle((h-1)+","+(w-1));document.getElementById((h-1)+","+(w-1)).innerText=minescountgrid[h-1][w-1]; }
                        if(minescountgrid[h][w-1]!=9 && minesoppenedgrid[h][w-1] ===0){minesoppenedgrid[h][w-1] =2;setStyle((h)+","+(w-1));document.getElementById((h)+","+(w-1)).innerText=minescountgrid[h][w-1]; }
                        if(minescountgrid[h+1][w-1]!=9 && minesoppenedgrid[h+1][w-1] ===0){minesoppenedgrid[h+1][w-1] =2;setStyle((h+1)+","+(w-1));document.getElementById((h+1)+","+(w-1)).innerText=minescountgrid[h+1][w-1]; }
                    }else{
                        if(minescountgrid[h-1][w]!=9 && minesoppenedgrid[h-1][w] ===0){minesoppenedgrid[h-1][w] =2;setStyle((h-1)+","+w);document.getElementById((h-1)+","+w).innerText=minescountgrid[h-1][w]; }
                        if(minescountgrid[h-1][w+1]!=9 && minesoppenedgrid[h-1][w+1] ===0){minesoppenedgrid[h-1][w+1] =2;setStyle((h-1)+","+(w+1));document.getElementById((h-1)+","+(w+1)).innerText=minescountgrid[h-1][w+1]; }
                        if(minescountgrid[h-1][w-1]!=9 && minesoppenedgrid[h-1][w-1] ===0){minesoppenedgrid[h-1][w-1] =2;setStyle((h-1)+","+(w-1));document.getElementById((h-1)+","+(w-1)).innerText=minescountgrid[h-1][w-1]; }
                        if(minescountgrid[h+1][w]!=9 && minesoppenedgrid[h+1][w] ===0){minesoppenedgrid[h+1][w] =2;setStyle((h+1)+","+w);document.getElementById((h+1)+","+w).innerText=minescountgrid[h+1][w]; }
                        if(minescountgrid[h+1][w+1]!=9 && minesoppenedgrid[h+1][w+1] ===0){minesoppenedgrid[h+1][w+1] =2;setStyle((h+1)+","+(w+1));document.getElementById((h+1)+","+(w+1)).innerText=minescountgrid[h+1][w+1]; }
                        if(minescountgrid[h+1][w-1]!=9 && minesoppenedgrid[h+1][w-1] ===0){minesoppenedgrid[h+1][w-1] =2;setStyle((h+1)+","+(w-1));document.getElementById((h+1)+","+(w-1)).innerText=minescountgrid[h+1][w-1]; }
                        if(minescountgrid[h][w+1]!=9 && minesoppenedgrid[h][w+1] ===0){minesoppenedgrid[h][w+1] =2;setStyle((h)+","+(w+1));document.getElementById((h)+","+(w+1)).innerText=minescountgrid[h][w+1]; }
                        if(minescountgrid[h][w-1]!=9 && minesoppenedgrid[h][w-1] ===0){minesoppenedgrid[h][w-1] =2;setStyle((h)+","+(w-1));document.getElementById((h)+","+(w-1)).innerText=minescountgrid[h][w-1]; }
                    }
                }
            }
        }
      }
    }
    minesoppened=0;
    for(var h=0;h<height;h++){
        for(var w=0;w<width;w++){
            if(minesoppenedgrid[h][w]===0) minesoppened+=1;
        }
    }
    if(minesoppened===mines){
        for(var h=0;h<height;h++){
            for(var w=0;w<width;w++){
                if(minesgrid[h][w]===1) document.getElementById(h+","+w).innerText="🚩";
            }
        }
        isStarted=false;
    }
}

function setStyle(tmpid){
    document.getElementById(tmpid).classList.remove("btnbox");
    document.getElementById(tmpid).style.setProperty("background-color","#283149");
    document.getElementById(tmpid).style.setProperty("color","white");
    document.getElementById(tmpid).style.setProperty("height","20px");
    document.getElementById(tmpid).style.setProperty("align-text","center");
    document.getElementById(tmpid).style.setProperty("width","20px");
    document.getElementById(tmpid).style.setProperty("margin","0px");
    document.getElementById(tmpid).style.setProperty("padding","0px");
    document.getElementById(tmpid).innerText="";
    document.getElementById(tmpid).disabled=true;
}

function countMines(){
    for(var h=0;h<height;h++){
        for(var w=0;w<width;w++){
            if(minesgrid[h][w]!=1){
                if(h===0){
                    if(w===0){
                        minescountgrid[h][w]=minesgrid[h+1][w]+minesgrid[h+1][w+1]+minesgrid[h][w+1];
                    }else if(w===(width-1)){
                        minescountgrid[h][w]=minesgrid[h+1][w]+minesgrid[h+1][w-1]+minesgrid[h][w-1];
                    }
                    else{
                        minescountgrid[h][w]=minesgrid[h][w-1]+minesgrid[h][w+1]+minesgrid[h+1][w-1]+minesgrid[h+1][w]+minesgrid[h+1][w+1];
                    }
                }else if(h===(height-1)){
                    if(w===0){
                        minescountgrid[h][w]=minesgrid[h-1][w]+minesgrid[h-1][w+1]+minesgrid[h][w+1];
                    }else if(w===(width-1)){
                        minescountgrid[h][w]=minesgrid[h-1][w]+minesgrid[h-1][w-1]+minesgrid[h][w-1];
                    }
                    else{
                        minescountgrid[h][w]=minesgrid[h][w-1]+minesgrid[h][w+1]+minesgrid[h-1][w-1]+minesgrid[h-1][w]+minesgrid[h-1][w+1];
                    }
                }else if(w===0){
                        minescountgrid[h][w]=minesgrid[h-1][w]+minesgrid[h+1][w]+minesgrid[h-1][w+1]+minesgrid[h][w+1]+minesgrid[h+1][w+1];
                    }
                else if(w===(width-1)){
                    minescountgrid[h][w]=minesgrid[h-1][w]+minesgrid[h+1][w]+minesgrid[h-1][w-1]+minesgrid[h][w-1]+minesgrid[h+1][w-1];
                }else{
                    minescountgrid[h][w]=minesgrid[h-1][w]+minesgrid[h-1][w+1]+minesgrid[h-1][w-1]+minesgrid[h+1][w]+minesgrid[h+1][w+1]+minesgrid[h+1][w-1]+minesgrid[h][w+1]+minesgrid[h][w-1];
                }
            }
            else minescountgrid[h][w]=9;
        }
    }
}
function reset(){
    if(!isStarted){
        createGrid(height,width);
    }
}