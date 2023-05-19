import React from 'react';
import { Pagination, PaginationItem } from 'reactstrap';

export const ITEMS_PER_PAGE = 20;

export interface IPaginationState {
  currentPage: number;
  itemsCount: number;
}

export interface IPaginationBarProps {
  currentPage: number;
  itemsCount: number;
  location?: string;
  handlePageSelection: (selectedPage: number) => void;
}

export const PaginationBar: React.FC<IPaginationBarProps> = (props) => {
  if (!props.itemsCount) return null;
  const { currentPage, itemsCount, location } = props; // current page is 0 when page 1 is selected
  const pagesCount = Math.ceil(itemsCount / ITEMS_PER_PAGE);
  const handlePageSelection = (e) => {
    e.persist();
    let value = e.target.id.split('_')[1] || e.target.value;
    if (value === 'prev') {
      value = currentPage - 1;
    } else if (value === 'next') {
      value = currentPage + 1;
    }
    props.handlePageSelection(Number(value));
  };

  const itemsToDisplay = () => {
    const items: any[] = [];
    let prev: any = {};

    for (let j = 0; j < pagesCount; j++) {
      const item: any = {};
      if (
        j === 0 || // first page: always shown
        j === pagesCount - 1 || // last page: always shown
        j === currentPage - 1 || // previous page, shown
        (currentPage === 0 && j === 1) || // page 1
        (currentPage - 1 <= j && j <= currentPage + 1) // one previous and one after
      ) {
        item.display = 'display';
      } else if (prev.display === 'disabled') {
        item.display = 'hidden';
      } else {
        item.display = 'disabled';
      }

      items.push(item);
      prev = { ...item };

      if (item.display === 'hidden') {
        prev.display = 'disabled';
      }
    }
    return items;
  };

  return (
    <div
      style={{
        marginTop: 10,
        flex: '0 0 100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div>
        Showing&nbsp;
        {Math.min(currentPage * ITEMS_PER_PAGE + 1, itemsCount)} -&nbsp;
        {Math.min(itemsCount, currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE)} of {itemsCount} series&nbsp;
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <Pagination style={{ marginBottom: 0 }}>
          <PaginationItem
            id='page_prev'
            onClick={handlePageSelection}
            disabled={currentPage <= 0}
            href={location ? `${location}#${currentPage - 1}` : ''}
          >
            prev
          </PaginationItem>
          {itemsToDisplay().map((item, i) =>
            item.display === 'display' ? (
              <PaginationItem
                active={i === currentPage}
                key={i}
                id={'page_' + i}
                onClick={handlePageSelection}
                href={location ? location + '#' : ''}
              >
                {i + 1}
              </PaginationItem>
            ) : item.display === 'disabled' ? (
              <PaginationItem disabled key={i} id={'page_' + i} href={location ? location + '#' : ''}>
                ...
              </PaginationItem>
            ) : null
          )}
          <PaginationItem id='page_next' onClick={handlePageSelection} disabled={currentPage >= pagesCount - 1}>
            next
          </PaginationItem>
        </Pagination>
      </div>
      <div>
        &nbsp;
        <label htmlFor="page-jump-select" style={{ marginBottom: 0 }}>Go to page&nbsp;</label>
        <select id="page-jump-select" value={currentPage} onChange={handlePageSelection}>
          {[...Array(pagesCount)].map((_, i) => (
            <option value={i} key={`select-option-${i}`}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
