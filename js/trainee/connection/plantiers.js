var this_;
var app = new Vue({
    el: '#app',
    data: {
        trainer_id: '',

        price2: '',
        price3: '',

        description1: '',
        description2: '',
        description3: '',
    },

    created: function() {
        this_ = this;
        this_.trainer_id = this_.getRequest("trainer_id");
        this_.initPerMsg();
    },
    
    methods: {
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

        initPerMsg() {
            $.ajax({
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                url: "http://34.201.24.7/api/users/trainers/payment/" + this.trainer_id + "/",
                type: "GET",
                
                success: function(rs) {
                    console.log(rs);
                    if (rs != null) {
                        this_.price2 = rs.price2;
                        this_.price3 = rs.price3;
                        this_.description1 = rs.description1;
                        this_.description2 = rs.description2;
                        this_.description3 = rs.description3;
                    }
                    else {
                        alert("Error Loading Information!");
                    }
                }
            })
        },

        jump_to_pp(price, description) {
            window.localStorage.setItem('price', price);
            window.localStorage.setItem('description', description);
            window.localStorage.setItem('trainer_id', this.trainer_id);
            window.location.href = '/html/trainee/connection/tierdetail.html';
        },

        back() {
            window.location.href = '/html/trainee/connection/trainercard.html?trainer_id=' + this.trainer_id;
        }
    }
})