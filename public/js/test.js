(function eventListenerInit() {
    document.getElementsByClassName('test')[0].addEventListener('click', function() {
        $.ajax({
            url: "../linkage/generate",
            type: "POST"
        })
        .done(function(response) {
            console.log("SUCCESS: ", response.code);
        })
        .fail(function(error) {
            console.log("FAILED: ", JSON.parse(error.responseText).msg);
        });
    });

    document.getElementsByClassName('test')[1].addEventListener('click', function() {
        $.ajax({
            url: "../linkage/confirm",
            type: "POST",
            data: {
                code: ""
            }
        })
        .done(function(response) {
            console.log("SUCCESS: ", response.msg);
        })
        .fail(function(error) {
            console.log("FAILED: ", JSON.parse(error.responseText).msg);
        });
    });
})();
