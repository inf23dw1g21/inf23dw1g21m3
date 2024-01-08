import * as React from 'react';
import PaymentsIcon from '@mui/icons-material/Payments';
import { useTranslate } from 'react-admin';

import CardWithIcon from './CardWithIcon';



const MetodoDePagamento = (props) => {
    const { value } = props;
    const translate = useTranslate();
    return (
        <CardWithIcon
            to="/commands"
            icon={PaymentsIcon}
            subtitle={value}
        />
    );
};

export default MetodoDePagamento;