import React from 'react'
import Alert from '@material-ui/lab/Alert';

function Alertpopup({type, message}) {
    return (
        <div style={{position: 'relative', bottom: '10%', left: '50%', transform: 'translateX(-50%)', width: 'max-content'}} >
            <Alert severity={ type }>{ message }</Alert>
        </div>
    )
}

export default Alertpopup
