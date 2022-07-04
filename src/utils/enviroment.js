import { getEvents } from '../state/admin/eventController/eventList';
import { getGuests } from '../state/admin/guestController/guests';
import { getUsers } from '../state/admin/userController/users';

export const fillingList = {
  events: getEvents,
  guests: getGuests,
  users: getUsers,
};
