document.addEventListener('DOMContentLoaded', function () {
    var iframe = document.getElementById('gForm');
    var spinner = document.getElementById('spinner');

    iframe.onload = function () {
        spinner.style.setProperty('display', 'none', 'important'); // Hide the spinner
    };
});