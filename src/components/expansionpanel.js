import React from 'react';
import { useStyles } from '../../styles/expansionpanel.css.js'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import { useRouter } from 'next/router';
import { roles } from '../../constants/constants';


function Expansionpanel({ userList }) {

    const classes = useStyles();
    const router = useRouter()
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const editHandler = (event, id) => {
        event.stopPropagation()
        if (id) {
            router.push({
                pathname: '/registration',
                query: {
                    docId: id
                }
            })
        }
    }
    // expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}
    return (
        <div>
            {
                userList && userList.map((user, index) => (

                    <ExpansionPanel expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)} >
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                            className={classes.exPanel}
                        >
                            <Typography className={classes.heading}>{user.emp_name}</Typography>
                            {/* <div className={classes.secondaryHeading} onClick={(event) => editHandler(event, user.id)}><EditIcon/><p>Edit</p></div> */}
                            {/* <Typography className={classes.secondaryHeading}><EditIcon/><p>Edit</p></Typography> */}
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <div style={{ backgroundColor: 'cyan', color: 'black', width: '50%', margin: '0px auto', padding: '10px' }}>

                                <h2>Welcome {user.emp_name}</h2>
                                <p>Employee Id: {user.emp_id}</p>
                                <p>Email: {user.email}</p>
                                <p>Designation: {user.emp_designation}</p>
                                <p>Contact: {user.contact}</p>
                                <p>Role: {Object.keys(roles).filter(key => roles[key] === user.roleId)[0]}</p>




                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                ))
            }
        </div>
    )
}

export default Expansionpanel
