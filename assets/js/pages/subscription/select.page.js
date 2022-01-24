var selectedDiv = "";

var x = document.getElementsByClassName('sub-select')
for (var i = 0; i < x.length; i++) {
    x[i].addEventListener("click", function () {
        var selectedEl = document.querySelector(".selected");
        if (selectedEl) {
            selectedEl.classList.remove("selected");
        }
        this.classList.add("selected");

    }, false);;

}

function selectService() {
    console.log("function: selectService()")

    var selectedEl = document.querySelector(".selected");
    let id = $(".selected").prop("id");
    if (selectedEl) {
        window.location.href = '/getservice/' + id;
    } else {
        alert('please choose an option')
    }
}