import React, {useEffect, useState} from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {Link, useHistory} from "react-router-dom";
import {Box, Card, CardActions, CardContent, CardMedia, Button, Typography, Grid, Avatar, Divider} from "@mui/material";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import one from '../../../icons/one.png';
import two from '../../../icons/two.png';
import three from '../../../icons/three.png';
import {forwardRef, useImperativeHandle, useRef} from "react";
import { useTranslation } from 'react-i18next';

const icons = [
    (<img src={one} alt="ONE" width={50} height={50} className={"one"} />),
    (<img src={two} alt="TWO" width={50} height={50} className={"two"} />),
    (<img src={three} alt="THREE" width={50} height={50} className={"three"} />)
]

const Timer = forwardRef(({pause, practice, handleResumeClick, handlePauseClick}, ref) => {
    const [seconds, setSeconds] = useState(0);
    const { t } = useTranslation();

    useImperativeHandle(ref, () => ({
        resetTime() {
            setSeconds(0);
        },
        seconds
    }))
    // const [pause, setPause] = useState(false);

    useEffect(() => {
        if (!practice) {
            let interval = null;
            if (!pause) {
                interval = setInterval(() => {
                    setSeconds(seconds => seconds + 1);
                }, 1000);
            } else if (seconds > 0) {
                clearInterval(interval);
            }
            return () => clearInterval(interval);
        }
    }, [seconds, pause])

    return (
        <Box sx={{ width: '100%', textAlign: 'center' }}>
            {pause ? (
                <Button  variant="contained" sx={{ mx: '2%', my: '1%', width: '200px' }} onClick={handleResumeClick}>
                    <AccessAlarmsIcon sx={{mr: '5px'}}/>
                    {t('resume_btn')}
                </Button>
            ) : (
                <Button  variant="contained" sx={{ mx: '2%', my: '1%', width: '200px' }} onClick={handlePauseClick}>
                    <AccessAlarmsIcon sx={{mr: '5px'}}/>
                    {t('pause_btn')}
                </Button>
            )}
        </Box>
    );
})

function DnD({ data, practice, onSubmit }) {
    let practiceChanges = [];
    let experimentChanges = []
    data.changeReviews.forEach(review => {
        if (review.change.practice) {
            practiceChanges.push(review)
        } else {
            experimentChanges.push(review)
        }
    })
    const changes = practice ? practiceChanges : experimentChanges
    const [changeList, updateChangeList] = useState(changes.map((item, index) => ({...item, riskLevel: index+1})));
    const history = useHistory();
    const [pause, setPause] = useState(false);
    const timerRef = useRef();
    const { t } = useTranslation();

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        let items = [...changeList];
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        items = items.map((item, index) => ({...item, riskLevel: index+1}));
        updateChangeList(items);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (practice) {
            onSubmit();
        } else {
            const reviewTime = timerRef.current.seconds;
            timerRef.current.resetTime();
            fetch('https://gherald-backend.herokuapp.com/api/risk-assessment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...data, taskATime: reviewTime, changeReviews: changeList})
            }).then(response => {
                onSubmit();
            }).catch(error => {
                console.log(error);
            });
        }
    };

    const handlePauseClick = () => {
        setPause(true);
    }

    const handleResumeClick = () => {
        setPause(false);
    }

    const context = require.context("../../../images/", true, /.png$/);

    return (
        <Box style={{ width: '100%' }}>
            <Timer pause={pause} practice={practice} handleResumeClick={handleResumeClick} handlePauseClick={handlePauseClick} ref={timerRef} />
            {!pause && <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="changes">
                    {(provided) => (
                        <Box className="changes" sx={{ backgroundColor: 'secondary.main', p: 2 }} {...provided.droppableProps} ref={provided.innerRef}>
                            {changeList.map(({id, change}, index) => {
                                return (
                                    <Grid key={change.id} container alignItems="center" spacing={2}>
                                        <Grid item xs={5}>
                                            <Box sx={{ width: '100%' }} textAlign="center">
                                                {icons[index]}
                                            </Box>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <Box textAlign="center">
                                                <Draggable key={'draggable' + change.id} draggableId={change.id} index={index}>
                                                    {(provided) => (
                                                        // <Box ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                        //     <Item><Link to={`${baseUrl}/${id}`}>{subject}</Link></Item>
                                                        // </Box>
                                                        <Card sx={{ maxWidth: 550, m: 2 }} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                            <CardMedia
                                                                component="img"
                                                                src={context("./" + change.project + "-change-" + change.id + ".png")}
                                                                alt={change.commitMsg}
                                                            />
                                                            {/*<img src={context("./" + change.project + "-change-" + change.id + ".png")} height={250} alt={change.commitMsg} />*/}
                                                            {/*<CardContent>*/}
                                                            {/*    {change.subject*/}
                                                            {/*        ? <Typography variant="h6" component="div">{change.subject}</Typography>*/}
                                                            {/*        : <Typography variant="h6" component="div">{change.repo}</Typography>*/}
                                                            {/*    }*/}
                                                            {/*    {change.subject*/}
                                                            {/*        ? <Typography sx={{ mb: 1.5 }} color="text.secondary">{change.repo}</Typography>*/}
                                                            {/*        : <Typography sx={{ mb: 1.5 }} color="text.secondary">{change.commitMsg}</Typography>*/}
                                                            {/*    }*/}
                                                            {/*</CardContent>*/}
                                                            <CardActions>
                                                                <Link to={`/changes/${change.id}`} target="_blank" style={{ textDecoration: 'none' }}>
                                                                    <Button>{t('learn_more_btn')}</Button>
                                                                </Link>
                                                            </CardActions>
                                                        </Card>
                                                    )}
                                                </Draggable>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                );
                            })}
                            {provided.placeholder}
                        </Box>
                    )}
                </Droppable>
                <Box sx={{ width: '100%', textAlign: 'center', py: '3%' }}>
                    <Button  variant="contained" sx={{ mx: '2%', my: '2%', width: '200px' }} onClick={onSubmit}>
                        {t('skip_btn')}
                    </Button>
                    <Button  variant="contained" sx={{ mx: '2%', my: '2%', width: '200px' }} onClick={handleSubmit}>
                        {t('submit_btn')}
                    </Button>
                </Box>
            </DragDropContext>}
        </Box>
    );
}

export default DnD;
