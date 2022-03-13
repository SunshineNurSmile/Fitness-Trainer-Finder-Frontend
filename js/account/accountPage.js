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
        img: '/profilepictures/defaultProfile.svg'
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
                url: "http://127.0.0.1:8000/api/users/profile/",
                type: "GET",
                
                success: function(rs) {
                    if (rs != null) {
                        this_.name = rs.name;
                        this_.gender = rs.user_profile.gender;
                        this_.weight = rs.user_profile.weight + "LB";
                        
                        // Get Height
                        var feet = Math.floor(rs.user_profile.height / 12);
                        var inch = rs.user_profile.height % 12;
                        this_.height = feet + "\'" + inch + "\"";

                        // Get Description
                        if (rs.user_profile.description != null) {
                            this_.description = rs.user_profile.description;
                        }

                        // Get Profile Image
                        if (rs.user_profile.picture != null) {
                            this_.img = rs.user_profile.picture;
                        }

                        // Get Age
                        var dob = rs.user_profile.dob;
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