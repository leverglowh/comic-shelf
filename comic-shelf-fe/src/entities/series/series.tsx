import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'src/shared/reducers';
import { getEntities as getSeriesList, reset as resetSeries } from 'src/entities/series/series.reducer';
import { Button, Form, Spinner, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SingleSeriesCard from './components/series-card';
import { IPaginationState, PaginationBar } from 'src/shared/util/components/pagination-bar';
import './series.scss';

export interface ISeriesProps extends StateProps, DispatchProps {}

const Series: React.FC<ISeriesProps> = (props) => {
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
      props.resetSeries();
    }
  , []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPagination({
      ...pagination,
      itemsCount: props.seriesCount,
    })
  }, [props.seriesList]);

  useEffect(() => {
    if (searchText && !props.seriesList.length && !props.loading) {
      setShowNoResults(true);
    }
  }, [props.seriesList]);

  const handleSearchTextChange = (e) => {
    setShowNoResults(false);
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    if (searchText) props.getSeriesList(searchText);
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
      props.getSeriesList(searchText, newSelectedPage);
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
        {props.loading && (
          <div className='loading-section'>
            <Spinner style={{ width: '2rem', height: '2rem' }} animation='grow' />
          </div>
        )}
        {props.seriesList?.map((series) => (
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

const mapStateToProps = ({ series }: IRootState) => ({
  seriesList: series.entities,
  seriesCount: series.totalCount,
  loading: series.loading,
});

const mapDispatchToProps = {
  getSeriesList,
  resetSeries,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export default connect(mapStateToProps, mapDispatchToProps)(Series);
