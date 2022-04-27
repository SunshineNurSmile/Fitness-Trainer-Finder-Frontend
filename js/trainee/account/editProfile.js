var this_;
var app = new Vue({
    el: '#app',
    data: {
        id: '',
        heightft: '',
        heightin: '',
        weight: '',
        description: '',
        training_style: '',
        gender: '',
        avatar: '',
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
                url: "http://35.227.26.131/api/users/trainees/",
                type: "GET",
                
                success: function(rs) {
                    if (rs != null) {
                        this_.id = rs.id;
                        this_.heightft = rs.trainee.heightft;
                        this_.heightin = rs.trainee.heightin;
                        this_.weight = rs.trainee.weight;
                        this_.training_style = rs.trainee.training_style;
                        this_.gender = rs.trainee.gender;
                        if (rs.trainee.description != null) {
                            this_.description = rs.trainee.description;
                        }

                        if (rs.trainee.avatar != null) {
                            this_.avatar = rs.trainee.avatar;
                        }
                        else {
                            this_.avatar = "/images/defaultProfile.png";
                        }
                    }
                }
            })
        },

        upload(image) {
            var img = image.target.files[0];
            var reader = new FileReader();
            if (img) {
                reader.readAsDataURL(img);
                reader.onload = function(e) {
                    this_.avatar = reader.result;
                }
            }
        },

        submit() {
            var datas = {};
            datas.heightft = this.heightft;
            datas.heightin = this.heightin;
            datas.weight = this.weight;
            datas.description = this.description;
            datas.training_style = this.training_style;
            datas.gender = this.gender;
            datas.avatar = this.avatar;
            
            var data = JSON.stringify(datas);
            
            $.ajax({
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                url: "http://35.227.26.131/api/users/trainees/update/" + this.id + "/",
                type: "PUT",
                data: data,
                dataType: "json",
                contentType: "application/json; charset=utf_8",

                success: function(rs) {
                    alert("Information Modified.")
                    window.location.href = "/html/trainee/account/accountPage.html";
                },

                error: function(rs) {
                    alert("Something Went Wrong.")
                }
            })
        },
        
        cancel() {
            window.location.href = "/html/trainee/account/accountPage.html";
        }
    },
})