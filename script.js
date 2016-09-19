    $(document).ready(function(){

      /*========= Search cities  ========= **/
      $( "#cityfield" ).keyup(function() {
        var url = "http://bioresearch.byu.edu/cs260/jquery/getcity.cgi?q="+$("#cityfield").val();
        console.log("query city: " + url);
        $.getJSON(url,function(data) {
            var everything;
            everything = "<ul>";
            $.each(data, function(i,item) {
              everything += "<li> "+data[i].city;
            });
            everything += "</ul>";
            $("#txtHint").html(everything);
        })
        .done(function() { /*console.log('getJSON request succeeded!');*/ })
        .fail(function(jqXHR, textStatus, errorThrown) { 
          console.log('getJSON request failed! ' + textStatus); 
          console.log(/*"incoming "+jqXHR.responseText*/);
        })
        .always(function() { /*console.log('getJSON request ended!');*/
        })
        .complete(function() { /*console.log("complete"); */});
      });

            /*========= Search weather  ========= **/

      $( "#button" ).click(function(){
          var choosenCity = $('#cityfield').val();
          $('#dispcity').html(choosenCity);

          var url = "http://api.wunderground.com/api/5a05396adb987893/conditions/q/UT/"+$("#cityfield").val() + ".json";
          console.log(url);
        $.getJSON(url,function(data) {

            var weather = "<ul>";

            $.each(data, function(i,item){
              if(item.display_location != undefined){
                console.log(item.display_location.city);
                weather += "<li>Location: " + item.display_location.city + "</li>";
              }
              
              if(item.temperature_string != undefined){
                console.log(item.temperature_string);
                weather += "<li>Temperature: " + item.temperature_string + "</li>";
              }

               if(item.weather != undefined){
                console.log(item.weather);
                weather += "<li>Weather: " + item.weather + "</li></ul>" ;
              }
              $("#weather").html(weather);
            });
          });
        });
              /*========= Search Stack Overflow  ========= **/

      $( "#searchStack" ).click(function(){
          var choosenCity = $('#stackExchageTerm').val();
          // $('#dispcity').html(choosenCity);

          var url = "https://api.stackexchange.com/2.2/search?order=desc&sort=activity&intitle="+ choosenCity  +"&site=stackoverflow";
          console.log(url);
        $.getJSON(url,function(data){

            $.each(data, function(i,item){
              console.log("Data obtained from StackExchange: ",data);
            });

            $("#restRequest").html("<a target=_blank href="+url+">"+url+"</a>");
        });
      });

});