import React, { useEffect, useState } from 'react';
import { getEntities as getSeriesList, reset as resetSeries } from 'src/entities/series/series.reducer';
import { Button, Form, Spinner, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SingleSeriesCard from './components/series-card';
import { useAppSelector, useAppDispatch } from 'src/shared/reducers/hooks';
import { IPaginationState, PaginationBar } from 'src/shared/util/components/pagination-bar';
import './series.scss';

const Series: React.FC = () => {
  const seriesList = useAppSelector((state) => state.series.entities);
  const seriesCount = useAppSelector((state) => state.series.totalCount);
  const isLoading = useAppSelector((state) => state.series.loading);

  const dispatch = useAppDispatch();

  const [pagination, setPagination] = useState<IPaginationState>({
    currentPage: 0,
    itemsCount: 0,
  });
  const [searchText, setSearchText] = useState('');
  const [showNoResults, setShowNoResults] = useState(false);

  /**
   * Resets all fetched series data.
   */
  useEffect(() => () => {
      dispatch(resetSeries());
    }
  , []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPagination({
      ...pagination,
      itemsCount: seriesCount,
    })
  }, [seriesList]);

  useEffect(() => {
    if (searchText && !seriesList.length && !isLoading) {
      setShowNoResults(true);
    }
  }, [seriesList]);

  const handleSearchTextChange = (e) => {
    setShowNoResults(false);
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    if (searchText) dispatch(getSeriesList(searchText));
  };

  const handleKeyPress = (e) => {
    e.persist();
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePageSelection = (newSelectedPage: number) => {
    if (newSelectedPage !== pagination.currentPage && searchText) {
      // selected new page, fetch data
      dispatch(getSeriesList(searchText, newSelectedPage));
      setPagination({
        ...pagination,
        currentPage: newSelectedPage,
      })
    }
  }

  return (
    <div id="series-page-body">
      <div className='search-div'>
        <Form>
          <Input
            placeholder="Search series titles here.."
            onChange={handleSearchTextChange}
            autoComplete='off'
            value={searchText}
            onKeyPress={handleKeyPress} />
          &nbsp;
          <Button type='submit' variant='secondary' onClick={handleSearch}>
            <FontAwesomeIcon icon='search' />
          </Button>
        </Form>
      </div>
      <div id="series-page-comics-container">
        {isLoading && (
          <div className='loading-section'>
            <Spinner style={{ width: '2rem', height: '2rem' }} animation='grow' />
          </div>
        )}
        {seriesList?.map((series) => (
          <SingleSeriesCard key={series.id} series={series} />
        ))}
        {showNoResults && (
          <div className="no-results">
            <i>Looks like there's no results for {searchText}, try something else!</i>
          </div>
        )}
        <PaginationBar {...pagination} handlePageSelection={handlePageSelection}/>
      </div>
    </div>
  );
};

export default Series;
