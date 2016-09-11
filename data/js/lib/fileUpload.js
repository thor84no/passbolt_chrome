
$(function() {
  function fileUpload(request, sender, sendResponse) {

    if (request.custom == "passbolt.file.upload") {
        var fileChooser = document.createElement('input');
        fileChooser.type = 'file';

        fileChooser.addEventListener('change', function () {
          console.log("file upload");
          var file = fileChooser.files[0];

          var reader = new FileReader();
          reader.onload = function(){
            var data = reader.result;
            console.log(data);
            sendResponse({data: data});
          };
          reader.readAsText(file);
          form.reset();
        });

        var form = document.createElement('form');
        form.appendChild(fileChooser);
        fileChooser.click();
    }
    return true;
  }
  chrome.runtime.onMessage.removeListener(fileUpload);
  chrome.runtime.onMessage.addListener(fileUpload);
});
