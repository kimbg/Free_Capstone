$(document).ready(() => {
    user = window.location.href.split('/')[5]
    UserInfo(user);
})

let loaded = false;
let postflag = 0;
let user

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

function UserInfo(user) {
    $.ajax({
        url : '/page/getuser',
        type : 'POST',
        data : {'user' : user}
    })
    .done((data) => {
        if(data != 'noData') {
            $('#content_bar').append(
                `
                <div class = "post">
                    <img id = "postimage" src = "/profile/${data[0].id}.jpg">
                    <h3 id = "postcomment">
                        ${data[0].id}
                    </h3>
                </div>
                `
            )
        }
        AddItem(5)
    })
}

function AddItem(count) {
    $.ajax({
        url : '/page/getuserposts',
        type : 'POST',
        data : {'user' : user, 'flag' : postflag, 'value' : count}
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