console.log('Loaded!');


var img=document.getElementById("image");
var marginleft=0;
function moveRight()
{marginleft=marginleft+1;
    img.style.marginLeft=marginleft+'px';
}
    img.onclick= function()
{
    var interval=setInterval(moveRight,50);
};