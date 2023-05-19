import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Spinner } from 'reactstrap';

import { ISeries } from 'src/shared/model/series.model';
import { IRootState } from 'src/shared/reducers';
import { getMySeries, reset } from 'src/entities/series/series.reducer';
import { sortReadComicsByDate } from 'src/shared/util/general-utils';

import SingleSeriesCard from 'src/entities/series/components/series-card';

import './home.scss';

export interface IHomeProps extends StateProps, DispatchProps {}
const Home: React.FC<IHomeProps> = (props) => {
  useEffect(
    () => () => {
      props.reset();
    },
    []
  );
  useEffect(() => {
    if (props?.me?.comics) {
      props.getMySeries(
        props.me.comics
          .sort(sortReadComicsByDate)
          .map((c) => c.issues[0])
          .slice(0, 9)
      );
    }
  }, [props.me]);

  const sortSereiesBasedOnReadOrder = (a: ISeries, b: ISeries) => {
    if (!props.me.comics) return 0;
    return props.me.comics.findIndex((e) => e.series === a.id) - props.me.comics.findIndex((e) => e.series === b.id);
  };

  const goToLogin = () => {
    window.location.href = 'login';
  };

  return (
    <div id='home-page'>
      {props.authLoading && (
        <div className="loading-overlay">
          <Spinner animation="border" variant="danger" />
        </div>
      )}
      {!props.isAuthenticated ? (
        <>
          Please&nbsp;
          <Button variant='primary' type='button' onClick={goToLogin}>
            Login
          </Button>
          &nbsp; to start tracking read comics!
        </>
      ) : props.seriesList.length === 0 && !props.seriesLoading ? (
        <div>
          No history here, go to <a href='/series'>series page</a> and start tracking!
        </div>
      ) : (
        <>
          <h2>Last 9 read:</h2>
          <div id='home-page-body'>
            {props.seriesLoading && (
              <div className='loading-section'>
                <Spinner style={{ width: '2rem', height: '2rem' }} animation='grow' />
              </div>
            )}
            {[...props.seriesList].sort(sortSereiesBasedOnReadOrder).map((s) => (
              <SingleSeriesCard series={s} key={s.id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = ({ authentication, series }: IRootState) => ({
  me: authentication.user,
  isAuthenticated: authentication.isAuthenticated,
  authLoading: authentication.loading,
  seriesLoading: series.loading,
  seriesList: series.entities,
});

const mapDispatchToProps = {
  getMySeries,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
