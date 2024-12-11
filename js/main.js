function moveStr(h1){
    var h1_arr = h1.innerText.split(''),
        last = h1_arr.pop(),
        first = h1_arr.unshift(last);
  
    //  console.log(h1_arr, first);  
    h1.innerText = h1_arr.join('');
  }
  
  var i = setInterval(function(){
    var h1 = document.querySelector('h1');
    moveStr(h1);
  }, 300);
  
  var i2 = setInterval(function(){
    var h3 = document.querySelector('h3');
    moveStr(h3);
  }, 600);