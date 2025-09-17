import pb from '../pocketbase';

export async function rsvpToEvent(eventId, userId) {
  return pb.collection('EventAttendees').create({
    event_id: eventId,
    user_id: userId,
  });
}