import { obtemLancesDoLeilao, adicionaLance } from "../../src/repositorio/lance";
import apiLeiloes from "../../src/servicos/apiLeiloes"

jest.mock('../../src/servicos/apiLeiloes')

const mockLancesDoLeilao = [
    {
        "valor": 800.01,
        "leilaoId": 1,
        "id": 1
      },
      {
        "valor": 700.00,
        "leilaoId": 2,
        "id": 2
      },
]

const mockRequisicao = (retorno) => {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve({
                data: retorno
            })
        }, 100)
    })
}

const mockRequisicaoErro = (retorno) => {
    return new Promise((_,reject)=>{
        setTimeout(()=>{
            reject()
        }, 100)
    })
}


describe('repositorio/lance', () => {

    beforeEach(()=> {
        apiLeiloes.get.mockClear();
        apiLeiloes.post.mockClear();
    })


    describe("obtemLancesDoLeilao", () => {
        
        it('deve retornar uma lista de lances', async () => {
            apiLeiloes.get.mockImplementation(()=> mockRequisicao(mockLancesDoLeilao))
            const lances = await obtemLancesDoLeilao(1)
            expect(lances).toEqual(mockLancesDoLeilao)
            expect(apiLeiloes.get).toHaveBeenCalledWith('/lances?leilaoId=1&_sort=valor&_order=desc');
            expect(apiLeiloes.get).toHaveBeenCalledTimes(1);

        })

        it("deve retornar um array vazio caso erro na requisição", async () => {
            apiLeiloes.get.mockImplementation(() => mockRequisicaoErro());
      
            const lances = await obtemLancesDoLeilao(1);
      
            expect(apiLeiloes.get).toHaveBeenCalledWith('/lances?leilaoId=1&_sort=valor&_order=desc');
            expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
            expect(lances).toEqual([]);
          });
    })

    describe("adicionaLance", () => {
        it("deve retornar true caso a requisição funcione", async () => {
          apiLeiloes.post.mockImplementation(() => mockRequisicao());
    
          const sucesso = await adicionaLance(mockLancesDoLeilao[0]);
    
          expect(apiLeiloes.post).toHaveBeenCalledWith('/lances', mockLancesDoLeilao[0]);
          expect(apiLeiloes.post).toHaveBeenCalledTimes(1);
          expect(sucesso).toBe(true);
        });
    
        it("deve retornar false caso dê erro na requisição", async () => {
          apiLeiloes.post.mockImplementation(() => mockRequisicaoErro());
    
          const sucesso = await adicionaLance(mockLancesDoLeilao[0]);
    
          expect(apiLeiloes.post).toHaveBeenCalledWith('/lances', mockLancesDoLeilao[0]);
          expect(apiLeiloes.post).toHaveBeenCalledTimes(1);
          expect(sucesso).toBe(false);
        });
      });

})