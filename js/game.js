$(document).ready(function(){
    //focus in erase
    $('.userTimeInput').on('focus',function(event){
        $(this).val('');
    });
    //nothing in there, put a zero.
    $('.userTimeInput').on('focusout',function(event){
        if($(this).val()< 1){
            $(this).val(0);
        }
    });

    $('#submitBTN').on('click', function(event){
        event.preventDefault();
        $('#outputLink').html('');
        $('#courtesyLink').html('');
        var url = $('#userUrl').val().trim();
         //http://www.youtube.com/watch?v=SNfYz6Yw0W8&feature=g-all-esi would work also
         if(url.match('v=')){
        var a = url.split("v=")[1];

        //define start Time input variables
        var grabUserStartHours = $('#userHoursInputStart').val().trim()
        var grabUserStartMinutes = $('#userMinutesInputStart').val().trim();
        var grabUserStartSeconds = $('#userSecondsInputStart').val().trim();
        //end start Time input variables

        //define Stop Time input variables
        var grabUserEndHours = $('#userHoursInputEnd').val().trim()
        var grabUserEndMinutes = $('#userMinutesInputEnd').val().trim();
        var grabUserEndSeconds = $('#userSecondsInputEnd').val().trim();
        //end Stop Time input variables

        var userStartTime = (parseInt(grabUserStartHours) * 3600) + (parseInt(grabUserStartMinutes) * 60) + parseInt(grabUserStartSeconds);
        var userEndTime = (parseInt(grabUserEndHours) * 3600) + (parseInt(grabUserEndMinutes) * 60) + parseInt(grabUserEndSeconds);


        a = a != undefined ? a : url.split("youtu.be/")[1];
        b = a.split("&")[0];

        finalLink = 'https://www.youtube.com/embed/' + a + '?start=' + userStartTime +'&end='+userEndTime+'&version=3';
        $('#outputLink').append(finalLink+'<br/>');
        $('#courtesyLink').append("<a href = " + finalLink + '>' + "Click Here</a>");

        $('#userHoursInputStart').val('0');
        $('#userMinutesInputStart').val('0');
        $('#userSecondsInputStart').val('0');

        $('#userHoursInputEnd').val('0');
        $('#userMinutesInputEnd').val('0');
        $('#userSecondsInputEnd').val('0');
        $('#userEndTimeField').val('');

        $('#addToDataBaseBox').remove();
        //add addToDataBasBox
        $('<div id = "addToDataBaseBox"></div>').insertAfter('#copyBTN');
        $('#addToDataBaseBox').append('<p> Add this to the OOC database?</p>')
        $('#addToDataBaseBox').append('<div id ="timingInfo"><p>your start time was: </p>'+'<p id = "videoStartTime">' + userStartTime + '</p>');
        $('#addToDataBaseBox').append('<p>your end time was: </p>'+'<p id = "videoEndTime">' + userEndTime + '</p></div>');
        $('#addToDataBaseBox').append('<div id = "addDataPrompt"><p>Please enter a title:</p>'+'<input Type ="text" id = "userTitle" class =".userTimeInput" value = "" size = "4">');
        $('#addToDataBaseBox').append('<a href = "#submitBTN"><button id = "submitToDbBTN">Add to Database</button></a></div>');
        $('#addToDataBaseBox').append('<hr>');

        //clear userURL field for next use
        $('#userUrl').val('');
    }else{
        alert('not a valid url');
    }

});

});