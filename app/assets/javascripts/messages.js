$(function(){

  function buildMessage(message, imageHTML){
    var imageHTML = message.image.url ? `<img class="message__image" src="${message.image.url}" width=200 height=150 >` : "" 

    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="message__upper-info">
                    <p class="message__upper-info__talker">
                      ${message.user_name}
                    </p>
                    <p class="message__upper-info__date">
                      ${message.created_at}
                    </p>
                  </div>
                  <p class="message__text">
                    ${message.content}
                  </p>
                  ${imageHTML}
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
  
    var vallText = $('.new_message__text').val();
    var vallImage = $('.hidden').val();
    if(!vallText && !vallImage){
      alert('メッセージを入力してください')
      return false;
    }

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(message, imageHTML){
      var html = buildMessage(message, imageHTML);
      $('.messages').append(html)
      $('#new_message')[0].reset()
      $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight});
      $('.submit-btn').removeAttr('disabled');
    })
    .fail(function(){
      alert('エラー');
    })

  })
  
  var reloadMessages = function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data('message-id')
      
      $.ajax({
        url: 'api/messages',
        type: 'GET',
        dataType: 'json',
        data: {last_id: last_message_id}
      })

      .done(function(messages){
        var insertHTML = '';
        messages.forEach(function(message){
          insertHTML = buildMessage(message);
          $('.messages').append(insertHTML);
        })
        $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight}, 'fast');

      })

      .fail(function(){
        alert('自動更新,失敗!!!!')
      })
    }
  };
  setInterval(reloadMessages, 5000);
});