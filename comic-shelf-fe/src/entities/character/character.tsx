import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'src/shared/reducers';
import { getEntities as getCharacterList } from 'src/entities/character/character.reducer';
import { Card, CardTitle, CardImg, CardBody } from 'reactstrap';
import { IMAGE_VARIANT } from 'src/shared/reducers/api-urls';

export interface ICharacterProps extends StateProps, DispatchProps {}

const Character: React.FC<ICharacterProps> = (props) => {
  useEffect(() => {
    props.getCharacterList();
  }, []);
  return (
    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px 20px' }}>
      {props.characterList?.map((character) => (
        <Card className='single-char' key={character.id}>
          <CardTitle>{character.name}</CardTitle>
          <CardImg variant="top"
            width='100%'
            src={`${character.thumbnail?.path}/${IMAGE_VARIANT.LANDSCAPE.MEDIUM}.${character.thumbnail?.extension}`}
          />
          <CardBody>{character.description}</CardBody>
        </Card>
      ))}
    </div>
  );
};

const mapStateToProps = ({ character }: IRootState) => ({
  characterList: character.entities,
});

const mapDispatchToProps = {
  getCharacterList,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export default connect(mapStateToProps, mapDispatchToProps)(Character);
