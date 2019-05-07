$(".alert").hide();
var urlParams = new URLSearchParams(window.location.search);

var status = urlParams.get('status');
var alertValue = '';
console.log(status);

switch(status) {
    case 'key': alertValue = 'Public Key Invalid'; break;
    case 'id1': alertValue = 'Student ID must contain only number'; break;
    case 'id2': alertValue = 'Student ID must consisting of 10 digits'; break;
}
if(alertValue !== '') {
    $(".alert").html(alertValue);
    $(".alert").show();
    window.history.replaceState({}, document.title, "/instruction");
}

document.getElementById("exit").addEventListener("click", function() {
    Swal.fire({
        title: 'Are you sure?',
        text: "You want to logout now?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK'
    }).then((result) => {
        if (result.value) {
            window.location.href = '/logout';
        }
    })
})