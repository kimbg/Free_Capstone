$(document).ready(() => {
    AddItem(5);
})

let loaded = false;
let postflag = 0;

$('#main').scroll(() => {
    const scrollTop = $('#main').scrollTop()
    const mainHeight = $('#main').height()
    const contentHeight = $('#content_bar').height()

    if((scrollTop >= contentHeight - mainHeight) && loaded)
    {
        loaded = false;
        AddItem(5);
    }
})

function AddItem(count) {
    $.ajax({
        url : '/page/getposts',
        type : 'POST',
        data : {'flag' : postflag, 'value' : count}
    })
    .done((data) => {
    
        if(data != 'noData') {

            for(let i = 0; i < data.length; i++) {
                $('#content_bar').append(
                    `
                    <div id = "${data[i].user_id}/${data[i].number}" class = "post">
                        <div id = "postuser">
                            <img id = "profile" src = "/profile/${data[i].user_id}.jpg">
                            ${data[i].user_id}
                        </div>
                        <img id = "postimage" src = "/photo/${data[i].number}.jpg">
                        <h3 id = "postcomment">
                            ${data[i].comment}
                        </h3>
                    </div>
                    `
                )
            }
            postflag += data.length;
            loaded = true;
        }
    })
}

$(document).on('click', '#postimage', (e) => {
    window.location.href='/page/post/'+ e.target.closest('.post').getAttribute('id').split('/')[1];
})

$(document).on('click', '#postuser', (e) => {
    window.location.href='/page/user/'+ e.target.closest('.post').getAttribute('id').split('/', 1);
})