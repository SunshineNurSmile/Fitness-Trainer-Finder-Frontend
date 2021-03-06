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
        this_.receiver = this_.getRequest('trainee_user_id');
        this_.get_receiver_info();
        this_.get_all_messages();
    },

    mounted: function() {
        this_ = this;
        setInterval(this_.get_all_messages, 5000);
    },
    
    methods: {
        getRequest(name) {
            var url = location.search;
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substring(1);
                strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                }
            }
            if (!theRequest[name]) {
                theRequest[name] = null;
            }
            return theRequest[name]
        },

        get_receiver_info() {
            this_.name = localStorage.getItem("name");
            this_.avatar = localStorage.getItem("avatar");
        },

        get_all_messages() {
            $.ajax({
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                url: "http://35.227.26.131:8000/api/messages/list/" + this_.receiver + "/",
                type: "GET",

                success: function(rs) {
                    this_.messages = rs;
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
                    url: "http://35.227.26.131:8000/api/messages/create/",
                    type: "POST",
                    data: data,
                    dataType: "json",
                    contentType: "application/json; charset=utf_8",
    
                    success: function(rs) {
                        this_.message = '';
                        this_.get_all_messages();
                    },
    
                    error: function(rs) {
                        alert("Could not send your message.")
                    }
                })
            }
        },

        back() {
            window.location.href = "/html/trainer/connection/connection.html";
        },
    }     
})