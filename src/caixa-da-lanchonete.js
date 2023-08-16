class CaixaDaLanchonete {
  cardapio = {
    cafe: { descricao: "Café", valor: 3.0 },
    suco: { descricao: "Suco Natural", valor: 6.2 },
    sanduiche: { descricao: "Sanduíche", valor: 6.5 },
    salgado: { descricao: "Salgado", valor: 7.25 },
    combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.5 },
    combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.5 },
    chantily: { descricao: "Chantily (extra do Café)", valor: 1.5, extra: true, principal: "cafe", },
    queijo: { descricao: "Queijo (extra do Sanduíche)", valor: 2.0, extra: true, principal: "sanduiche", },
  };

  calcularValorDaCompra(formaDePagamento, itens) {
    let valorTotal = 0;
    let outPut = "";

    if (itens.length === 0) {
      outPut = "Não há itens no carrinho de compra!";
    } else {
      for (const itemQuantidade of itens) {
        const [item, quantidade] = itemQuantidade.split(",");
        const quantidadeInt = parseInt(quantidade);
      
        if (!this.cardapio[item]) {   //caso o item não esteja no cardápio
          outPut = "Item inválido!";
        }

        else if (isNaN(quantidadeInt) || quantidadeInt <= 0) { //caso a quantidade seja nula ou menor igual a 0
          outPut = "Quantidade inválida!";
        }

        else if (   //caso o item pedido seja um extra e o seu pedido principal não conste no array de pedidos
          this.cardapio[item].extra &&
          !itens.some((itemQuant) =>
            itemQuant.startsWith(this.cardapio[item].principal + ",")
          )
        ) {
          outPut = "Item extra não pode ser pedido sem o principal";
        }

        else if ( //caso o método de pagamento não seja dinheiro, credito ou debito
          formaDePagamento !== "dinheiro" &&
          formaDePagamento !== "credito" &&
          formaDePagamento !== "debito"
        ) {
          outPut = "Forma de pagamento inválida!";
        }

        else {  //caso nenhuma condição seja verdadeira
          valorTotal += this.cardapio[item].valor * quantidadeInt;
        }
      }
    }

    if (outPut === "") {  //caso não tenham sido atríbuidas mensagens ao outPut
      const desconto = formaDePagamento === "dinheiro" ? 0.95 : 1.0;
      const acrescimo = formaDePagamento === "credito" ? 1.03 : 1.0;
      valorTotal *= desconto * acrescimo;
      outPut = "R$ " + valorTotal.toFixed(2).replace(".", ",");
    }
    return outPut;
  }
}
export { CaixaDaLanchonete };