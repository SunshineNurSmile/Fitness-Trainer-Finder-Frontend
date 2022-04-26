var this_;
var app = new Vue({
    el: '#app',
    data: {
        id: '',
        avatar: '',
        description: '',
        training_style: '',

        file: '',

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
    },

    methods: {
        initPerMsg() {
            $.ajax({
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                url: "http://34.201.24.7/api/users/trainers/",
                type: "GET",
                
                success: function(rs) {
                    if (rs != null) {
                        this_.id = rs.id;
                        this_.training_style = rs.trainer.training_style;
                        if (rs.trainer.description != null) {
                            this_.description = rs.trainer.description;
                        }

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

        upload1(image) {
            var img = image.target.files[0];
            var reader = new FileReader();
            if (img) {
                reader.readAsDataURL(img);
                reader.onload = function(e) {
                    this_.img1 = reader.result;
                }
            }
        },

        upload2(image) {
            var img = image.target.files[0];
            var reader = new FileReader();
            if (img) {
                reader.readAsDataURL(img);
                reader.onload = function(e) {
                    this_.img2 = reader.result;
                }
            }
        },

        upload3(image) {
            var img = image.target.files[0];
            var reader = new FileReader();
            if (img) {
                reader.readAsDataURL(img);
                reader.onload = function(e) {
                    this_.img3 = reader.result;
                }
            }
        },

        upload4(image) {
            var img = image.target.files[0];
            var reader = new FileReader();
            if (img) {
                reader.readAsDataURL(img);
                reader.onload = function(e) {
                    this_.img4 = reader.result;
                }
            }
        },

        upload5(image) {
            var img = image.target.files[0];
            var reader = new FileReader();
            if (img) {
                reader.readAsDataURL(img);
                reader.onload = function(e) {
                    this_.img5 = reader.result;
                }
            }
        },

        upload6(image) {
            var img = image.target.files[0];
            var reader = new FileReader();
            if (img) {
                reader.readAsDataURL(img);
                reader.onload = function(e) {
                    this_.img6 = reader.result;
                }
            }
        },

        uploadvideo(video) {
            this.file = video.target.files[0];
        },

        video_upload(start, model_id) {
            var max_length = 1024 * 1024 * 10;
            var end;
            var this_ = this;
            var existingPath = model_id;
            var formData = new FormData();
            var nextChunk = start + max_length + 1;
            var currentChunk = this.file.slice(start, nextChunk);
            var uploadedChunk = start + currentChunk.size;
            if (uploadedChunk >= this.file.size) {
                end = 1;
            }
            else {
                end = 0;
            }
            formData.append('file', currentChunk);
            formData.append('filename', this.file.name);
            formData.append('end', end);
            formData.append('existingPath', existingPath);
            formData.append('nextSlice', nextChunk);

            $.ajax({
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                url: 'http://34.201.24.7/api/users/trainers/uploadFile',
                type: 'POST',
                dataType: 'JSON',
                cache: false,
                processData: false,
                contentType: false,
                data: formData,
                
                success: function(rs) {
                    if (nextChunk < this_.file.size) {
                        existingPath = rs.existingPath
                        this_.video_upload(nextChunk, existingPath);
                    } 
                    else {
                        alert(rs.data);
                    }
                }
            })
        },

        submit() {
            var datas = {};
            datas.avatar = this.avatar;
            datas.description = this.description;
            datas.training_style = this.training_style;
            datas.image1 = this.img1;
            datas.image2 = this.img2;
            datas.image3 = this.img3;
            datas.image4 = this.img4;
            datas.image5 = this.img5;
            datas.image6 = this.img6;
            
            var data = JSON.stringify(datas);
            
            $.ajax({
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                url: "http://34.201.24.7/api/users/trainers/update/" + this.id + "/",
                type: "PUT",
                data: data,
                dataType: "json",
                contentType: "application/json; charset=utf_8",

                success: function(rs) {
                    alert("Information Modified.")
                    window.location.href = "/html/trainer/account/accountPage.html";
                },

                error: function(rs) {
                    alert("Something Went Wrong.")
                }
            })
        },
        
        cancel() {
            window.location.href = "/html/trainer/account/accountPage.html";
        }
    },
})