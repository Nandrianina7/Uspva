import React, { useState } from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

const Agenda = () => {
  const [events, setEvents] = useState([
    // Exemple d'événements
    { id_event: 1, name_event: 'Réunion', date: '2025-04-10', observation: 'Réunion importante' },
    { id_event: 2, name_event: 'Atelier', date: '2025-04-12', observation: 'Atelier de développement' },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [nameEvent, setNameEvent] = useState('');
  const [observation, setObservation] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateClick = (date: any) => {
    setSelectedDate(date.dateStr);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent = {
      id_event: events.length + 1,
      name_event: nameEvent,
      date: selectedDate,
      observation,
    };
    setEvents([...events, newEvent]);
    setShowForm(false);
    setNameEvent('');
    setObservation('');
  };

  return (
    <div className="agenda-container">
      <h2>Mon Agenda</h2>

      {showForm && (
        <form onSubmit={handleSubmit} className="event-form">
          <h3>Ajouter un événement pour le {selectedDate}</h3>
          <input
            type="text"
            placeholder="Nom de l'événement"
            value={nameEvent}
            onChange={(e) => setNameEvent(e.target.value)}
            required
          />
          <textarea
            placeholder="Observation"
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
          />
          <div style={{ marginTop: '10px' }}>
            <button type="submit">Ajouter</button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              style={{ marginLeft: '10px' }}
            >
              Annuler
            </button>
          </div>
        </form>
      )}

      <Grid container spacing={3}>
        {/* Grid gauche - FullCalendar */}
        <Grid item xs={12} md={6}>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            locale="fr"
            events={events.map((event) => ({
              title: event.name_event,
              date: event.date,
            }))}
            dateClick={handleDateClick}
            height="auto"
          />
        </Grid>

        {/* Grid droite - Liste d'événements sous forme de tableau */}
        <Grid item xs={12} md={6}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nom de l'événement</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Observation</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id_event}>
                    <TableCell>{event.name_event}</TableCell>
                    <TableCell>{event.date}</TableCell>
                    <TableCell>{event.observation}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default Agenda;
