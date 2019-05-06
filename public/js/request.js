$(".alert").hide();
var urlParams = new URLSearchParams(window.location.search);

var errorValue = urlParams.get('error');
var alertValue = '';
console.log(errorValue);

switch(errorValue) {
    case 'name1': alertValue = 'Student name must contain only English characters'; break;
    case 'id1': alertValue = 'Student ID must contain only number'; break;
    case 'id2': alertValue = 'Student ID must consisting of 10 digits'; break;
}
if(alertValue !== '') {
    $(".alert").html(alertValue);
    $(".alert").show();
}