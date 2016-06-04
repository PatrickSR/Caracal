var fabVM = new Vue({
    el: '#div_float_button', 
    methods: {
        addOrder: function (event) {
            // alert('Hello') 
        }
    }
})

$(document).ready(function(){
    $('#div_float_button').leanModal();
})