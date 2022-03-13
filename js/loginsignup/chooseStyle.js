var app = new Vue({
    el: '#app',
    data: {
        training_style: ''
    },
    methods: {
        jump_to_MM(){
            if (this.training_style == '') {
                alert("Please select a type!");
                window.location.reload();
                return;
            }
            else {
                var datas = JSON.parse(localStorage.user_profile);
                datas.training_style = this.training_style;
                window.localStorage.user_profile = JSON.stringify(datas);
            }

            $.ajax({
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                url: "http://127.0.0.1:8000/api/users/profile/create",
                type: "POST",
                dataType: "json",
                data: localStorage.user_profile,
                contentType: "application/json",
                success: function(rs) {
                    window.location.href = '/html/loginsignup/motivationalMessage.html';
                },
                error: function(xhr, status, error){
                    var errorMessage = xhr.status + ': ' + xhr.statusText
                    alert('Error - ' + errorMessage);
                }
            });
        }
    }
})