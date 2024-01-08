import * as React from 'react';
import EuroSymbolIcon from '@mui/icons-material/EuroSymbol';
import { useTranslate } from 'react-admin';

import CardWithIcon from './CardWithIcon';



const MonthlyRevenue = (props) => {
    const { value } = props;
    const translate = useTranslate();
    return (
        <CardWithIcon
            to="/commands"
            icon={EuroSymbolIcon}
            subtitle={value}
        />
    );
};

export default MonthlyRevenue;