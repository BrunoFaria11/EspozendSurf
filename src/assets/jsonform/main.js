function doT_() {
    fetch('../assets/siteConfig2.json')
    .then(response => response.json())
    .then(jsonResponse => {
        const json = jsonResponse["schema"];
       
        $("form").jsonForm({
            schema: json,
            onSubmit: function (errors, values) {
              if (errors) {
                $("#res").html("<p>I beg your pardon?</p>");
              } else {
                debugger;
                download(values, 'json.json', 'text/plain');

                // $("#res").html({}
                //     debugger
                // );
              }
            },
          });
    })     
    function download(content, fileName, contentType) {
        var a = document.createElement("a");
        var file = new Blob([content], {type: contentType});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }
    
}
