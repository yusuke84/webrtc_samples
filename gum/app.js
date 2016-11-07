$(document).ready(function () {

    $('#error').hide();

    $('#start-camera').click(function () {

        var _audio_flag = $('#audio_permit').prop('checked');
        var _param = {
            video: {},
            audio: _audio_flag
        };

        if (!!navigator.mozGetUserMedia) {
            // for FF
            if (isFinite($('#Width').val()))
                _param.video.width = {min: $('#Width').val(), max: $('#Width').val()};
            if (isFinite($('#Height').val()))
                _param.video.height = {min: $('#Height').val(), max: $('#Height').val()};
            var _status = 'Audio: ' + _audio_flag + ' , Width: ' + $('#Width').val() + '  , Height: ' + $('#Height').val() + ' , FrameRate: 無効';
        }else{
            // for Chrome
            if (isFinite($('#Width').val()))
                _param.video.width = {min: $('#Width').val(), max: $('#Width').val()};
            if (isFinite($('#Height').val()))
                _param.video.height = {min: $('#Height').val(), max: $('#Height').val()};
            if (isFinite($('#FrameRate').val()))
                _param.video.frameRate = {min: $('#FrameRate').val(), max: $('#FrameRate').val()};
            var _status = 'Audio: ' + _audio_flag + ' , Width: ' + $('#Width').val() + '  , Height: ' + $('#Height').val() + ' , FrameRate: ' + $('#FrameRate').val();
        }

        navigator.mediaDevices.getUserMedia(_param)
            .then(function (stream) { // success
                const videoDom = $('#my-video')[0];
                videoDom.srcObject = stream;
                $('#error').hide();
                $('#status_contetns').html(_status);
            }).catch(function (error) { // error
                $('#error').show();
                console.error('mediaDevice.getUserMedia() error:', error);
                $('#status_contetns').html(_status);
                $('#error_contents').html(error.name);
                return;
        });
    });

});