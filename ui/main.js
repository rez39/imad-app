console.log('Loaded!');
alert('i have added a js file also in to my html');

var img=document.getElementById("image");
var marginleft=0;
function moveRight()
{marginleft=marginleft+10;
    img.style.marginLeft=marginleft+'px';
}
    img.onclick= function()
{
    var interval=setInterval(moveRight,50);
};