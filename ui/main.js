console.log('Loaded!');
alert('i have added a js file also in to my html');
var marginleft=0;
var img=document.getElementById("image");

function moveRight()
{marginleft=marginleft+10;
    img.style.marginleft=marginleft+'px';
}
    img.onclick= function()
{
    var interval=setInterval(moveRight,50);
};