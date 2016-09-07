$(document).ready(function() {


  $(window).load(function(){
    refresh();
  });

  var flagCheck = function(data,i){
    if (data===true){
      return`<i id=${data[i].id} class='fa fa-flag red' style='float:left;' aria-hidden: true>`
    } else {
      return`<i id=${data[i].id} class='fa fa-flag' style='float:left;' aria-hidden: true>`
    }
  }

  //REFRESH FUNCTION
  var refresh = function(){
    $.get('/messages?', function(data){
      $('ul#messages').html('');
      for(var i=0; i < data.length; i++){
        $('ul#messages').prepend(`<li id=${data[i].id}>${flagCheck(data,i)}</i>${data[i].user}: ${data[i].body}<i class='close'>x</i></li>`);
      }
    });
  }

  $('form').on('submit', function(e){
    e.preventDefault();
    $.post('/messages',{user: $('input:text').val(), body: $('textarea').val()}, function(){
      // $('input:text').val('');
      $('textarea').val('');
      refresh();
    });
  });

  $('#messages').delegate('li i.close', 'click', function(e){
    // console.log($(e.target).parent().attr('id'));
    var target = $(e.target).parent().attr('id');
    $.ajax({
      url: `/messages/${target}`,
      method: 'DELETE',
      error: function(){
        // alert("Something's wrong");
        refresh();
      },
      success: function(){
        // alert("Deleted");
        // refresh();
        $(e.target).parent().remove();
      }
    });
  });

  $('#messages').delegate('li .fa-flag', 'click', function(e){
    var target = $(e.target).parent().attr('id');
    console.log(target)
    if($(target).data("flag")){
      $.post(`/messages/${target}`, {flag: false, _method: 'patch'});
      $(e.target).toggleClass('red');
    } else {
      $.post(`/messages/${target}`, {flag: true, _method: 'patch'});
      $(e.target).toggleClass('red');
    }
  });
});
