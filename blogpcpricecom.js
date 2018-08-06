//最終更新日：2016.4.15
//Facebookのシェア数を取得
function get_social_count_facebook(url, selcter) {
  jQuery.ajax({
    url:'https://graph.facebook.com/',
    dataType:'jsonp',
    data:{
      id:url
    },
    success:function(res){
      jQuery( selcter ).text( res.shares || 0 );
    },
    error:function(){
      jQuery( selcter ).text('0');
    }
  });
}
//はてなブックマークではてブ数を取得
function get_social_count_hatebu(url, selcter) {
  jQuery.ajax({
    url:'https://b.hatena.ne.jp/entry.count?callback=?',
    dataType:'jsonp',
    data:{
      url:url
    },
    success:function(res){
      jQuery( selcter ).text( res || 0 );
    },
    error:function(){
      jQuery( selcter ).text('0');
    }
  });
}
//Twitterのシェア数を取得
function get_social_count_twitter(url, selcter) {
  jQuery.ajax({
  url:'https://jsoon.digitiminimi.com/twitter/count.json',
  dataType:'jsonp',
  data:{
    url:url
  },
  success:function(res){
    jQuery( selcter ).text( res.count || 0 );
  },
  error:function(){
    jQuery( selcter ).text('0');
  }
  });
}
//Google＋のシェア数を取得
function get_social_count_googleplus(url, selcter) {
  jQuery.ajax({
    type: "get", dataType: "xml",
    url: "http://query.yahooapis.com/v1/public/yql",
    data: {
      q: "SELECT content FROM data.headers WHERE url='https://plusone.google.com/_/+1/fastbutton?hl=ja&url=" + url + "' and ua='#Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.154 Safari/537.36'",
      format: "xml",
      env: "http://datatables.org/alltables.env"
    },
    success: function (data) {
      var content = jQuery(data).find("content").text();
      var match = content.match(/window\.__SSR[\s*]=[\s*]{c:[\s*](\d+)/i);
      var count = (match != null) ? match[1] : 0;
      jQuery( selcter ).text(count);
    }
  });
}
//ポケットのストック数を取得
function get_social_count_pocket(url, selcter) {
  $.ajax({
    type: "get", dataType: "xml",
    url: "http://query.yahooapis.com/v1/public/yql",
    data: {
      q: "SELECT content FROM data.headers WHERE url='https://widgets.getpocket.com/v1/button?label=pocket&count=vertical&v=1&url=" + url + "' and ua='#Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.154 Safari/537.36'",
      format: "xml",
      env: "http://datatables.org/alltables.env"
    },
    success: function (data) {
      var content = $(data).find("content").text();
      var match = content.match(/<em id="cnt">(\d+)<\/em>/i);
      var count = (match != null) ? match[1] : 0;
 
      $( selcter ).text(count);
    }
  });
}
jQuery(function(){
  get_social_count_facebook('{Permalink}', '.facebook-count');
  get_social_count_hatebu('{Permalink}', '.hatebu-count');
  get_social_count_twitter('{Permalink}', '.twitter-count');
  get_social_count_googleplus('{Permalink}', '.googleplus-count');
  get_social_count_pocket('{Permalink}', '.pocket-count');
});
