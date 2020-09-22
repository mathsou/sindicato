const pdf = require("html-pdf");

module.exports = {
	create(request, response) {
		const data = request.body;

		var dataAtual = new Date();
		var diaA = dataAtual.getDate();
		var mesA = dataAtual.getMonth();
		var anoA = dataAtual.getFullYear();

		var mesExtenso = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
		var anoL = data.dataHoraInicial.slice(0, 4);
		var mesL = data.dataHoraInicial.slice(5,7);
		var diaL = data.dataHoraInicial.slice(8,10);
		var dataL = diaL + '/' + mesL + '/' + anoL;

		var valor = data.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
		valor = valor.replace('.', '-');
		valor = valor.replace(/\,/g, '.');
		valor = valor.replace('-', ',');
		var documento = `
			<p style="margin: 1px 0px; text-align: center;"> </p>
			<table style="border-collapse: collapse; width: 100%;" border="1">
			<tbody>
			<tr>
			<td style="width: 24.2038%;"><img src='../assets/logosindigua.png' alt="" width="197" height="198" /></td>
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
			<p style="margin: 1px 0;">Por este instrumento particular, de um lado SINDIGUAIBA, com sede Avenida João de Araujo Lessa, nº430, Bairro: Parque 35, em RS./(UF), inscrita no CNPJ sob o nº01276868/001-81  , doravante denominado LOCADOR, e, de outro lado ${data.socio} Associado(a), doravante denominado(a) simplesmente LOCATÁRIO, têm entre si como justo e acordado o que segue:</p>
			<p style="margin: 1px 0;"> </p>
			<p style="margin: 1px 0;">1. O LOCADOR disporá o salão de eventos sito a Avenida João de Araújo Lessa, 430, bairro Parque 35(endereço) em função do evento ${data.evento}, a ser realizado no estabelecimento do LOCADOR, no dia ${dataL} , salão disponível das 8:00 da manhã às 3:00 da madrugada.</p>
			<p style="margin: 1px 0;"> </p>
			<p style="margin: 1px 0;">1.1 – DA DESTINAÇÃO: O espaço ora locado destina-se exclusivamente ao sócio, para fins</p>
			<p style="margin: 1px 0;">Únicos de evento de natureza familiar e sem fins lucrativos, estando expressamente proibida qualquer outra forma de evento ou subcontratação para terceiros.</p>
			<p style="margin: 1px 0;"> </p>
			<p style="margin: 1px 0;">2. Pelo aluguel do salão de eventos, o(a) LOCATÁRIO pagará ao LOCADOR a importância de ${valor} (Seiscentos reais). O aluguel será pago em vezes. A primeira parcela de R$200,00 no ato de assinatura do contrato e o restante da parcela de R$400,00 até a data da retirada as chaves.  Essa parcela deverá ser depositada ou paga na secretaria do sindicato. As chaves serão entregues na sexta-feira antes do evento, até as 16h30mim e deverão ser devolvidas na segunda-feira após o evento.</p>
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
			<p style="margin: 1px 0px; text-align: center;">LOCATÁRIO:  ${data.socio}</p>
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
		
			pdf.create(documento, {}).toFile("../contrato.pdf", (err, res) => {
				if(err){
					console.log("ERRO");
				}
				else{
					console.log(res);
				}
			})		
				}
}
