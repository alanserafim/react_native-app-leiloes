import { formataMaiorLanceDoLeilao } from "../../../src/negocio/formatadores/lance"

describe("negocio/formatadores/lance", () => {

    describe("formataMaiorLanceDoLeilao", () => {

    it('deve retornar 2000 quando valor inicial for 1000', () => { 
        const lances = [ 
            {
                valor: 2000.00
            },
            {
                valor: 1500.00
            },
            {
                valor: 1000.00
            },

        ]
        const valorInicial = 1000.00
        const resultado = formataMaiorLanceDoLeilao(lances,valorInicial)
        expect(resultado).toBe(2000.00)
     })

     it('deve retornar o valor inicial caso não existir lances', () => {
        const lances = [];
        const valorInicial = 5;
        const maiorLance = formataMaiorLanceDoLeilao(lances, valorInicial);
        expect(maiorLance).toBe(5);
      });

    })
}

)