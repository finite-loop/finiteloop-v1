import React from 'react'
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import propTypes from 'prop-types';
import classNames from 'classnames';
import { IconButton } from 'material-ui';
import SkipPreviousIcon from 'material-ui-icons/SkipPrevious';
import PlayArrowIcon from 'material-ui-icons/PlayArrow';
import SkipNextIcon from 'material-ui-icons/SkipNext';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';


import { FbIcon, LnkdnIcon, TwtrIcon, GitHubIcon } from '../components/icons/icons'
import Fade from 'material-ui/transitions/Fade';

export const TeamsPageTemplate = ({ props, teams }) => {
    const { classes, theme } = props;
    return (
        <section>
            <h2 className={classes.teamsTitle}>{teams.teamTitle}</h2>
            <Grid container spacing={0} className={classes.teams}>
                {teams.team
                    .map(({ person }) => {
                        return (
                            <div key={person.name} >
                                <Grid className={classes.card} xs item style={{ paddingRight: '10px', paddingBottom: '10px' }}>
                                    <Card className={classes.card}>
                                        <div>
                                            <Avatar style={{ height: 150, width: 150, border: '5px solid #70A898', }}
                                                alt={person.name}
                                                src={person.avatar}
                                                className={classNames(classes.avatar, classes.bigAvatar)}
                                            />
                                            <IconButton style={{ position: 'relative', marginTop: '-70px', marginLeft: '135px' }}
                                                href={person.lnkdnsiteurl} target="_new" aria-label="Play/pause">
                                                <LnkdnIcon className={classes.icons} style={{ height: '48px', width: '48px' }} />
                                            </IconButton>
                                        </div>
                                        <CardContent className={classes.content}>
                                            <Typography variant="body1" className={classes.offeringBody1} component="h1">
                                                {person.name}
                                                <img height="30" width="30" src="/img/kolam.png" />
                                                {person.title}
                                            </Typography>
                                            <Typography variant="subheading" component="p">
                                                {person.quote}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </div>
                        )
                    })}
            </Grid>
            <div>
            </div>
        </section>
    )
}

const Teams = ({ teamsData }) => {
    const { classes, theme } = teamsData;
    const { edges: aboutus } = teamsData.data.Teams
    return (
        <div>
            {aboutus
                .map(({ node: team }) => (
                    <TeamsPageTemplate key={team.frontmatter.title}
                        props={teamsData}
                        teams={team.frontmatter}
                    />
                ))
            }
        </div>
    )
}

export default Teams;

