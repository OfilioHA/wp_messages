import { ListGroup, ListGroupItem, Pagination } from "react-bootstrap";
import { PhoneListActions } from "./actions";
import { PhoneListItem } from "./item";
import { useFetch } from "../../hooks/useFetch";
import { Loader } from "../utils/Loader";
import { Empty } from "../utils/Empty";

export function PhoneList() {
  const fetcher = useFetch("/phone");

  return (
    <ListGroup>
      <PhoneListActions reload={fetcher.forceReload} />
      {fetcher.loading && (
        <ListGroupItem className="phone-list-fill">
          <Loader />
        </ListGroupItem>
      )}
      {!fetcher.loading && !fetcher.data.length && (
        <ListGroupItem className="phone-list-fill">
          <Empty />
        </ListGroupItem>
      )}
      {!fetcher.loading && Boolean(fetcher.data.length) && (
        <>
          {fetcher.data.map((item, index) => (
            <PhoneListItem key={index} phone={item} reload={fetcher.forceReload} />
          ))}
          {fetcher.data.length < 6 && (
            <ListGroupItem
              style={{ height: `${54.4 * (6 - fetcher.data.length)}px` }}
            />
          )}
        </>
      )}
      <ListGroupItem>
        <Pagination className="mb-0">
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </ListGroupItem>
    </ListGroup>
  );
}
