var app = new Vue({
    el: '#app',
    data: {
        gender: '',
        weight: '',
        heightft: '',
        heightin: '',
        dob: ''
    },
    mounted: function() {},
    methods: {
        jump_to_AT(){
            if (this.gender == ''||this.weight == ''||this.heightft == '' ||this.heightin == '' ||this.dob == '') {
                alert("The information cannot be empty");
                window.location.reload();
            }
            else{
                var datas = {};
                datas.gender = this.gender;
                datas.weight = this.weight;
                datas.heightft = this.heightft;
                datas.heightin = this.heightin;
                datas.dob = this.dob;
                window.localStorage.trainee = JSON.stringify(datas);
                window.location.href = "/html/loginsignup/chooseStyle.html";
            }
        }
    }
})