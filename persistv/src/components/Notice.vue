<template>
    <div>
      Notice
    </div>
</template>

<script>
    export default {
        name: "Notice",
        data: function () {
            return {
                webSocket: null,
            }
        },
        created: function() {
            const socketUrl="ws://com.jcpl.persist:8888/websocket/test";
            if (this.webSocket == null) {
                this.webSocket = new WebSocket(socketUrl);
                this.webSocket.onopen = this.onopen;
                this.webSocket.onmessage = this.onmessage;
                this.webSocket.onclose = this.onclose;
                this.webSocket.onerror = this.onerror;
            }
        },
        methods: {
            onopen: function() {
                console.log("websocket已打开");
            },
            onmessage: function(msg) {
                console.log(msg);
            },
            onclose: function() {
                console.log("websocket已关闭");
            },
            onerror: function() {
                console.log("websocket发生了错误");
            },
            close: function () {
                if (this.webSocket) {
                    this.webSocket.close();
                }
            }
        }
    }
</script>

<style scoped>

</style>
