$(document).ready(function () {

    //APIキー
    var APIKEY = 'eab4a7c9-3cea-4427-ad6d-d802cb091c40';

    //Callオブジェクト
    var existingCall;

    //localStream
    var localStream;

    // PeerJSオブジェクトを生成
    var peer = new Peer({ key: APIKEY, debug: 3 });

    // PeerIDを生成
    peer.on('open', function () {
        $('#my-id').text(peer.id);
    });

    // 相手からのコールを受信したら自身のメディアストリームをセットして返答
    peer.on('call', function (call) {
        call.answer(localStream);
        step3(call);
        console.log('event:recall');
    });

    // エラーハンドラー
    peer.on('error', function (err) {
        alert(err.message);
        step2();
    });

    // イベントハンドラー
    $(function () {
        // 相手に接続
        $('#connect').click(function () {
            var call = peer.call($('#their-peerid').val(), localStream);
            step3(call);
        });

        // 切断
        $('#end-call').click(function () {
            existingCall.close();
            step2();
        });

        // ステップ１実行
        step1();

    });

    function step1() {

        var _audio_flag = true;
        var _param = {
            video: {},
            audio: _audio_flag
        };
        var width = 3840;
        var height = 2160;
        var fps = 30;

        if (!!navigator.mozGetUserMedia) {
            // for FF
            _param.video.height = {min: height, max: height};
            _param.video.width = {min: width, max: width};
        }else{
            // for Chrome
            _param.video.width = {min: width, max: width};
            _param.video.height = {min: height, max: height};
            _param.video.frameRate = {min: fps, max: fps};
        }

        navigator.mediaDevices.getUserMedia(_param)
            .then(function (stream) { // success
                //const videoDom = $('#myVideo')[0];
                //videoDom.srcObject = stream;
                localStream = stream;
            }).catch(function (error) { // error
            console.error('mediaDevice.getUserMedia() error:', error);
            return;
        });

    };

    function step2() {
        //UIコントロール
        $('#step1, #step3').hide();
        $('#step2').show();
    }

    function step3(call) {
        // すでに接続中の場合はクローズする
        if (existingCall) {
            existingCall.close();
        }

        // 相手からのメディアストリームを待ち受ける
        call.on('stream', function (stream) {
            videoDom = $('#theirVideo')[0];
            videoDom.srcObject = stream;
        });

        // 相手がクローズした場合
        call.on('close', step2);

        // Callオブジェクトを保存
        existingCall = call;

    }

});