
function send(message, filePath)
{
    $.ajax({
        url: filePath,
        type: "POST",
        data: message,
        success: function(data)
        {
            document.getElementById('outputDiv').innerHTML = data;
        }
    })
}