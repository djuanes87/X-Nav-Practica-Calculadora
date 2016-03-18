jQuery(document).ready(function() {

  const NP = 0;
  const DIV = 1;
  const MULT = 2;
  const SUM = 3;
  const REST = 4;

  var o ={
    op1:0,
    op2:0
  };
  var operation = NP;

  //Print the result into the display
  var showResult = function(num){
    $("#display").text(num);
  };


  var valorOperador = function(op, n){
      op = n + (op * 10);
      showResult(op);
      return op;
  };

  var cambiarOperador = function(n){
    if(operation == NP){
      o.op1 = valorOperador(o.op1, n);
    }else{
      o.op2 = valorOperador(o.op2, n);
    }
  };

  //Calculate the result
  var calcResult = function(){
    switch (operation) {
      case DIV:
        o.op1 = o.op1/o.op2;
        break;
      case MULT:
        o.op1 = o.op1*o.op2;
        break;
      case SUM:
        o.op1 = o.op1+o.op2;
        break;
      case REST:
        o.op1 = o.op1-o.op2;
        break;
      default:

    }
    o.op2 = 0;
    showResult(o.op1);
  };

  var clickOperation = function(op){
      if(op == "/"){
        operation = DIV;
      }else if(op == "\*"){
        operation = MULT;
      }else if(op == "+"){
        operation = SUM;
      }else if(op == "-"){
        operation = REST;
      }
  };

  var resetCalc = function(){
    o.op1 = 0;
    o.op2 = 0;
    operation = NP;
    showResult(o.op1);
  };

  $(".bnum").click(function(){
      cambiarOperador(parseInt($(this).val(), 10));
    });
  $(".bop").click(function(){
        clickOperation($(this).val());
    });
  $(".bresult").click(calcResult);
  $(".bclear").click(resetCalc);

  var pressKeyBoard = function(e){
    pk = e.which;
    if(pk >= 48 && pk <= 57){
      cambiarOperador(pk - 48);
    }else if(pk == 47){ // Press key "/"
      operation = DIV;
    }else if(pk == 42){ // Press key "*"
      operation = MULT;
    }else if(pk == 43){ // Press key "+"
      operation = SUM;
    }else if(pk == 45){ // Press key "-"
      operation = REST;
    }else if(pk == 13){ // Press key "Enter"
      calcResult();
    }else if(pk == 8){ // Press key "Enter"
      resetCalc();
    }

  };
  
  $(document).keypress(pressKeyBoard);
});
