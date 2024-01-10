import * as React from 'react';
import PaymentsIcon from '@mui/icons-material/Payments';

import CardWithIcon from './CardWithIcon';



const MetodoDePagamento = (props) => {
    const { value } = props;
    return (
        <CardWithIcon
            to="/commands"
            icon={PaymentsIcon}
            subtitle={value}
        />
    );
};

export default MetodoDePagamento;