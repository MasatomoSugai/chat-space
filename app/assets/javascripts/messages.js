$(function(){

  function buildMessage(message, imageHTML){
    var imageHTML = message.image.url ? `<img class="message__image" src="${message.image.url}" width=200 height=150 >` : "" 

    var html = `<div class="message">
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
      console.log(message)
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
  

});