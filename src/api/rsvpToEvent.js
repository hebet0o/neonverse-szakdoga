import pb from '../pocketbase';

export async function rsvpToEvent(eventId, userId) {
  return pb.collection('event_attendees').create({
    event: eventId,
    user: userId,
  });
}