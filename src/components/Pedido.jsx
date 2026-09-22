import { useState } from "react"

//Array de Objetos contendo o estudo inicia do cardápio
const cardapio = [
    { id: 1, nome: "Combro-01", preco: 25.00, disponivel: true, quantidade: 0 },
    { id: 2, nome: "Combro-02", preco: 35.00, disponivel: false, quantidade: 0 },
    { id: 3, nome: "Combro-03", preco: 45.00, disponivel: false, quantidade: 0 },
    { id: 4, nome: "Combro-04", preco: 55.00, disponivel: true, quantidade: 0 }
];

const Pedido = () => {

    //HOOKS - UseState - Maniula o estado ad variável
    //Estados para geenciar a lista de items do cardápio
    const [items, setItems] = useState(cardapio);
    const [sstaus, setStatus] = useState("");
    const [enviar, setEnviar] = useState(false);

    //Valor fixo adicionado ao total quando estiver no carrinho
    const taxaEntrega = 5.00;

    //Função que altera a quantidade do pedido
    const AterarQuantidade = (id, valor) => {
        setItems(alt =>
            //MAP: Criar um nov e percorre os itens sem modificar o original(imutabilidade)
            //TERNÁRIO: Verifica se o item da iteração atual é que deve ser alterado
            //SPREAD: (...item) Mantémos valores antigos e adicona os novos
            //MATH.max: Objeto que garante que a quantdade nunca sera maior que 0
            alt.map(item =>
                item.id === id ? { ...item, quantidade: Math.max(0, item.quantidade + valor) } : item
            )
        )
    };

    //FILTER: Seleciona apenas os produtos disoníveis n carrinho
    const produtosDisponiveis = items.filter(item => item.disponivel);
    const carrinho = items.filter(item => item.quantidade > 0);

    //REDUCE: Calcula a soma dos itens (preco + quantidade) e adiciona a taxa de entrega 
    const subtotal = carrinho.reduce((ac, item) => ac + item.preco * item.quantidade, 0);
    const total = subtotal > 0 ? subTotal + taxaEntrega : 0;

    //Simulação do ciclo de vida da entrega usando temporizador assinado
    const ConfoirmarPedido = () => {
        setEnviar(true);
        setStatus("Restaurante cnfirmou pagamento, Prearando seu pedido!")
        setTimeout(() => {
            setStatus("Seu  pedido saiu para entrega!")
            setEnviar(true)
        }, 5000) //5 segundos
        setTimeout(() => {
            setStatus("Seu pedido foi entregue com sucesso!")
            setEnviar(false)
        }, 10000); //10 segundos
    };

    return (
        <>

        </>
    )
}

export default Pedido
