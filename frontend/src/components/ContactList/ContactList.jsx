import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../../redux/contacts/operations";
import {
  selectContacts,
  selectError,
  selectLoading,
  selectPagination,
} from "../../redux/contacts/selectors";
import {
  selectContactTypeFilter,
  selectFavouriteFilter,
  selectFilterName,
  selectPage,
  selectPerPage,
  selectSortBy,
  selectSortOrder,
} from "../../redux/filters/selectors";
import { changePage } from "../../redux/filters/slice";
import Loader from "../Loader/Loader";
import Pagination from "../Pagination/Pagination";
import ErrorState from "./ErrorState";
import EmptyState from "./EmptyState";
import LoadingOverlay from "./LoadingOverlay";
import ContactsGrid from "./ContactsGrid";
import { useContactFilters } from "./hooks";
import s from "./ContactList.module.css";

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const pagination = useSelector(selectPagination);

  const nameFilter = useSelector(selectFilterName);
  const contactTypeFilter = useSelector(selectContactTypeFilter);
  const favouriteFilter = useSelector(selectFavouriteFilter);
  const sortBy = useSelector(selectSortBy);
  const sortOrder = useSelector(selectSortOrder);
  const page = useSelector(selectPage);
  const perPage = useSelector(selectPerPage);

  const { filters } = useContactFilters({
    page,
    perPage,
    sortBy,
    sortOrder,
    nameFilter,
    contactTypeFilter,
    favouriteFilter,
  });

  useEffect(() => {
    dispatch(fetchContacts(filters));
  }, [dispatch, filters]);

  const handlePageChange = useCallback(
    (newPage) => {
      dispatch(changePage(newPage));
    },
    [dispatch]
  );

  const handleRetry = useCallback(() => {
    dispatch(changePage(1));
    dispatch(fetchContacts(filters));
  }, [dispatch, filters]);

  if (error) {
    return <ErrorState error={error} onRetry={handleRetry} />;
  }

  if (isLoading && contacts.length === 0) {
    return (
      <div className={s.container} role="status" aria-label="Loading contacts">
        <Loader />
      </div>
    );
  }

  const isEmpty = contacts.length === 0;
  const hasContacts = !isEmpty;

  return (
    <div className={s.container}>
      {isEmpty ? (
        <EmptyState
          nameFilter={nameFilter}
          contactTypeFilter={contactTypeFilter}
          favouriteFilter={favouriteFilter}
        />
      ) : (
        <>
          <ContactsGrid contacts={contacts} />

          {hasContacts && pagination && (
            <Pagination
              currentPage={page}
              totalPages={pagination.totalPages}
              hasNextPage={pagination.hasNextPage}
              hasPreviousPage={pagination.hasPreviousPage}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      {isLoading && contacts.length > 0 && <LoadingOverlay />}
    </div>
  );
};

export default ContactList;
