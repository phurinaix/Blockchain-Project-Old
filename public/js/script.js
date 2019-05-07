setTimeout(function(){
    document.getElementById("loading-wrapper").style.display = "none";
    document.getElementsByClassName("container")[0].style.opacity = "1";
}, 500);

function loading() {
    document.getElementById("loading-wrapper").style.display = "block";
    document.getElementsByClassName("container")[0].style.opacity = "0";
}