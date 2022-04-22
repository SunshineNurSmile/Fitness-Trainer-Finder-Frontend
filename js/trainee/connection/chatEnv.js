var this_;
var app = new Vue({
    el: '#app',
    data: {
        receiver: '',
        name: '',
        avatar: '',
        message: '',
        messages: [],
    },

    created: function() {
        this_ = this;
        this_.get_receiver_info();
        this_.get_all_messages();
    },

    mounted: function() {
        this_ = this;
        setInterval(this_.get_all_messages, 1000);
    },
    
    methods: {
        get_receiver_info() {
            this_.receiver = localStorage.getItem("receiver");
            this_.name = localStorage.getItem("name");
            this_.avatar = localStorage.getItem("avatar");
        },

        get_all_messages() {
            $.ajax({
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                url: "http://127.0.0.1:8000/api/messages/list/" + this_.receiver + "/",
                type: "GET",

                success: function(rs) {
                    this_.messages = rs;
                    console.log(rs);
                },

                error: function(rs) {
                    alert("Could not load message history.")
                }
            })
        },

        send_message() {
            var datas = {};
            datas.message = this_.message;
            datas.receiver = this_.receiver;
            var data = JSON.stringify(datas);

            if (datas.message != '') {
                $.ajax({
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    },
                    url: "http://127.0.0.1:8000/api/messages/create/",
                    type: "POST",
                    data: data,
                    dataType: "json",
                    contentType: "application/json; charset=utf_8",
    
                    success: function(rs) {
                        this_.message = '';
                    },
    
                    error: function(rs) {
                        alert("Could not send your message.")
                    }
                })
            }
        },

        back() {
            window.location.href = "/html/trainee/connection/chatlist.html";
        },
    }     
})