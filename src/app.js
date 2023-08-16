import { CaixaDaLanchonete } from "./caixa-da-lanchonete.js";

const caixaDaLanchonete = new CaixaDaLanchonete();

const form = document.getElementById("order-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const pedidoInput = form.elements["pedido"].value;
  const metodoDePagamentoSelecionado = form.elements["payment-method"].value;

  //array contendo os pedidos, separa por ; e retira os espaços em branco
  const itensQuantidades = pedidoInput.split(";").map((item) => item.trim());

  const resultElement = document.getElementById("result");

  const outPut = caixaDaLanchonete.calcularValorDaCompra(
    metodoDePagamentoSelecionado,
    itensQuantidades
  );

  resultElement.textContent = outPut;
});
