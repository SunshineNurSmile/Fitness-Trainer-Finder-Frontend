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
                var datas = JSON.parse(localStorage.trainee);
                datas.training_style = this.training_style;
                var data = JSON.stringify(datas);
            }

            $.ajax({
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                url: "http://127.0.0.1:8000/api/users/trainees/create",
                type: "POST",
                dataType: "json",
                data: data,
                contentType: "application/json",
                success: function(rs) {
                    window.location.href = '/html/trainee/loginsignup/motivationalMessage.html';
                },
                error: function(xhr, status, error){
                    var errorMessage = xhr.status + ': ' + xhr.statusText
                    alert('Error - ' + errorMessage);
                }
            });
        }
    }
})