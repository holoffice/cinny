import React from 'react';
import './Welcome.scss';

import Text from '../../atoms/text/Text';

import HolofficeSvg from '../../../../public/res/svg/holoffice.svg';

function Welcome() {
  return (
    <div className="app-welcome flex--center">
      <div>
        <img className="app-welcome__logo noselect" src={HolofficeSvg} alt="Cinny logo" />
        <Text className="app-welcome__heading" variant="h1" weight="medium" primary>Welcome to Holoffice</Text>
      </div>
    </div>
  );
}

export default Welcome;
