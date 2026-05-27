export default class ServicoDePagamento {
    #pagamentos

    constructor() {
        this.#pagamentos = []
    }

    pagar(codigoBarras, empresa, valor) {
        let categoria = 'padrão'
        if (valor > 100) {
            categoria = 'cara'
        }
        const pagamento = {
            codigoBarras: codigoBarras,
            empresa: empresa,
            valor: valor,
            categoria: categoria
        }
        this.#pagamentos.push(pagamento)
    }

    consultarUltimoPagamento() {
        return this.#pagamentos.at(-1)
    }
}
