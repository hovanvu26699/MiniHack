$(document).ready(function () {
  let usersData = []
  //get post
  function fetchPosts() {
    $.ajax({
      url: "http://localhost:3000/post",
      type: 'GET',
      contentType: 'application/json'
    }).done(function (data) {
      if (data.status === 'error') {
        $('.alert').remove()
        $(".container-fluid").prepend(`<div class="alert alert-danger" role="alert">Database error</div>`)
      } else {
        postsData = data.data
        console.log(usersData)

        console.log(data)
        data.data.forEach(post => {
          let Comment = post.comments.length
          $(".post").prepend(`
          <div class="content-main" key=${post._id}>
        <div class="author">
          <div class="author-main">
            <a href="#"><img src="../../assets/images/../../assets/img/co.jpg" alt=""></a>
            <a href="#">
              <span class="text-black">${post.author}</span>
            </a>
          </div>
          <div class="author-status">
            <div><span class="status">${post.content}</span></div>
          </div>
        </div>

        <div class="reactions">
          <div class="reactions-list" >
            <div class="reaction">
              <div class="detail-reaction" >
                <span>${post.reaction.like}</span>
                <img src="../../assets/img/linke.png" class="reaction__like" alt="icon">
              </div>
            </div>
            <div class="reaction">
              <div class="detail-reaction">
                <span>${post.reaction.dislike}</span>
                <img src="../../assets/img/linke.png" class="reaction__dislike" alt="icon">
              </div>
            </div>
            <div class="reaction">
              <div class="detail-reaction">
                <span>${post.reaction.heart}</span>
                <img src="../../assets/img/linke.png" class="reaction__heart" alt="icon">
              </div>
            </div>
            <div class="reaction">
              <div class="detail-reaction">
                <span>${post.reaction.smile}</span>
                <img src="../../assets/img/linke.png" class="reaction__smile" alt="icon">
              </div>
            </div>
          </div>
          <div class="number-of-comments">
            <span class="display-comment">${Comment} bình luận</span>
          </div>
        </div>

        <div class="comments">
          <div class="list-comment comment${post._id}">
          </div>
          <div class="input-comment">
            <img src="../../assets/img/co.jpg" alt="icon">
            <input type="text" name="" class="comment-content${post._id} commentInput"  placeholder="Viết bình luận ...">
            <button type="button" class="btn btn-primary btn-send">Đăng</button>
          </div>
        </div>
      </div>
          `)

          // console.log(post.comments)
          post.comments.forEach(comment => {
            // console.log(comment)
            $(`.comment${post._id}`).prepend(`
          <div class="comment">
            <img src="../../assets/img/co.jpg" alt="icon">
            <div>
              <div class="content-cmt">
                <span>Thomas</span>
                <p>${comment.content}</p>
              </div>
              <div class="tuongtac">
                <a href="#">Thích</a>
                <span>&#183;</span>
                <a href="#">Trả lời</a>
              </div>
            </div>
          </div>
          `)
          })
        });
      }
    })
  }
  fetchPosts()

  // get users
  function fetchUsers() {
    $.ajax({
      url: "http://localhost:3000/users",
      type: "GET",
      contentType: 'application/json'
    }).done(function (data) {
      if (!data.isSuccess) {
        $('.alert').remove()
        $(".container-fluid").prepend(`<div class="alert alert-danger" role="alert">Database error</div>`)
      } else {
        console.log(data)
        data.data.forEach(user => {
          $('.list-friend').prepend(`
          <div class="friend">
            <img src="../../assets/img/worm.jpg" alt="">
            <span class="nick" style="color: aliceblue;">${user.lastName} ${user.firstName}</span>
          </div>
      `)
          $('#sel1').prepend(`<option value="${user.firstName}">${user.lastName} ${user.firstName} </option>`)
        })
      }
    })
  }
  fetchUsers()

  // Create post
  $('.btn-post').click(function () {
    // Remember edit nhe
    let author = $('#sel1').val();
    let content = $('#content-post').val()

    if (!author) {
      $('.alert').remove()
      $('.container-fluid').prepend('<div class="alert alert-warning" role="alert">Name Invalid</div>')
      return
    }

    if (!content) {
      $('.alert').remove()
      $('.container-fluid').prepend('<div class="alert alert-warning" role="alert">Content Invalid</div>')
      return
    }

    $.ajax({
      url: "http://localhost:3000/post",
      data: JSON.stringify({
        author,
        content
      }),
      type: 'POST',
      contentType: 'application/json'
    }).done(function (data) {
      if (!data.isSuccess) {
        $('.alert').remove()
        $(".flex-container").prepend(`<div class="alert alert-danger" role="alert">${data.message}</div>`)
        // } else {
        //   console.log('new Data ', data)
        //   $(".post").prepend(`
        //         <div class="content-main">
        //             <div class="author">
        //               <div class="author-main">
        //                 <a href="#"><img src="../../assets/images/../../assets/img/co.jpg" alt=""></a>
        //                 <a href="#">
        //                   <span class="text-black">${data.data.author}</span>
        //                 </a>
        //               </div>
        //               <div class="author-status">
        //                 <div><span class="status">${data.data.content}</span></div>
        //                 <!-- <img src="../../assets/img/cat.jpg" alt=""> -->
        //               </div>
        //             </div>

        //             <div class="reactions">
        //     <div class="reactions-list">
        //       <div class="reaction">
        //         <div>
        //           <span>0</span>
        //           <img src="../../assets/img/linke.png" alt="icon">
        //         </div>
        //       </div>
        //       <div class="reaction">
        //         <div>
        //           <span>0</span>
        //           <img src="../../assets/img/linke.png" alt="icon">
        //         </div>
        //       </div>
        //       <div class="reaction">
        //         <div>
        //           <span>0</span>
        //           <img src="../../assets/img/linke.png" alt="icon">
        //         </div>
        //       </div>
        //       <div class="reaction">
        //         <div>
        //           <span>0</span>
        //           <img src="../../assets/img/linke.png" alt="icon">
        //         </div>
        //       </div>
        //     </div>
        //     <div class="number-of-comments">
        //       <span class="display-comment">0 bình luận</span>
        //     </div>
        //   </div>

        //             <div class="comments">
        //               <div class="input-comment">
        //                 <img src="../../assets/img/co.jpg" alt="icon">
        //                 <input type="text" name="" class="commentInput" placeholder="Viết bình luận ...">
        //               </div>
        //               <div class="list-comment">
        //               </div>
        //           </div>
        //   `)
        // }
      }
      window.location.reload()

    })
    $('#sel1').val('');
    $('#content-post').val('');
  })

  // Like 
  $(document).on("click", ".reaction__like", function (event) {
    let postID = $(this).parents('.content-main').attr("key")
    let postUpdate = []
    console.log('LIKE - ', $(this).parents('.content-main').attr("key"));
    postsData.map(post => {
      if (post._id == postID) {
        post.reaction.like++;
        postUpdate = post
      }
    })

    $.ajax({
      url: "http://localhost:3000/post/:id",
      data: JSON.stringify({
        postID,
        postUpdate
      }),
      type: 'POST',
      contentType: 'application/json'
    }).done(function (data) {
      if (!data.isSuccess) {
        $('.alert').remove()
        $("header").before(`<div class="alert alert-danger" role="alert">Can't update database</div>`)
      } else {
        console.log(data.data)
        window.location.reload()
      }
    })
  })

  // dislike
  $(document).on("click", ".reaction__dislike", function (event) {
    let postID = $(this).parents('.content-main').attr("key")
    let postUpdate = []
    console.log('DISLIKE - ', $(this).parents('.content-main').attr("key"));
    postsData.map(post => {
      if (post._id == postID) {
        post.reaction.dislike++;
        postUpdate = post
      }
    })

    $.ajax({
      url: "http://localhost:3000/post/:id",
      data: JSON.stringify({
        postID,
        postUpdate
      }),
      type: 'POST',
      contentType: 'application/json'
    }).done(function (data) {
      if (!data.isSuccess) {
        $('.alert').remove()
        $("header").before(`<div class="alert alert-danger" role="alert">Can't update database</div>`)
      } else {
        console.log(data.data)
        window.location.reload()
      }
    })
  })

  // heart
  $(document).on("click", ".reaction__heart", function (event) {
    let postID = $(this).parents('.content-main').attr("key")
    let postUpdate = []
    console.log('HEART - ', $(this).parents('.content-main').attr("key"));
    postsData.map(post => {
      if (post._id == postID) {
        post.reaction.heart++;
        postUpdate = post
      }
    })

    $.ajax({
      url: "http://localhost:3000/post/:id",
      data: JSON.stringify({
        postID,
        postUpdate
      }),
      type: 'POST',
      contentType: 'application/json'
    }).done(function (data) {
      if (!data.isSuccess) {
        $('.alert').remove()
        $("header").before(`<div class="alert alert-danger" role="alert">Can't update database</div>`)
      } else {
        console.log(data.data)
        window.location.reload()
      }
    })

  })

  // smile
  $(document).on("click", ".reaction__smile", function (event) {
    let postID = $(this).parents('.content-main').attr("key")
    let postUpdate = []
    console.log('SMILE - ', $(this).parents('.content-main').attr("key"));
    postsData.map(post => {
      if (post._id == postID) {
        post.reaction.smile++;
        postUpdate = post
      }
    })

    $.ajax({
      url: "http://localhost:3000/post/:id",
      data: JSON.stringify({
        postID,
        postUpdate
      }),
      type: 'POST',
      contentType: 'application/json'
    }).done(function (data) {
      if (!data.isSuccess) {
        $('.alert').remove()
        $("header").before(`<div class="alert alert-danger" role="alert">Can't update database</div>`)
      } else {
        console.log(data.data)
        window.location.reload()
      }
    })

  })

  // COMMENTS
  $('.post').on("click", ".content-main .comments .input-comment .btn-send", function (event) {
    event.preventDefault();
    let postID = $(this).parents('.content-main').attr("key")
    let content = $(`.comment-content${postID}`).val()
    let postUpdate = []
    console.log('ID - ', postID);
    console.log("Content - ", content)
    // console.log(commentUpdate)
    if (!content) {
      // return console.log("koddc", content)
      $('.alert').remove()
      $("header").before(`<div class="alert alert-danger" role="alert">Can't update database</div>`)
      return
    }

    postsData.map(post => {
      if (post._id == postID) {
        post.comments.push({ content });
        postUpdate = post
      }
    })

    let COMMENT = postUpdate.comments
    console.log(COMMENT);
    $.ajax({
      url: `http://localhost:3000/post/${postID}`,
      data: JSON.stringify({
        postID,
        COMMENT
      }),
      type: 'PUT',
      contentType: 'application/json'
    }).done(function (data) {
      console.log(data)
      if (!data.isSuccess) {
        $('.alert').remove()
        $("header").before(`<div class="alert alert-danger" role="alert">Can't update database</div>`)
      } else {
        // console.log(data.data)
        window.location.reload()
      }
    })
  })

})