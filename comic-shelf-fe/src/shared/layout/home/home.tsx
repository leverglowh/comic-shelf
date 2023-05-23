import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Spinner } from 'reactstrap';

import { ISeries } from 'src/shared/model/series.model';
import { getSeriesByComics, reset } from 'src/entities/series/series.reducer';
import { sortReadComicsByDate } from 'src/shared/util/general-utils';

import SingleSeriesCard from 'src/entities/series/components/series-card';

import './home.scss';
import { useAppDispatch, useAppSelector } from 'src/shared/reducers/hooks';

const Home: React.FC = (props) => {
  const me = useAppSelector((state) => state.authentication.user);
  const isAuthLoading = useAppSelector((state) => state.authentication.loading);
  const isAuthenticated = useAppSelector((state) => state.authentication.isAuthenticated);
  const seriesList = useAppSelector((state) => state.series.entities);
  const isSeriesLoading = useAppSelector((state) => state.series.loading);

  const dispatch = useAppDispatch();

  useEffect(
    () => () => {
      dispatch(reset());
    },
    []
  );
  useEffect(() => {
    if (me?.comics) {
      dispatch(getSeriesByComics(
        me.comics
          .sort(sortReadComicsByDate)
          .map((c) => c.issues[0])
          .slice(0, 9)
      ));
    }
  }, [me]);

  const sortSereiesBasedOnReadOrder = (a: ISeries, b: ISeries) => {
    if (!me.comics) return 0;
    return me.comics.findIndex((e) => e.series === a.id) - me.comics.findIndex((e) => e.series === b.id);
  };

  const goToLogin = () => {
    window.location.href = 'login';
  };

  return (
    <Fragment>
      <div id='home-page'>
        {isAuthLoading && (
          <div className="loading-overlay">
            <Spinner animation="border" variant="danger" />
          </div>
        )}
        {!isAuthenticated ? (
          <>
            Please&nbsp;
            <Button variant='primary' type='button' onClick={goToLogin}>
              Login
            </Button>
            &nbsp; to start tracking read comics!
          </>
        ) : seriesList.length === 0 && !isSeriesLoading ? (
          <div>
            No history here, go to <a href='/series'>series page</a> and start tracking!
          </div>
        ) : (
          <>
            <h2>Last 9 read:</h2>
            <div id='home-page-body'>
              {isSeriesLoading && (
                <div className='loading-section'>
                  <Spinner style={{ width: '2rem', height: '2rem' }} animation='grow' />
                </div>
              )}
              {[...seriesList].sort(sortSereiesBasedOnReadOrder).map((s) => (
                <SingleSeriesCard series={s} key={s.id} />
              ))}
            </div>
          </>
        )}
      </div>
    </Fragment>
  );
};

export default Home;
