import React from 'react'
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import EnviaLance from "../../../../src/telas/Leilao/componentes/EnviaLance";
import { ENVIADO, NAO_ENVIADO } from '../../../../src/negocio/constantes/estadosLance';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('telas/Leilao/componentes/EnviaLance', () => { 
    
    it('deve enviar o lance quando o botao for pressionado ', async () => {
        const enviaLance = jest.fn(() => new Promise (resolve => resolve(ENVIADO)))

        const { 
            getByTestId, 
            getByA11yHint,
            getByText 
        } = render(
            <EnviaLance
            enviaLance={enviaLance}
            cor="blue"
            />
        );

        const input = getByTestId("input");
        const botao = getByA11yHint("Enviar lance");
        const respostaEsperada = "10";
        fireEvent.changeText(input, respostaEsperada);
        fireEvent.press(botao);
        expect(enviaLance).toHaveBeenCalledWith(respostaEsperada);
        await waitFor(()=>{
            expect(getByText(ENVIADO)).toBeTruthy()
        })
        expect(() => getByText(NAO_ENVIADO)).toThrow()
    });
 })

