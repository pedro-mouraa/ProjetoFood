import { useState } from "react"

// Array de Objetos contendo o estado inicial do cardápio
const cardapio = [
    { id: 1, nome: "Combo-01", preco: 25.00, disponivel: true, quantidade: 0 },
    { id: 2, nome: "Combo-02", preco: 35.00, disponivel: false, quantidade: 0 },
    { id: 3, nome: "Combo-03", preco: 45.00, disponivel: false, quantidade: 0 },
    { id: 4, nome: "Combo-04", preco: 55.00, disponivel: true, quantidade: 0 },
];

const Pedido = () => {

    //HOOK- useState- Manipula o estado da variavel
    //Estados para gerenciar a lista de items do cardápio
    const [items, setItems] = useState(cardapio);
    const [status, setStatus] = useState("");
    const [enviar, setEnviar] = useState(false);

    //VALOR FIXO ADICIONADO AO TOTAL QUANDO TIVER NO CARRINHO
    const taxaEntrega = 5.00;

    //FUNÇÃO QUE ALTERA A QUANTIDADE DO PEDIDO
    const AlterarQuantidade = (id, valor) => {
        setItems(alt =>
            //MAP: CRIAR UM NOVO E PERCORRE OS ITEMS SEM MODIFICAR O ORIGINAL(IMUTABILIDADE)
            //TERNARIO: verifica se o item da iteração atual é que deve ser alterado
            //SPREAD: (...item)- mantem os valor antigos e adiciona os novos
            //MATH.max - Objeto que garante que a quantidade nunca será maior que 0
            alt.map(item =>
                item.id === id ? { ...item, quantidade: Math.max(0, item.quantidade + valor) } : item
            )
        )
    }

    //FILTER: seleciona apenas os produtos disponiveis no carrinho
    const produtosDisponiveis = items.filter(item => item.disponivel);
    const carrinho = items.filter(item => item.quantidade > 0);

    //REDUCE: Calcula a soma dos items (preco + quantidade) 
    // e adiciona a taxa de entrega

    const subTotal = carrinho.reduce((ac, item) => ac + item.preco * item.quantidade, 0);
    const total = subTotal > 0 ? subTotal + taxaEntrega : 0;

    //SIMULAÇÃO DO CICLO DE VIDA DA ENTREGA USANDO TEMPORIZADOR ASSINCRONO

    const ConfirmarPedido = () => {
        setEnviar(true);
        setStatus("Restaurante confirmou pagamento, Preparando seu Pedido! ")

        setTimeout(() => {
            setStatus("Seu Pedido saiu para Entrega!")
            setEnviar(false)
        }, 5000) // 5 segundos

        setTimeout(() => {
            setStatus("Seu Pedido foi entregue com sucesso")
            setEnviar(false)
        }, 10000) // 10 segundos
    }


    return (
        <div>
            <div>
                <h2>Cardápio do Restaurante</h2>

                <div>
                    {produtosDisponiveis.map(produto => (
                        <div key={produto.id}>
                            <span>{produto.nome} - R${produto.preco.toFixed(2)}</span>

                            <div>
                                <button onClick={() => AlterarQuantidade(produto.id, -1)}>
                                    -
                                </button>

                                <span>{produto.quantidade}</span>

                                <button onClick={() => AlterarQuantidade(produto.id, +1)}>
                                    +
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <hr className="border-gray-200 my-4" />
            <div>
                <h3>Resumo da Entrega</h3>
                {carrinho.length === 0 ? (
                    <p>Seu carrinho está vazio</p>
                ) : (
                    <ul>
                        {carrinho.map(item => (
                            <li>
                                <span>{item.id} X {item.nome}</span>
                                <span>R$ {(item.preco * item.quantidade).toFixed(2)}</span>
                            </li>
                        ))}
                        <div>
                            <span>Subtotal</span>
                            <span>R${subTotal.toFixed(2)}</span>
                        </div>
                        <div>
                            <span>Taxa de Entrega</span>
                            <span>R${taxaEntrega.toFixed(2)}</span>
                        </div>
                        <div>
                            <span>Total a pagar</span>
                            <span>R${total.toFixed(2)}</span>
                        </div>

                        <button onClick={ConfirmarPedido}>
                            {enviar ? "Enviando" : "Confirmar Pedido"}
                        </button>
                        {status && (
                            <div>
                                <strong>Alerta:</strong>{status}
                            </div>
                        )}

                    </ul>
                )}
            </div>



        </div>
    )
}

export default Pedido
