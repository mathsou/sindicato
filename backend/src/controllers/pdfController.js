const pdf = require("html-pdf");
const valorExtenso = require("../functions/valorExtenso");
const mask = require("../functions/mascaraDinheiro");

module.exports = {
	async create(request, response) {
		const dados = request.body;
		console.log(dados)
		var dataAtual = new Date();
		var diaA = dataAtual.getDate();
		var mesA = dataAtual.getMonth();
		var anoA = dataAtual.getFullYear();

		var mesExtenso = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
		var anoL = dados.data.slice(0, 4);
		var mesL = dados.data.slice(5,7);
		var diaL = dados.data.slice(8,10);
		var dataL = diaL + '/' + mesL + '/' + anoL;

		var valorTotal = mask.mascaraDinheiro(dados.valorFinal*100)
		valorTotal = valorTotal.replace('.', '-');
		valorTotal = valorTotal.replace(/\,/g, '.');
		valorTotal = valorTotal.replace('-', ',');
		console.log(valorTotal)
		var valorSinal = mask.mascaraDinheiro(dados.valorS*100)
		valorSinal = valorSinal.replace('.', '-');
		valorSinal = valorSinal.replace(/\,/g, '.');
		valorSinal = valorSinal.replace('-', ',');

		var valorRestante = mask.mascaraDinheiro(dados.valorR*100)
		valorRestante = valorRestante.replace('.', '-');
		valorRestante = valorRestante.replace(/\,/g, '.');
		valorRestante = valorRestante.replace('-', ',');

		var options = {
			'format': 'A4',
			'border': '1cm',
			'header': {
				'height':'0cm'
			},
			'footer': {
				'footer': '0cm'
			}
		}

		var documento = `
		<html>
		<body>
			<div id="pageContent">
			<p style="margin: 1px 0px; text-align: center;"> </p>
			<table style="border-collapse: collapse; width: 100%;" border="1">
			<tbody>
			<tr>
			<td style="textAligh:center"><img src="http://localhost:3000/static/media/logosindigua.96e662b3.png" width="300" height="198"/></td>
			<td style="width: 75.7962%;">
			<p class="MsoNormal" align="center">SINDICATO DOS MUNICIPÁRIOS DE GUAÍBA - <strong>SINDIGUAÍBA </strong></p>
			<p class="MsoNormal" align="center">Fundado em 17/02/1993</p>
			<p class="MsoNormal" align="center">Endereço: Av. João Araújo Lessa, nº 430, Parque 35, Guaíba, RS.</p>
			<p class="MsoNormal" align="center">Cep.: 92.705-560          Fone: 51.3491.6485</p>
			<em><span style="font-size: 12.0pt; font-family: 'Times New Roman','serif'; mso-fareast-font-family: SimSun; mso-font-kerning: .5pt; mso-ansi-language: PT-BR; mso-fareast-language: HI; mso-bidi-language: HI;">Filiado à Federação dos Sindicatos de Servidores Municipais do Estado do Rio Grande do Sul</span></em></td>
			</tr>
			</tbody>
			</table>
			<p style="margin: 1px 0px; text-align: center;">   CONTRATO DE LOCAÇÃO - ${anoA}</p>
			<p style="margin: 1px 0;"> </p>
			<p style="margin: 1px 0;">Por este instrumento particular, de um lado SINDIGUAIBA, com sede Avenida João de Araujo Lessa, nº430, Bairro: Parque 35, em RS./(UF), inscrita no CNPJ sob o nº01276868/001-81  , doravante denominado LOCADOR, e, de outro lado ${dados.socio} Associado(a), doravante denominado(a) simplesmente LOCATÁRIO, têm entre si como justo e acordado o que segue:</p>
			<p style="margin: 1px 0;"> </p>
			<p style="margin: 1px 0;">1. O LOCADOR disporá o salão de eventos sito a Avenida João de Araújo Lessa, 430, bairro Parque 35(endereço) em função do evento ${dados.evento}, a ser realizado no estabelecimento do LOCADOR, no dia ${dataL} , salão disponível das 8:00 da manhã às 3:00 da madrugada.</p>
			<p style="margin: 1px 0;"> </p>
			<p style="margin: 1px 0;">1.1 – DA DESTINAÇÃO: O espaço ora locado destina-se exclusivamente ao sócio, para fins</p>
			<p style="margin: 1px 0;">Únicos de evento de natureza familiar e sem fins lucrativos, estando expressamente proibida qualquer outra forma de evento ou subcontratação para terceiros.</p>
			<p style="margin: 1px 0;"> </p>
			<p style="margin: 1px 0;">2. Pelo aluguel do salão de eventos, o(a) LOCATÁRIO pagará ao LOCADOR a importância de ${valorTotal} (${valorExtenso.extenso(dados.valorFinal)}). O aluguel será pago em vezes. A primeira parcela de ${valorSinal} no ato de assinatura do contrato e o restante da parcela de ${valorRestante} até a data da retirada as chaves.  Essa parcela deverá ser depositada ou paga na secretaria do sindicato. As chaves serão entregues na sexta-feira antes do evento, até as 16h30mim e deverão ser devolvidas na segunda-feira após o evento.</p>
			<p style="margin: 1px 0;"> </p>
			<p style="margin: 1px 0;">3. O LOCADOR apresenta ao LOCATÁRIO os “termos de uso de salão”, em anexo – que fica fazendo parte integrante do presente contrato, comprometendo-se o LOCATÁRIO, observar, por si e por seus convidados, as respectivas normas, sob pena de rescisão contratual, com as consequências daí decorrentes.</p>
			<p style="margin: 1px 0;"> </p>
			<p style="margin: 1px 0;">4. Declara o LOCATÁRIO que o uso do salão será restrito para a causa citada no Item 1 e 1.1, do presente contrato, não se desviando, sob hipótese alguma, seus objetivos. É de responsabilidade do LOCATÁRIO a condução do comportamento de seus convidados, bem como caberá à mesma, a exigência de que seja retirado o convidado que infringir regras de conduta.</p>
			<p style="margin: 1px 0;">5. Todas as obrigações do presente contrato são exigíveis independentemente de quaisquer notificações judiciais e/ou extrajudiciais.</p>
			<p style="margin: 1px 0;"> </p>
			<p style="margin: 1px 0;">6. Na semana do evento, a título de caução, o LOCATÁRIO deverá deixar um cheque nominal e cruzado à (razão social do LOCADOR) ou em dinheiro, na importância de R$200,00 (Duzentos reais), ficando o LOCADOR com o compromisso de devolver referido cheque ou dinheiro após o evento, caso não tenha ocorrido nenhum dano material ou descumprido nenhuma regra do Termo de Uso do salão. Para a não entrega de chaves na segunda feira haverá cobrança pela demora.</p>
			<p style="margin: 1px 0;"> </p>
			<p style="margin: 1px 0;">8. O LOCADOR não se responsabiliza no caso de o evento não se realizar por motivos que não possam ser acarretados à mesma e, portanto, não devolverá o pagamento.</p>
			<p style="margin: 1px 0;"> </p>
			<p style="margin: 1px 0;">9. Fica eleito o foro da Comarca em Guaíba/RS para dirimir quaisquer dúvidas decorrentes do presente instrumento.</p>
			<p style="margin: 1px 0;">E assim, por estarem justas e contratados, assinam o presente instrumento em 2 vias de igual teor e forma, na presença das testemunhas abaixo.</p>
			<p style="margin: 1px 0;"> </p>
			<p style="margin: 1px 0;">Local e data: Guaiba, ${diaA} de ${mesExtenso[mesA]} de ${anoA} .</p>
			<p style="margin: 1px 0;"> </p>
			<p style="margin: 1px 0;"> </p>
			<p style="margin: 1px 0px; text-align: center;"> </p>
			<p style="margin: 1px 0px; text-align: center;">_________________________ _________________________</p>
			<p style="margin: 1px 0px; text-align: center;">LOCATÁRIO:  ${dados.socio}</p>
			<p style="margin: 1px 0px; text-align: center;"> </p>
			<p style="margin: 1px 0px; text-align: center;"> </p>
			<p style="margin: 1px 0px; text-align: center;"> </p>
			<p style="margin: 1px 0px; text-align: center;">_____________________________________________________</p>
			<p style="margin: 1px 0px; text-align: center;"> LOCADOR</p>
			<p style="margin: 1px 0px; text-align: center;"> </p>
			<p style="margin: 1px 0px; text-align: center;"> </p>
			<p style="margin: 1px 0px; text-align: center;">                                                                         </p>
			<p style="margin: 1px 0px; text-align: center;"> </p>
			<p style="margin: 1px 0;"> </p>
			</body>
			</html>

			`
			
			pdf.create(documento, {}).toFile("../frontend/src/contrato.pdf", (err, res) => {
				if(err){
					console.log("ERRO");
				}
				else{
					return response.status(204).send()
				}
			})	
			
			
	}
}
