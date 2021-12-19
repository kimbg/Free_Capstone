$(document).ready(() => {
    postid = window.location.href.split('/')[5]
    PostInfo(postid);
})

function PostInfo(postid) {
    $.ajax({
        url : '/page/getpost',
        type : 'POST',
        data : {'id' : postid}
    })
    .done((data) => {
    
        if(data != 'noData') {
            $('#content_bar').append(
                `
                <div id = "${data[0].user_id}/${data[0].number}" class = "post">
                    <div id = "postuser">
                        <img id = "profile" src = "/profile/${data[0].user_id}.jpg">
                        ${data[0].user_id}
                    </div>
                    <img id = "postimage" src = "/photo/${data[0].number}.jpg">
                    <h3 id = "postcomment">
                        ${data[0].comment}
                    </h3>
                </div>
                `
            )
        }
        GetComment(postid)
    })
}

function GetComment(postid)
{
    $.ajax({
        url : '/page/getcomments',
        type : 'POST',
        data : {'id' : postid}
    })
    .done((data) => {
        console.log(data);

        if(data != 'noData') {
            for(let i = 0; i < data.length; i++) {
                $('#content_bar').append(
                    `
                    <div class = "box">
                        <h2>
                            ${data[i].user_id}
                        </h2>
                        <h3>
                            ${data[i].comment}
                        </h3>
                    </div>
                    `
                )
            }
        }
    })
}
