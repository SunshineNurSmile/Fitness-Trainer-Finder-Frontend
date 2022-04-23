var app = new Vue({
    el: '#app',
    data: {
        weight: '',
        heightft: '',
        heightin: '',
        dob: '',

        MaleTF: false,
        FemaleTF: false,
    },
    
    methods: {
        jump_to_AT(){
            if (this.weight == ''||this.heightft == '' ||this.heightin == '' ||this.dob == '') {
                alert("The information cannot be empty.");
                window.location.reload();
            }
            else if (this.heightft < 3 || this.heightft > 7) {
                alert("You must enter a valid height.");
                window.location.reload();
            }
            else if (this.heightin < 0 || this.heightft > 11) {
                alert("You must enter a valid height.");
                window.location.reload();
            }
            else{                
                var datas = {};
                if (this.MaleTF == true) {
                    datas.gender = 'Male';
                }
                else {
                    datas.gender = 'Female';
                }
                datas.weight = this.weight;
                datas.heightft = this.heightft;
                datas.heightin = this.heightin;
                datas.dob = this.dob;
                window.localStorage.trainee = JSON.stringify(datas);
                window.location.href = "/html/trainee/loginsignup/chooseStyle.html";
            }
        }
    }
})