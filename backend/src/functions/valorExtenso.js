module.exports = {
    extenso(valor){
        function milharFun(numMil, numCen, numDez, nunUni){
            var mil = ['', 'mil', 'dois mil', 'três mil', 'quatro mil', 'cinco mil', 'seis mil', 'sete mil', 'oito mil', 'nove mil'];
            
            if(numDez == '0' && numUni == '0'){
                return mil[numMil]+" e";
            }
            else{
                return mil[numMil];
            }
        
        }

        function centenaFun(numCen, numDez, numUni){
            var cen = ['cem', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setesentos', 'oitocentos', 'novecentos']
            if(numCen == '1' && numDez=='0' && numUni=='0'){
                return cen[0]
            }
            else{
                return cen[numCen]    
            }     
        }

        function dezenaFun(numDez, numUni){
            var dez1 = ['dez', 'onze', 'doze', 'treze', 'catorze', 'quinze', 'dezesseis', 'dezessete', 'dezoite', 'dezenove']
            var dez2 = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa']
            if(numDez == '1'){
                return dez1[numUni]
            }
            else if(numDez == '0'){
                return ''
            }

            else{
                return dez2[numDez]
            }
        }

        function unidadeFun(numUni){
            var uni = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'];
            return uni[numUni];
            
            
        }
        function calculo(){
            var strValor = String(valor);

            var milhar;
            var centena;
            var dezena;
            var unidade;

            if(strValor.length === 4){
                milhar = milharFun(strValor[0], strValor[1], strValor[2], strValor[3]);
                centena = centenaFun(strValor[1], strValor[2], strValor[3]);
                dezena = dezenaFun(strValor[2], strValor[3]);
                unidade = unidadeFun(strValor[3]);
                if(centena == '' && dezena == '' & unidade == ''){
                    return milhar + ' reais';
                }
                else if(centena == '' && dezena == ''){
                    return milhar + ' e ' + unidade + ' reais';
                }
                else if(dezena == '' && unidade == ''){
                    return milhar + ' e ' + centena + ' reais';
                }
                else if(centena == '' && unidade == ''){
                    return milhar + ' e ' + dezena + ' reais';
                }
                else if(centena == ''){
                    return milhar + ' e ' + dezena + ' e ' + unidade + ' reais';
                }
                else if(dezena == ''){
                    return milhar + ' ' + centena + ' e ' + unidade + ' reais';
                }
                else{
                    return milhar + ' ' + centena + ' e ' + dezena +  ' e ' + unidade + ' reais';
                }
            }

            else if(strValor.length === 3){
                centena = centenaFun(strValor[0], strValor[1], strValor[2]);
                dezena = dezenaFun(strValor[1], strValor[2]);
                unidade = unidadeFun(strValor[2]);
                if(dezena == '' && unidade == ''){
                    return centena + " reais"
                }
                else if(dezena == ''){
                    return centena + ' e ' + unidade + ' reais';
                }
                else if(unidade == ''){
                    return centena + ' e ' + dezena + ' reais';
                }
                else{
                    return centena + ' e ' + dezena + ' e ' + unidade + ' reais';
                }
            }

            else if(strValor.length === 2){
                dezena = dezenaFun(strValor[0], strValor[1]);
                unidade = unidadeFun(strValor[1]);
                if(unidade == ''){
                    return dezena + " reais"
                } 
                else{
                    return dezena + " e " + unidade + " reais"
                }
            }

            else if(strValor.length === 1){
                if(strValor === '0'){
                    return "zero reais"
                }

                else if(strValor === '1'){
                    return "um real"
                }
                else{
                    unidade = unidadeFun(strValor[0]);
                    return unidade + " reais"
                }
            }
        }
        return calculo();
    }
}