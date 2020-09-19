import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

import './styles.css';

import Cabecalho from '../Cabecalho';
import Menu from '../Menu';

export default class Agendamento extends React.Component {

    handleDateClick = (arg) => { // bind with an arrow function
        alert(arg.dateStr)
      }

  render() {

    localStorage.setItem('pag', 3);

   

    return (
        <div className="Agendamento-Container">
            <Cabecalho/>
            <Menu/>
            <section>
                <FullCalendar
                    plugins={[ dayGridPlugin, interactionPlugin ]}
                    initialView="dayGridMonth"
                    dateClick={this.handleDateClick}
                    locale={'pt-br'}
                    dayHeaderFormat={{weekday: 'long'}}
                    events={[
                        { title: 'event 1', date: '2020-09-19' },
                        { title: 'Festa Aniversário', date: '2020-09-20'}
                    ]}
                />
            </section>
            
        </div>
    )
  }
}