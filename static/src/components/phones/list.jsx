import { ListGroup, ListGroupItem, Pagination } from "react-bootstrap";
import { PhoneListActions } from "./actions";
import { PhoneListItem } from "./item";
import { Loader } from "../utils/Loader";
import { Empty } from "../utils/Empty";
import { usePagination } from "../../hooks/usePagination";

export function PhoneList() {
  const pagination = usePagination("/phone");

  return (
    <ListGroup>
      <PhoneListActions reload={pagination.forceReload} />
      {pagination.loading && (
        <ListGroupItem className="phone-list-fill">
          <Loader />
        </ListGroupItem>
      )}
      {!pagination.loading && !pagination.data?.phones?.length && (
        <ListGroupItem className="phone-list-fill">
          <Empty />
        </ListGroupItem>
      )}
      {!pagination.loading && Boolean(pagination.data?.phones?.length) && (
        <>
          {pagination.data.phones.map((item, index) => (
            <PhoneListItem
              key={index}
              phone={item}
              reload={pagination.forceReload}
            />
          ))}
          {pagination.data?.phones?.length < 6 && (
            <ListGroupItem
              style={{
                height: `${54.4 * (6 - pagination.data?.phones?.length)}px`,
              }}
            />
          )}
        </>
      )}
      <ListGroupItem>
        <Pagination className="mb-0">
          <Pagination.First onClick={pagination.goFirst} />
          <Pagination.Prev onClick={pagination.goPrev} />
          <Pagination.Next onClick={pagination.goNext} />
          <Pagination.Last onClick={pagination.goLast} />
        </Pagination>
      </ListGroupItem>
    </ListGroup>
  );
}
