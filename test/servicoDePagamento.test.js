import ServicoDePagamento from '../src/servicoDePagamento.js'
import assert from 'node:assert'

describe('ServicoDePagamento', function () {

    it('deve adicionar o pagamento na lista quando pagar for chamado', function () {
        // Arrange
        const servico = new ServicoDePagamento()
        const codigoBarras = '0987-7656-3475'
        const empresa = 'Samar'
        const valor = 156.87

        // Act
        servico.pagar(codigoBarras, empresa, valor)
        const ultimo = servico.consultarUltimoPagamento()

        // Assert
        assert.equal(ultimo.codigoBarras, codigoBarras)
        assert.equal(ultimo.empresa, empresa)
        assert.equal(ultimo.valor, valor)
    })

    it('deve retornar o ultimo pagamento quando houver varios pagamentos', function () {
        // Arrange
        const servico = new ServicoDePagamento()
        servico.pagar('111', 'Sabesp', 80.00)
        servico.pagar('222', 'Enel', 250.00)
        servico.pagar('333', 'Vivo', 99.90)

        // Act
        const ultimo = servico.consultarUltimoPagamento()

        // Assert
        assert.equal(ultimo.codigoBarras, '333')
        assert.equal(ultimo.empresa, 'Vivo')
        assert.equal(ultimo.valor, 99.90)
    })

    it('deve marcar a categoria como cara quando o valor for maior que 100', function () {
        // Arrange
        const servico = new ServicoDePagamento()

        // Act
        servico.pagar('0987-7656-3475', 'Samar', 156.87)

        // Assert
        assert.equal(servico.consultarUltimoPagamento().categoria, 'cara')
    })

    it('deve marcar a categoria como padrao quando o valor for menor que 100', function () {
        // Arrange
        const servico = new ServicoDePagamento()

        // Act
        servico.pagar('1234-5678', 'Sabesp', 50.00)

        // Assert
        assert.equal(servico.consultarUltimoPagamento().categoria, 'padrão')
    })

})
