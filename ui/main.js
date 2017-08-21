console.log('Loaded!');
alert('i have added a js file also in to my html');
var marginleft=0;
var img=document.getElementById('image');

function moveRight()
{img.stylemarginleft=marginleft+10+'px';
}
    img.onclick= function()
{
    var interval=setInterval(moveRight,50);
};