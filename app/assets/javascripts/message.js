$(function() {
  function buildMessage(message) {
    let addContent = message.content ? `${message.content}` : ""
    let addImage =  message.image.url ? `<img class="message__text__image" src="${message.image.url}" >` :'';

    let html =`<div class="message" data-message-id="${message.id}">
                <div class="message__upper-info">
                  <p class="message__upper-info__talker">
                  ${message.user_name}
                  </p>
                  <p class="message__upper-info__date">
                  ${message.created_at}
                  </p>
                </div>
                  <div class="message__text">
                    <p class="message__text__content">${addContent}</p>
                  <div>
                      ${addImage}
              </div>`

                return html
  }
  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      let html = buildMessage(data);
      $('.messages').append(html);
      $('#new_message')[0].reset();
      $('.form__submit').prop('disabled', false);
      $('.messages').animate({ scrollTop : $('.messages')[0].scrollHeight});
    })
    .fail(function() {
      alert('error')
      $('.form__submit').prop('disabled', false);
    })
  });

    let reloadMessages = function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      let href = 'api/messages#index {:format=>"json"}'
      let last_message_id = $('.message:last').data('message-id');

      $.ajax({
        url: href,
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })

      .done(function(messages) {
        let insertHTML = '';
        messages.forEach(function(message) {
          insertHTML = buildMessage(message);
          $('.messages').append(insertHTML);
          $('.messages').animate({ scrollTop : $('.messages')[0].scrollHeight}, 'fast' );
        });
      })
      .fail(function() {
        alert("自動更新に失敗しました");
      });
    };
  };
  setInterval(reloadMessages, 5000);
});