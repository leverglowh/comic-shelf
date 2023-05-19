import React from 'react';
import { Card, CardTitle, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { ISeries } from 'src/shared/model/series.model';
import { IMAGE_VARIANT } from 'src/shared/reducers/api-urls';

export interface ISingleSeriesCardProps {
  series: ISeries;
}

const SingleSeriesCard: React.FC<ISingleSeriesCardProps> = (props) => {
  const { series } = props;
  return (
    <Card className='single-char' key={series.id}>
      <CardTitle>
        <Link to={window.location.pathname.endsWith('series')
          ? `${window.location.pathname}/${series.id}`
          : `/home/series/${series.id}`}
        >
          <div>{series.title}</div>
        </Link>
      </CardTitle>
      <CardBody>
        <img
          width='100%'
          src={`${series.thumbnail?.path}/${IMAGE_VARIANT.LANDSCAPE.MEDIUM}.${series.thumbnail?.extension}`}
        />
        {series.description
          ? series.description.substring(0, 80).replace(/\w+$/, '') + '...'
          : 'No available description'}
      </CardBody>
    </Card>
  );
};

export default SingleSeriesCard;
