var this_;
var app = new Vue({
    el: '#app',
    data: {
        trainer_id: '',

        avatar: '',

        name: '',
        style: '',
        description: '',
        
        videourl: '',

        img1: '',
        img2: '',
        img3: '',
        img4: '',
        img5: '',
        img6: '',
    },

    created: function() {
        this_ = this;
        this_.trainer_id = this_.getRequest("trainer_id");
        this_.initPerMsg();
        this_.getVideo();
    },
    
    methods: {
        requestMsg() {
            var datas = {};
            datas.trainer_id = this_.trainer_id;
            
            var data = JSON.stringify(datas);

            $.ajax({
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                url: "http://34.201.24.7/api/users/trainees/createnote/",
                type: "POST",
                data: data,
                dataType: "json",
                contentType: "application/json; charset=utf_8",
                
                success: function(rs) {
                    if (rs != null) {
                        alert("Chat Request Has Been Sent!");
                    }
                },
                error: function(rs) {
                    alert("You have already sent a request to this trainer.");
                }
            })
        },

        getRequest(name) {
            var url = location.search;
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
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

        getVideo() {
            $.ajax({
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                url: "http://34.201.24.7/api/users/trainers/file/" + this.trainer_id + "/",
                type: "GET",
                
                success: function(rs) {
                    if (rs != null) {
                        this_.videourl = rs[0];
                    }
                }
            })
        },

        initPerMsg() {
            $.ajax({
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                url: "http://34.201.24.7/api/users/trainers/" + this.trainer_id + "/",
                type: "GET",
                
                success: function(rs) {
                    if (rs != null) {
                        this_.name = rs.name;
                        this_.style = rs.training_style;
                        this_.description = rs.description;
                        this_.avatar = rs.avatar
                        this_.img1 = rs.image1;
                        this_.img2 = rs.image2;
                        this_.img3 = rs.image3;
                        this_.img4 = rs.image4;
                        this_.img5 = rs.image5;
                        this_.img6 = rs.image6;
                    }
                    else {
                        alert("Error Loading Information!");
                    }
                }
            })
        },

        jump_to_tiers() {
            window.location.href = '/html/trainee/connection/plantiers.html?trainer_id=' + this.trainer_id;
        },

        back() {
            window.location.href = '/html/trainee/home/homepage.html';
        }
    }
})