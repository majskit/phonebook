import { createSelector } from "@reduxjs/toolkit";

export const selectContacts = (state) => state.contacts.items;
export const selectCurrentContact = (state) => state.contacts.currentContact;
export const selectLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;
export const selectPagination = (state) => state.contacts.pagination;

export const selectFilteredContacts = createSelector(
  [selectContacts, (state) => state.filters.name],
  (contacts, filter) => {
    if (!filter) return contacts;
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase().trim())
    );
  }
);

export const selectContactsByType = createSelector(
  [selectContacts, (state) => state.filters.contactType],
  (contacts, contactType) => {
    if (!contactType || contactType === "all") return contacts;
    return contacts.filter((contact) => contact.contactType === contactType);
  }
);

export const selectFavoriteContacts = createSelector(
  [selectContacts],
  (contacts) => {
    return contacts.filter((contact) => contact.isFavourite);
  }
);
