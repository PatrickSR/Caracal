var fabVM = new Vue({
    el: '#div_float_button'
    , methods: {
        addOrder: function (event) {
            // alert('Hello') 
        }
    }
})

$(document).ready(function () {
    $('#div_float_button').leanModal();

    $('.collapsible').collapsible({
        accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
})