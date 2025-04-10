from flask_jwt_extended import get_jwt_identity
from ..models import Event, db, User
from flask import Blueprint, jsonify, request


def get_events():
    try:
        events = Event.query.all()
        events_list = [
            {
                'id': event.id_event,
                'id_user': event.id_user,
                'name_event': event.name_event,
                'date': event.date,
                'observation': event.observation
            }
            for event in events
        ]
        return jsonify(events_list), 200
    except Exception as e:
        print(f"Error fetching events: {e}")
        return jsonify({"error": "Failed to retrieve events"}), 500


def addEvent():
    user_id = get_jwt_identity()
    user = User.query.get(int(user_id))
    if not user:
        return jsonify({'error': 'Not user found'}), 404
    event = Event(
        id_user=user.id_users,
        name_event=request.json['name_event'],
        date=request.json['date'],
        observation=request.json['observation'],
    )
    db.session.add(event)
    db.session.commit()
    return jsonify({'message': 'Event added successfully'}), 201