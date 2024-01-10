import * as React from 'react';
import EuroSymbolIcon from '@mui/icons-material/EuroSymbol';

import CardWithIcon from './CardWithIcon';



const MonthlyRevenue = (props) => {
    const { value } = props;
    return (
        <CardWithIcon
            to="/commands"
            icon={EuroSymbolIcon}
            subtitle={value}
        />
    );
};

export default MonthlyRevenue;