$(function() {
  function buildMessage(message) {
    let addImage = (message.image.url !== null) ? `<img class="message__text__image" src="${message.image.url}" >` :''

    let html =`<div class="message">
                <div class="message__upper-info">
                  <p class="message__upper-info__talker">
                  ${message.user_name}
                  </p>
                  <p class="message__upper-info__date">
                  ${message.created_at}
                  </p>
                </div>
                  <p class="message__text">
                  </p><p class="message__text__content">${message.content}</p>
                  ${addImage}
                  <p></p>
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
  })
});