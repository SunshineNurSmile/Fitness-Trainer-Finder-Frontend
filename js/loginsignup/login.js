var app = new Vue({
    el: '#app',
    data: {
        email: '',
        password: ''
    },
    mounted: function() {},
    methods: {
        login(){
            if (this.email == ''||this.password == '') {
                alert("Email or password cannot be empty");
                location. reload();
            } 
            var data_l = {};
            data_l.username = this.email;
            data_l.password = this.password;
            var formData = JSON.stringify(data_l);
            console.log(data_l);
            $.ajax({
                url: "http://127.0.0.1:8000/api/users/login/",
                type: "post",
                dataType: "json",
                data: formData,
                contentType: "application/json",
                success: function(rs) {
                    console.log(rs);
                    if (rs != null) {
                        console.log(rs);
                        window.localStorage.setItem('token', rs.token);
                        alert("Login successful!");
                        window.location.href = "/html/home/homepage.html";
                    } else {
                        alert(rs.msg);
                    }
                    // if (rs.code == "0") {
                    // 	console.log(rs);
                    //     window.localStorage.setItem('refreshToken', rs.refresh);
                    //     window.localStorage.setItem('accessToken', rs.access);
                    // 	alert("Login successful!");
                    // 	window.location.href = "index_page.html";
                    // } else {
                    // 	alert(rs.msg);
                    // }
                },
                error: function(rs, e) {
                    console.error(rs.status);
                    console.error(rs.responseText);
                    alert(rs.msg);
                }

            });
        },
        jump_to_signup() {
            window.location.href = "/html/loginsignup/signup.html";
        },
        jump_to_Fpwd(){
            window.location.href = "/html/loginsignup/forgotpassword.html";
        }
    }     
})