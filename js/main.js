var lista = [
  {"desc": "Guitarra teste", "qtd":"1", "valor":"5.30"},
  {"desc": "Bebidas", "qtd":"12", "valor":"12.00"},
  {"desc": "Lanches", "qtd":"8", "valor":"2.00"}
];

function getTotal(lista){
  var total = 0;
  for(var key in lista){
    total += lista[key].qtd * lista[key].valor;
  }
  return total;
}

function setLista(lista){
  var table = '<thead><tr><th>Descrição</th><th>Quantidade</th><th>Total</th><th>Ações</th></tr></thead><tbody>';
  for (var key in lista) {
    table += '<tr><td>'+lista[key].desc+'</td><td>'+formatQuantidade(lista[key].qtd)+'</td><td>'+formatValor(lista[key].valor)+'</td><td>' +
        '<button class=" button is-success" onclick="setUpdate('+key+');">Editar</button><button class=" button is-danger" onclick="deleteData('+key+');">Delete</button>'
       '</td></tr>';
  }
  table += '</tbody>';
  document.getElementById("listTable").innerHTML = table;
}

//Tratando format do valor R$ e com virgula
  function formatValor(valor){
    var str = parseFloat(valor).toFixed(2) + "";
    str = str.replace(".",",");
    str = "R$ " + str;

    return str;
}

function formatQuantidade(qtd){
    return parseInt(qtd)
}

//Adcionando dados na lista
  function addData() {
      if(!validation()){
          return;
      }
    var desc = document.getElementById("desc").value;
    var valor = document.getElementById("valor").value;
    var qtd = document.getElementById("qtd").value;

    lista.unshift({"desc":desc, "qtd":qtd , "valor":valor});
    setLista(lista);
  }

  function setUpdate (id) {
      var obj = lista[id];
      document.getElementById("desc").value = obj.desc;
      document.getElementById("valor").value = obj.valor;
      document.getElementById("qtd").value = obj.qtd;
      document.getElementById("btnUpdate").style.display = "inline-block";
      document.getElementById("btnAdd").style.display = "none";

      document.getElementById("inputIDUpdate").innerHTML = '<input type="hidden" id="idUpdate" value="'+ id +'">';

  }

  function resetForm() {

      document.getElementById("desc").value = "";
      document.getElementById("valor").value = "";
      document.getElementById("qtd").value = "";
      document.getElementById("btnUpdate").style.display = "none";
      document.getElementById("btnAdd").style.display = "inline-block";

      document.getElementById("inputIDUpdate").innerHTML = "";
      document.getElementById("errors").style.display = "none";

  }

  function updateData() {
    if(!validation()){
        return;
    }
      var id =       document.getElementById("idUpdate").value;
      var desc = document.getElementById("desc").value;
      var valor = document.getElementById("valor").value;
      var qtd = document.getElementById("qtd").value;

      lista[id] = {"desc":desc, "qtd":qtd , "valor":valor};
      resetForm();
      setLista(lista);
  }

  function deleteData(id) {
    if(confirm("Deseja deletar este item?")){
      if(id === lista.length - 1){
        lista.pop();
      }else if(id === 0){
        lista.shift();
      }else {
        var arrIni = lista.slice(0, id);
        var arrEnd = lista.slice(id + 1);
        lista = arrIni.concat(arrEnd);
      }
      setLista(lista);
    }

  }
  
  function validation() {

    var desc = document.getElementById("desc").value;
    var qtd = document.getElementById("qtd").value;
    var valor = document.getElementById("valor").value;
    var errors = "";
      document.getElementById("errors").style.display = "none";

    if(desc === ""){
        errors += '<p>Necessario preencher uma descrição</p>';
    }
      if(qtd === ""){
          errors += '<p>Necessario preencher uma quantidade</p>';
      }else if(qtd != parseInt(qtd)){
          errors += '<p>Favor digitar valor inteiro</p>';
      }

      if(valor === ""){
          errors += '<p>Necessario preencher valor</p>';
      }else if(qtd != parseFloat(valor)){
          errors = '<p>Valor tem que ser valido</p>';
      }

      if(errors != ""){
          document.getElementById("errors").style.display = "block";
          document.getElementById("errors").innerHTML = "<a class='title'>Error:</a>"+ errors;
            return 0;
      }else{
          return 1;
      }
      
  }
setLista(lista);
console.log(getTotal(lista));
