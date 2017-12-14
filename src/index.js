import * as pco from './pco.js'

const COOL = '<i class="fa fa-snowflake-o"></i>'
const HEAT = '<i class="fa fa-sun-o"></i>'
const COOL_GREY = '<i class="grey fa fa-snowflake-o"></i>'
const HEAT_GREY = '<i class="grey fa fa-sun-o"></i>'
const LED_ON = '<i class=" fa fa-asterisk"></i>'
const LED_OFF = '<i class="grey fa fa-asterisk"></i>'
const LED_ERR = '<i class="err fa fa-asterisk"></i>'
const BELL_OFF = '<i class="fa fa-bell"></i>'
const BELL = '<i class="err fa fa-bell"></i>'

pco.getAnalogs((res,err) => {  
if (err) {console.log(err);  return}
initTable(res)
return
})

function initTable(data) {
            console.log('Initiating table')    
            let idx = 0;
            let tableContent = [];
            let roman = ['O','I','II','III','IV','V','VI','VII']

            tableContent[idx++] = '<thead>'
            tableContent[idx++] = '<tr>'
            tableContent[idx++] = `<th>Rooftop ${data.get(3365) != 0 ? COOL : (data.get(3367) != 0 ? HEAT : '') }${data.get(1264) != 0 ? LED_ON : LED_OFF}</th>`
            tableContent[idx++] = `<th>Strefa ${data.get(3015).split('.')[0] || '-'}</th>`
            tableContent[idx++] = `<th>Tryb ${data.get(3015).split('.')[1] || '-'}</th>`
            tableContent[idx++] = `<th>Alarm ${data.get(3357) > 0 ? (BELL + data.get(3357).replace('.','')) : BELL_OFF}</th>`
            tableContent[idx++] = '</tr>'
            tableContent[idx++] = '</thead>'

            tableContent[idx++] = '<tbody>'
            tableContent[idx++] = '<tr>'
            tableContent[idx++] = '<th>Nazwa</th>'
            tableContent[idx++] = '<th/>'
            tableContent[idx++] = '<th>Nazwa</th>'
            tableContent[idx++] = '<th/>'
            tableContent[idx++] = '</tr>'
		
               
				
				tableContent[idx++] = '<tr>'
				tableContent[idx++] = '<td>Temperatura nawiewu</td>'	
                tableContent[idx++] = `<td>${data.get(3037)}</td>`
                tableContent[idx++] = '<td>Temperatura powieszczenia</td>'	
				tableContent[idx++] = `<td>${data.get(3035)}</td>`			
                tableContent[idx++] = '</tr>'

                tableContent[idx++] = '<tr>'
				tableContent[idx++] = '<td>Temperatura zewnetrzna</td>'	
                tableContent[idx++] = `<td>${data.get(3027)}</td>`
                tableContent[idx++] = '<td>Temperatura za wymiennikiem</td>'	
				tableContent[idx++] = `<td>${data.get(3278)}</td>`			
                tableContent[idx++] = '</tr>'

                tableContent[idx++] = '<tr>'
				tableContent[idx++] = '<td>Temperatura rz chlodzenia</td>'	
                tableContent[idx++] = `<td>${data.get(3086)}</td>`
                tableContent[idx++] = '<td>Temperatura rz grzania</td>'	
				tableContent[idx++] = `<td>${data.get(3088)}</td>`			
                tableContent[idx++] = '</tr>'

                tableContent[idx++] = '<tr>'
				tableContent[idx++] = '<td>Wentylator nawiewu</td>'	
                tableContent[idx++] = `<td>${data.get(3101) != 0 ? LED_ON:LED_OFF }</td>`
                tableContent[idx++] = '<td>Sprezarki</td>'	
				tableContent[idx++] = `<td>${data.get(3137) != 0 ? LED_ON : LED_OFF}${data.get(3138) != 0 ? LED_ON : LED_OFF}${data.get(3160) != 0 ? LED_ON : LED_OFF}${data.get(3161) != 0 ? LED_ON : LED_OFF}</td>`			
                tableContent[idx++] = '</tr>'

                tableContent[idx++] = '<tr>'
				tableContent[idx++] = '<td>Wentylator skraplacza</td>'	
                tableContent[idx++] = `<td>${data.get(3205) !=0 ? LED_ON : LED_OFF }${data.get(3212) !=0 ? LED_ON : LED_OFF }</td>`
                tableContent[idx++] = '<td>Palnik gazowy</td>'	
				tableContent[idx++] = `<td>${data.get(3240) != 0 ? LED_ON : LED_OFF}${data.get(3245) != 0 ? LED_ON : LED_OFF}</td>`			
                tableContent[idx++] = '</tr>'

                tableContent[idx++] = '<tr>'
				tableContent[idx++] = '<td>Wentylator wywiewu</td>'	
                tableContent[idx++] = `<td>${data.get(3301) !=0 ? LED_ON : LED_OFF }${data.get(3303) !=0 ? LED_ON : LED_OFF }${data.get(3305) !=0 ? LED_ON : LED_OFF }</td>`
                tableContent[idx++] = '<td/>'	
				tableContent[idx++] = `<td/>`			
                tableContent[idx++] = '</tr>'
                tableContent[idx++] = '</body>'

            document.getElementById('dataContainer').innerHTML = tableContent.join('')
        }
