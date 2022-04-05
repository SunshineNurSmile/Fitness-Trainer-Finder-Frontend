var this_;
var app = new Vue({
    el: '#app',
    data: {
        name: '',
        age: '',
        gender: '',
        height: '',
        weight: '',
        description: 'Please edit your description in the Edit Profile page using the menu button.',
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
                url: "http://127.0.0.1:8000/api/users/trainees/",
                type: "GET",
                
                success: function(rs) {
                    if (rs != null) {
                        this_.name = rs.name;
                        this_.gender = rs.trainee.gender;
                        this_.weight = rs.trainee.weight + "LB";
                        this_.height = rs.trainee.heightft + "\'" + rs.trainee.heightin + "\"";

                        // Get Description
                        if (rs.trainee.description != null) {
                            this_.description = rs.trainee.description;
                        }

                        // Get Profile Image
                        if (rs.trainee.avatar != null) {
                            this_.avatar = rs.trainee.avatar;
                        }
                        else {
                            this_.avatar = "/images/defaultProfile.png";
                        }

                        // Get Age
                        var dob = rs.trainee.dob;
                        var today = new Date();
                        var yearDiff = today.getFullYear() - parseInt(dob.substring(0,4));
                        var monthDiff = today.getMonth() - parseInt(dob.substring(5, 7)) + 1;
                        var dateDiff = today.getDate() - parseInt(dob.substring(8));
                        if (monthDiff < 0 || (monthDiff == 0 && dateDiff < 0)) {
                            if (yearDiff > 0) {
                                yearDiff -= 1;
                            }
                        }
                        this_.age = yearDiff;
                    }
                    else {
                        alert("Error Loading Information!");
                    }
                }
            })
        }
    }
})

const menu = document.querySelector(".menu");
const close = document.querySelector(".close");
const nav = document.querySelector("nav");

menu.addEventListener("click", () => {
    nav.classList.add("open-nav");
});

close.addEventListener("click", () => {
    nav.classList.remove("open-nav");
});