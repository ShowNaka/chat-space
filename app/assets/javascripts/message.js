$(function() {
  function buildHTML(message) {
    if (message.image) {
      var html =
        `<div class="message-list__up">
          <div class="message-list__up__user">
            ${message.user_name}
          </div>
          <div class="message-list__up__date">
            ${message.created_at}
          </div>
        </div>
        <div class="message-list__comment">
          <p class="message-list__comment">
            ${message.content}
          </p>
          <img src="${message.image}"></img>
        </div>`
      return html;
    } else {
      var html =
        `<div class="message-list__up">
          <div class="message-list__up__user">
            ${message.user_name}
          </div>
          <div class="message-list__up__date">
            ${message.created_at}
          </div>
        </div>
        <div class="message-list__comment">
          <p class="message-list__comment">
            ${message.content}
          </p>
        </div>`
      return html;
    };
  }


  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.message-list').append(html);
      $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight}, 'fast');
      $('form')[0].reset();
      $('.send-btn').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    });
    return false;
  });
});