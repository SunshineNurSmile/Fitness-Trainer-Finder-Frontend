var this_;
var app = new Vue({
    el: '#app',
    data: {
        trainer_id: '',

        avatar: '',

        name: '',
        style: '',
        description: '',

        price: '',
        createdAt: '',
        days: '',
        
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
        this_.initPerMsg();
        this_.getVideo();
    },
    
    methods: {
        getVideo() {
            $.ajax({
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                url: "http://127.0.0.1:8000/api/users/trainers/file/" + this.trainer_id + "/",
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
                url: "http://127.0.0.1:8000/api/users/trainees/mytrainers",
                type: "GET",
                
                success: function(rs) {
                    console.log(rs);
                    if (rs != null) {
                        this_.trainer_id = rs._id
                        this_.name = rs.name;
                        this_.style = rs.training_style;
                        this_.description = rs.description;
                        this_.avatar = rs.avatar;
                        this_.price = rs.price;
                        this_.createdAt = rs.createdAt;
                        this_.img1 = rs.image1;
                        this_.img2 = rs.image2;
                        this_.img3 = rs.image3;
                        this_.img4 = rs.image4;
                        this_.img5 = rs.image5;
                        this_.img6 = rs.image6;

                        //calculate days remaining from order create date.

                    }
                    else {
                        alert("Error Loading Information!");
                    }
                }
            })
        },

        start_chat() {

        }
    }
})