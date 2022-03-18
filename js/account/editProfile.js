var this_;
var app = new Vue({
    el: '#app',
    data: {
        // Input information
        id: '',
        height: '',
        heightft: '',
        heightin: '',
        weight: '',
        description: '',
        training_style: '',
        gender: '',

        // Display Information
        heightft_display: '',
        heightin_display: '',
        weight_display: '',
        style_display: '',
        gender_display: '',
        description_display: 'Edit Your Description Here',

        // Image Information
        avatar: '/images/defaultProfile.png',
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
                url: "http://127.0.0.1:8000/api/users/trainees/",
                type: "GET",
                
                success: function(rs) {
                    if (rs != null) {
                        this_.id = rs.id;
                        this_.height = rs.trainee.height;
                        this_.heightft_display = "Height(FT): " + this_.height.substring(0, 2);
                        this_.heightin_display = "Height(IN): " + this_.height.substring(2);
                        this_.weight_display = "Weight: " + rs.trainee.weight;
                        this_.style_display = rs.trainee.training_style;
                        this_.gender_display = rs.trainee.gender;
                        if (rs.trainee.description != null) {
                            this_.description_display = rs.trainee.description;
                        }

                        if (rs.trainee.avatar != null) {
                            this_.avatar = rs.trainee.avatar;
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
            datas.avatar = this.avatar;
            
            if (this.heightft != '' && this.heightin != '') {
                datas.height = this.heightft + "\'" + this.heightin + "\"";
            }
            else {
                if (this.heightft == '' && this.heightin != '') {
                    datas.height = 0 + "\'" + this.heightin + "\"";
                }
                else if (this.heightin == '' && this.heightft != '') {
                    datas.height = this.heightft + "\'" + 0 + "\"";
                }
                else {
                    datas.height = this.height;
                }
            }

            if (this.weight != '') {
                datas.weight = this.weight + "LB";
            }
            else {
                var weightstr = this.weight_display
                datas.weight = weightstr.substring(9);
            }

            if (this.description != '') {
                datas.description = this.description;
            }
            else {
                datas.description = this.description_display;
            }

            if (this.gender != '') {
                datas.gender = this.gender;
            }
            else {
                datas.gender = this.gender_display;
            }

            if (this.training_style != '') {
                datas.training_style = this.training_style;
            }
            else {
                datas.training_style = this.style_display;
            }

            var data = JSON.stringify(datas);
            console.log(data);
            
            $.ajax({
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                url: "http://127.0.0.1:8000/api/users/trainees/update/" + this.id + "/",
                type: "PUT",
                data: data,
                dataType: "json",
                contentType: "application/json; charset=utf_8",

                success: function(rs) {
                    alert("Information Modified.")
                    window.location.href = "/html/account/accountPage.html";
                },

                error: function(rs) {
                    alert("Something Went Wrong.")
                }
            })
        },
        cancel() {
            window.location.href = "/html/account/accountPage.html";
        }
    },
})