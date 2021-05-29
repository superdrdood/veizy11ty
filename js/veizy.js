// The fun javascript that is used all across the site!


// Nav menu dropdown
let navShow = false;
document.addEventListener('click', function(event) {
    if (event.target.id == "showNav") {
        if (!navShow) {
            document.querySelector("ul.headLinks").classList.add("showNav");
            event.target.innerHTML = "&#9650;";
            navShow = true;
        } else {
            document.querySelector("ul.headLinks").classList.remove("showNav");
            event.target.innerHTML = "&#9660;";
            navShow = false;
        }
    }
});