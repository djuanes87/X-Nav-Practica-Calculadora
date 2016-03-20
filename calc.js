jQuery(document).ready(function() {

  const NP = 0;
  const DIV = 1;
  const MULT = 2;
  const SUM = 3;
  const REST = 4;
  const OTHEROP = 5;

  var o ={
    op1:0,
    op2:0,
    result: 0
  };
  var operation = NP;
  var float = false;
  var fpow = 1;

  //Print the result into the display
  var showResult = function(num){
    $("#display").text(num);
  };


  var valorOperador = function(op, n){
    if(float){
      op = op + n / Math.pow(10, fpow);
      fpow++;
    }else{
      op = n + (op * 10);
    }
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

  var opRest = function(){
    if(o.op2 > o.op1){
      o.result = 0 - (o.op2 - o.op1);
    }else{
      o.result = o.op1 - o.op2;
    }
  };

  //Calculate the result
  var calcResult = function(){
    switch (operation) {
      case DIV:
        o.result = o.op1/o.op2;
        break;
      case MULT:
        o.result = o.op1*o.op2;
        break;
      case SUM:
        o.result = o.op1+o.op2;
        break;
      case REST:
        opRest();
        break;
      default:
        o.result = o.op1;
    }
    o.op1 = o.result;
    o.op2 = 0;
    float = false;
    showResult(o.result);
    operation = OTHEROP;
  };

  var clickOperation = function(op){
      if(op == "/"){
        defOperation(DIV);
      }else if(op == "\*"){
        defOperation(MULT);
      }else if(op == "+"){
        defOperation(SUM);
      }else if(op == "-"){
        defOperation(REST);
      }
  };

  var ans = function(){
    o.op1 = o.result;
    showResult(o.op1);
  };

  var opNegative = function(){
    if(operation == OTHEROP || operation == NP ){
      o.op1 = 0 -o.op1;
      showResult(o.op1);
    }else{
      o.op2 = 0 - o.op2;
      showResult(o.op2);
    }
  };

  var resetCalc = function(){
    o.op1 = 0;
    o.op2 = 0;
    operation = NP;
    float = false;
    fpow = 1;
    showResult(o.op1);
  };

  var defOperation = function(opt){
    if(operation != NP){
      calcResult();
    }
    operation = opt;
    float = false;
    fpow = 1;
  };


  //Press buttoms
  $(".bnum").click(function(){
      cambiarOperador(parseInt($(this).val(), 10));
    });
  $(".bop").click(function(){
        clickOperation($(this).val());
    });
  $(".bresult").click(calcResult);
  $(".bclear").click(resetCalc);
  $(".bans").click(ans);
  $(".bnegative").click(opNegative);
  $(".bpunto").click(function(){float = true});

  //Press KeyBoard
  var pressKeyBoard = function(e){
    pk = e.which;
    console.log(pk);
    if(pk >= 48 && pk <= 57){
      cambiarOperador(pk - 48);
    }else if(pk == 47){ // Press key "/"
      defOperation(DIV);
    }else if(pk == 42){ // Press key "*"
      defOperation(MULT);
    }else if(pk == 43){ // Press key "+"
      defOperation(SUM);
    }else if(pk == 45){ // Press key "-"
      defOperation(REST);
    }else if(pk == 46){ // Press key "-"
        float = true;
    }else if(pk == 97){ // Press key "-"
      ans();
    }else if(pk == 110){ // Press key "-"
      opNegative();
    }else if(pk == 13){ // Press key "Enter"
      calcResult();
    }else if(pk == 8){ // Press key "Enter"
      resetCalc();
    }
  };

  $(document).keypress(pressKeyBoard);
});
