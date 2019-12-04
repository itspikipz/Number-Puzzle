var board=[["1.jpg data-id = '1'", "2.jpg data-id = '2'", "3.jpg data-id = '3'"],
           ["4.jpg data-id = '4'", "5.jpg data-id = '5'", "6.jpg data-id = '6'"],
           ["7.jpg data-id = '7'", "8.jpg data-id = '8'", "blank.jpg data-id = '9'"]];

  function fill(){
    var cnt = 1;
    for(var i = 0; i < 3; i++){
      for(var j = 0; j < 3; j++){
        $("div.a"+cnt).html("<img src = "+board[i][j]+">");
        cnt++;
      }
    }
  }

  function fill2(){
    if(rekordi > levizjet){
      rekordi = levizjet;
    }
    $(".rekordiPiket").html("<p>"+rekordi+"</p>");
    var cnt = 1;
    for(var i = 0; i < 3; i++){
      for(var j = 0; j < 3; j++){
        if(i == 2 && j == 2){
          $("div.a"+cnt).html("<img src = '9.jpg'>");
          cnt++;
        }else{
          $("div.a"+cnt).html("<img src = "+board[i][j]+">");
          cnt++;
        }
      }
    }
  }

  function find(){
    $("img").on("click", function(){
    var id = $(this).data("id");
    var coordinateI;
    var coordinateJ;
    var endI;
    var endJ;

    for(var i = 0; i < 3; i++){
      for(var j = 0; j < 3; j++){
        if(board[i][j].includes(id)){
         coordinateI = i;
         coordinateJ = j;
        }
        if(board[i][j].includes(9)){
         endI = i;
         endJ = j;
        }
      }
    }

    if(endI == coordinateI){
      if(endJ == coordinateJ-1 || endJ == coordinateJ+1){
        var tmp = board[coordinateI][coordinateJ];
        board[coordinateI][coordinateJ] = board[endI][endJ];
        board[endI][endJ] = tmp;
        levizjet++;
        $(".piket").html("<p>Levizjet</p><p>"+levizjet+"</p>");
      }
    }else if(endJ == coordinateJ){
      if(endI == coordinateI+1 || endI == coordinateI-1){
        var tmp = board[coordinateI][coordinateJ];
        board[coordinateI][coordinateJ] = board[endI][endJ];
        board[endI][endJ] = tmp;
        levizjet++;
        $(".piket").html("<p>Levizjet</p><p>"+levizjet+"</p>");
      }
    }

    var check = false;
    var control = 1;
    for(var i = 0; i < 3; i++){
      for(var j = 0; j < 3; j++){
        if(board[i][j].includes(control)){
         check = true;
         control++;
        }else{
         check = false;
         control++;
         break;
        }
      }
      if(check == false){
        break;
      }
    }

    if(check == false){
      fill();
    }else{
      fill2();
      $(".trupi").append("<div class = 'win'><h2>Ju Fituat me "+levizjet+" levizje!</h2></div>");
      $(".trupi").toggleClass("mainanm");
      $(".main").toggleClass("borderWhite");
      $(".piket").toggleClass("afterWinPiketRekordi");
      $(".rekordi").toggleClass("afterWinPiketRekordi");
      for(var an = 1; an <= 9; an++){
        $(".a"+an).toggleClass("a"+an+"anm");
      }
    }
  });
}
var levizjet = 0;
var rekordi = 9999;
function play(){
  $(".piket").html("<p>Levizjet</p><p>"+0+"</p>");
  $(".trupi").removeClass("mainanm");
  $(".main").removeClass("borderWhite");
  $(".piket").removeClass("afterWinPiketRekordi");
  $(".rekordi").removeClass("afterWinPiketRekordi");
  for(var an = 1; an <= 9; an++){
    $(".a"+an).removeClass("a"+an+"anm");
  }
  $(".win").remove();

  for(var i = 0; i < 3; i++){
    for(var j = 0; j < 3; j++){
      var a = Math.floor(Math.random() * 3);
      var b = Math.floor(Math.random() * 3);
      var tmp = board[i][j];
      board[i][j] = board[a][b];
      board[a][b] = tmp;
    }
  }
  fill();
}


$(document).ready(function(){
  play();
  $(".btn").click(function(){
    play();
    levizjet = 0;
  });
});

$(document).click(function(){
  find();
});
