var this_;
var app = new Vue({
    el: '#app',
    data: {
        avatar: '',

        name: '',
        style: '',
        description: 'Please edit your description in the Edit Profile page using the menu button.',
        
        videourl: '',

        img1: '/images/defaultpicture.png',
        img2: '/images/defaultpicture.png',
        img3: '/images/defaultpicture.png',
        img4: '/images/defaultpicture.png',
        img5: '/images/defaultpicture.png',
        img6: '/images/defaultpicture.png',
        
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
                url: "http://10.142.0.2:8000/api/users/trainers/thefile",
                type: "GET",
                
                success: function(rs) {
                    this_.videourl = rs;
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
                url: "http://10.142.0.2:8000/api/users/trainers/",
                type: "GET",
                
                success: function(rs) {
                    if (rs != null) {
                        this_.name = rs.name;

                        // Get Description
                        if (rs.trainer.description != null) {
                            this_.description = rs.trainer.description;
                        }

                        // Get Profile Image
                        if (rs.trainer.avatar != null) {
                            this_.avatar = rs.trainer.avatar;
                        }
                        else {
                            this_.avatar = "/images/defaultProfile.png";
                        }

                        if (rs.trainer.image1 != null) {
                            this_.img1 = rs.trainer.image1;
                        }

                        if (rs.trainer.image2 != null) {
                            this_.img2 = rs.trainer.image2;
                        }

                        if (rs.trainer.image3 != null) {
                            this_.img3 = rs.trainer.image3;
                        }

                        if (rs.trainer.image4 != null) {
                            this_.img4 = rs.trainer.image4;
                        }

                        if (rs.trainer.image5 != null) {
                            this_.img5 = rs.trainer.image5;
                        }

                        if (rs.trainer.image6 != null) {
                            this_.img6 = rs.trainer.image6;
                        }
                    }
                    else {
                        alert("Error Loading Information!");
                    }
                }
            })
        }
    }
})