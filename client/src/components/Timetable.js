import React from 'react';
import { 
    ListGroup,
    ListGroupItem, 
    ListGroupItemHeading,
    ListGroupItemText,
    Card,
    CardHeader,
    CardTitle,
    CardImg,
    CardBody,
    CardFooter,
    Button,
    Badge 
} from "shards-react";
import styles from './Timetable.module.css';

function Timetable(props){
    return (
        <Card style={{ maxWidth: "340px" }} className={styles.TimeTable}>
      {/* <CardHeader style={{textAlign: 'center', color: '#0f7e9b', width: "16", height: "16"}}>Recommended Tasks</CardHeader> */}
        <CardBody>
        <ListGroup >
            <h4 style={{textAlign: 'center', color:"#5784BA"}}>Today's Timetable</h4>
            <ListGroupItem className={styles.TimeTable}>10 AM <Badge style={{color: '#808080'}} className={styles.BadgeESC301}>ESC301</Badge><Badge style={{color: '#808080'}} className={styles.BadgeTime}>1 hour</Badge></ListGroupItem>
            <ListGroupItem className={styles.TimeTable}>12 PM <Badge style={{color: '#808080'}} className={styles.BadgeROB313}>ROB313</Badge><Badge style={{color: '#808080'}} className={styles.BadgeTime}>1 hour</Badge></ListGroupItem>
            <ListGroupItem className={styles.TimeTable}>1 PM <Badge style={{color: '#808080'}} className={styles.BadgeCSC384}>CSC384</Badge><Badge style={{color: '#808080'}} className={styles.BadgeTime}>3 hours</Badge></ListGroupItem>
            <ListGroupItem className={styles.TimeTable}>4 PM <Badge style={{color: '#808080'}} className={styles.BadgeECE353}>ECE353</Badge><Badge style={{color: '#808080'}} className={styles.BadgeTime}>2 hours</Badge></ListGroupItem>
        </ListGroup>
        </CardBody>
        </Card>
    );
}

export default Timetable