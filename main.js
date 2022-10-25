function openMenu()
{
    var x = document.getElementsByTagName(nav);
    console.log(x);
    //  document.getElementById("nav");
    if (x.className === "nav") {
        x.className += " responsive";
    } else {
        x.className = "nav";
    }
}
