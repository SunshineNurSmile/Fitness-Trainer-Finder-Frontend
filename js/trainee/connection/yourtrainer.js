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
        
        price: '',
        days: '',
    },

    created: function() {
        this_ = this;
        this_.get_trainer_info();
        this_.get_order_info();
    },
    
    methods: {
        get_trainer_info() {
            $.ajax({
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                url: "http://35.227.26.131/api/users/trainees/mytrainer/",
                type: "GET",
                
                success: function(rs) {
                    if (rs != null) {
                        var data = rs[0];
                        this_.trainer_id = data.user_id;
                        this_.name = data.name;
                        this_.style = data.training_style;
                        this_.description = data.description;
                        this_.avatar = data.avatar;
                        this_.img1 = data.image1;
                        this_.img2 = data.image2;
                        this_.img3 = data.image3;
                        this_.img4 = data.image4;
                        this_.img5 = data.image5;
                        this_.img6 = data.image6;

                        //Get video
                        this_.getVideo(data._id);
                    }
                },
                error: function(rs) {
                    alert("You have no trainer yet.");
                    window.location.href = '/html/trainee/home/homepage.html';
                }
            })
        },

        get_order_info() {
            $.ajax({
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                url: "http://35.227.26.131/api/orders/myorders/",
                type: "GET",

                success: function(rs) {
                    if (rs != null) {
                        this_.price = "$" + rs[0].totalPrice;
                        var endDate = rs[0].endDate;
                        var today = new Date();
                        var monthDiff = parseInt(endDate.substring(5, 7)) - today.getMonth() - 1;
                        
                        if (monthDiff == 0) {
                            this_.days = parseInt(endDate.substring(8, 10)) - today.getDate();
                        }
                        else {
                            this_.days = parseInt(endDate.substring(8, 10)) + 30 - today.getDate();
                        }
                    }
                },
            })
        },

        getVideo(id) {
            $.ajax({
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                url: "http://35.227.26.131/api/users/trainers/file/" + id + "/",
                type: "GET",
                
                success: function(rs) {
                    if (rs != null) {
                        this_.videourl = rs[0];
                    }
                }
            })
        },

        start_chat() {
            window.localStorage.setItem('receiver', this.trainer_id);
            window.localStorage.setItem('avatar', this.avatar);
            window.localStorage.setItem('name', this.name);
            window.location.href = '/html/trainee/connection/chatEnv.html';
        }
    }
})