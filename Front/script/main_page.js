$(document).ready(() => {
    AddItem(5);
})

let loaded = false;
let postflag = 0;

$('#main').scroll(() => {
    const scrollTop = $('#main').scrollTop()
    const mainHeight = $('#main').height()
    const contentHeight = $('#content_bar').height()
    
    if((scrollTop >= contentHeight - mainHeight * 2) && loaded)
    {
        loaded = false;
        console.log("!!!");
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
                        <div class = "postuser">
                            <div class = "filter">
                                <img class = "profile" src = "/profile/${data[i].user_id}.jpg">
                            </div>
                            ${data[i].user_id}
                        </div>
                        <img class = "postimage" src = "/photo/${data[i].number}.jpg">
                        <h3 class = "postcomment">
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

$(document).on('click', '.postimage', (e) => {
    window.location.href='/page/post/'+ e.target.closest('.post').getAttribute('id').split('/')[1];
})

$(document).on('click', '.postuser', (e) => {
    window.location.href='/page/user/'+ e.target.closest('.post').getAttribute('id').split('/', 1);
})