var this_;
var app = new Vue({
    el: '#app',
    data: {
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
        this_.initPerMsg();
    },
    
    methods: {
        initPerMsg() {
            $.ajax({
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                url: "http://127.0.0.1:8000/api/users/trainees/mytrainer/",
                type: "GET",
                
                success: function(rs) {
                    if (rs != null) {
                        var data = rs[0];
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
                    else {
                        alert("Error Loading Information!");
                    }
                }
            })
        },

        getVideo(id) {
            $.ajax({
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                url: "http://127.0.0.1:8000/api/users/trainers/file/" + id + "/",
                type: "GET",
                
                success: function(rs) {
                    if (rs != null) {
                        this_.videourl = rs[0];
                    }
                }
            })
        },

        start_chat() {

        }
    }
})