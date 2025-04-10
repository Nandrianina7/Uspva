import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const Agenda = () => {
  const [events, setEvents] = useState([
    {
      id_event: 1,
      name_event: 'Réunion',
      date: '2025-04-10',
      observation: 'Réunion importante',
    },
    {
      id_event: 2,
      name_event: 'Atelier',
      date: '2025-04-12',
      observation: 'Atelier de développement',
    },
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

  console.log(
    'Événements pour FullCalendar :',
    events.map((event) => ({
      title: event.name_event,
      date: event.date,
    })),
  );

  console.log('Événements pour le tableau :', events);

  return (
    <div className="agenda-container">
      <h2>Mon Agenda</h2>
      {showForm && (
        <Dialog
          open={showForm}
          onClose={() => setShowForm(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Ajouter un événement</DialogTitle>
          <DialogContent>
            <Typography variant="subtitle1" gutterBottom>
              Ajouter un événement pour le {selectedDate}
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              label="Nom de l'événement"
              value={nameEvent}
              onChange={(e) => setNameEvent(e.target.value)}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Observation"
              multiline
              rows={4}
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Ajouter
            </Button>
            <Button
              onClick={() => setShowForm(false)}
              variant="outlined"
              color="secondary"
            >
              Annuler
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Conteneur en flexbox */}
      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        {/* Colonne gauche - Liste des événements */}
        <div style={{ flex: 1 }}>
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
        </div>

        {/* Colonne droite - Calendrier */}
        <div style={{ flex: 0.7 }}>
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
        </div>
      </div>
    </div>
  );
};

export default Agenda;
