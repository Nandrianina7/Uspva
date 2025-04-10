import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './Agenda.css';

interface EventType {
  id_event: number;
  name_event: string;
  date: string;
  observation: string;
}

const Agenda: React.FC = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [nameEvent, setNameEvent] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [observation, setObservation] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/events');
      setEvents(res.data);
    } catch (err) {
      console.error('Erreur lors de la récupération des événements :', err);
    }
  };

  const handleDateClick = (arg: { dateStr: string }) => {
    setSelectedDate(arg.dateStr);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newEvent = {
        name_event: nameEvent,
        date: selectedDate,
        observation,
      };

      // Affichage de l'événement dans la console avant l'envoi
      console.log('Nouvel événement ajouté :', newEvent);

      // Envoi de l'événement au backend
      await axios.post('http://localhost:5000/events', newEvent);

      setNameEvent('');
      setObservation('');
      setSelectedDate('');
      setShowForm(false);
      fetchEvents();
    } catch (err) {
      console.error('Erreur lors de l’ajout de l’événement :', err);
    }
  };

  return (
    <div className="agenda-container">
      <h2>Mon Agenda</h2>

      {showForm && (
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Ajouter</button>
          <button type="button" onClick={() => setShowForm(false)} style={{ marginLeft: '10px' }}>
            Annuler
          </button>
        </form>
      )}

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale="fr"
        events={events.map(event => ({
          title: event.name_event,
          date: event.date,
        }))}
        dateClick={handleDateClick}
        height="auto"
      />
    </div>
  );
};

export default Agenda;
