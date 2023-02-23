boxes=Array.from(document.querySelectorAll('.box'));

const O_TEXT="O";
const X_TEXT="X";

var curr_player=X_TEXT;
let spaces=new Array(9).fill(null); 
var mp=new Map([
    [0,3],
    [1,2],
    [2,3],
    [3,2],
    [4,4],
    [5,2],
    [6,3],
    [7,2],
    [8,3]


]);
let one,two,three;
function checkWinning(player)
{
    var ans=false;
   //row wise
     //1st row
     if(spaces[boxes[0].id]==player&&spaces[boxes[1].id]==player&&spaces[boxes[2].id]==player){
     ans=true;
     one=0,two=1,three=2;
     }
     //2nd row
    else if(spaces[boxes[3].id]==player&&spaces[boxes[4].id]==player&&spaces[boxes[5].id]==player)
    { ans=true;
        one=3,two=4,three=5;}
     //3rd row
     else if(spaces[boxes[6].id]==player&&spaces[boxes[7].id]==player&&spaces[boxes[8].id]==player)
     {ans=true;
        one=6,two=7,three=8;
    }
   //column wise
      //1st column
    else   if(spaces[boxes[0].id]==player&&spaces[boxes[3].id]==player&&spaces[boxes[6].id]==player)
      {ans=true;
        one=0,two=3,three=6;
    }
      //2nd column
    else  if(spaces[boxes[1].id]==player&&spaces[boxes[4].id]==player&&spaces[boxes[7].id]==player)
     { ans=true;
        one=1,two=4,three=7;
    }
      //3rd column
    else  if(spaces[boxes[2].id]==player&&spaces[boxes[5].id]==player&&spaces[boxes[8].id]==player)
     { ans=true;
        one=2,two=5,three=8;
    }
  //daigonal wise
    //1st daigonal
   else if(spaces[boxes[0].id]==player&&spaces[boxes[4].id]==player&&spaces[boxes[8].id]==player)
    {ans=true;
        one=0,two=4,three=8;}
    //2nd daigonal
   else if(spaces[boxes[2].id]==player&&spaces[boxes[4].id]==player&&spaces[boxes[6].id]==player)
    {ans=true;
        one=2,two=4,three=6;}

    return ans;

}
function bestMovePossible(position)
{
    return mp.get(position);

}
var Win=false;
var cnt=0;
function bestMove()
{
    let a=true,b=true;
    if(a&&b){
        cnt=0;
    for(let i=0;i<boxes.length;i++){
        if(spaces[boxes[i].id]==null)
        {
            spaces[boxes[i].id]=O_TEXT;
            if(checkWinning(O_TEXT))
            {
                console.log("won");
               
            
                boxes[one].style.backgroundColor="grey";
                boxes[two].style.backgroundColor="grey";
                boxes[three].style.backgroundColor="grey";

                boxes[one].style.textDecoration="line-through";
                boxes[two].style.textDecoration="line-through";
                boxes[three].style.textDecoration="line-through";
                Win=true;
                a=false;
                boxes[i].innerHTML=O_TEXT;
                spaces[boxes[i].id]=O_TEXT;
                if(Win)
                {
                    document.getElementById('message').innerHTML='Winner Winner Chicken dinner';
                    return;}
                break;
            }
            spaces[boxes[i].id]=null;
          
        }
        else
        cnt++;

    }

    if(cnt==9)
    document.getElementById('message').innerHTML='Tie';
}
if(a&&b){
    for(let i=0;i<boxes.length;i++){
        if(spaces[boxes[i].id]==null)
        {
                       
            spaces[boxes[i].id]=X_TEXT;
           if(checkWinning(X_TEXT))
           {
            console.log("opponant is winning");
            boxes[i].innerHTML=O_TEXT;
            spaces[boxes[i].id]=O_TEXT;
            b=false;
            break;
           }
           spaces[boxes[i].id]=null;
        }
    }
}
 if(a&&b)
 {
    var position=-1,score=0;
    for(let i=0;i<boxes.length;i++){
          
        if(spaces[boxes[i].id]==null)
        {
          // console.log(bestMovePossible(i));
              if(bestMovePossible(i)>score)
              {
                position=i;
                score=bestMovePossible(i);
              }        
        }
        console.log(position);
    }
    
    if(position!==-1){
    boxes[position].innerHTML=O_TEXT;
    spaces[boxes[position].id]=O_TEXT;
    }
 }

}
const start=()=>
{
 boxes.forEach(box=>box.addEventListener('click',boxClicked))
}
function boxClicked(e)
{
   
    let id=e.target.id;
    console.log(id);
    if(!spaces[id]){
        console.log('hello');
    e.target.innerHTML=curr_player;
    spaces[id]=curr_player;
     bestMove();
    
  //  curr_player=curr_player==X_TEXT?O_TEXT:X_TEXT;
     
    }

}
function Restart()
{
    // spaces.fill(null);
    for(let i=0;i<boxes.length;i++)
    {
         boxes[i].innerHTML='';               
        spaces[boxes[i].id]=null; 
    }
    Win=false;
    a=true;
    b=true;
    boxes[one].style.backgroundColor="";
    boxes[two].style.backgroundColor="";
    boxes[three].style.backgroundColor="";

    boxes[one].style.textDecoration="none";
    boxes[two].style.textDecoration="none";
    boxes[three].style.textDecoration="none";

    document.getElementById('message').innerHTML='';
    cnt=0;
    
   
    
}
start()