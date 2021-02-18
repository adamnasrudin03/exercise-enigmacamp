import React, { Component } from 'react';

import { withStyles } from '@material-ui/core';

import Page from '../../components/Page';
import styles from './styles.js';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
class AboutPage extends Component {

    render() {

        const { classes } = this.props;
        return (
            <Page>
                <Container fixed>
                    <Typography component="div" className={classes.container} >
                        <h1>About</h1>
                        <p>&emsp;&emsp;Coding Bootcamp is an informatics science training program with material
                        relevant to industry needs so that it has a greater impact on career opportunities.
                        There are many programs that Coding Bootcamp can offer, including programming a website,
                        software, Android, or iOS. The duration of the program is also relatively short,
                        which is 12 to 24 weeks, making Bootcamp a very effective program. For learning,
                        usually use the method of direct practice and assisted by several instructors that you
                        can always
                        discuss.
                        Classes also usually consist of only 15-20 people so that the message is conveyed more
                        clearly.
                        The curriculum of Bootcamp is also designed by experienced and professional instructors
                        and direct
                        practitioners so that students are truly ready to enter the workforce directly upon graduation. </p>
                        <p>&emsp;&emsp;Then, you will also be equipped with other skills that are also needed in the world of
                        work,
                        such as making a resume, how to successfully deal with interviews, etc.
                        Then another advantage is that you are helped to get a job, even the Bootcamp partner hiring
                         partner is ready to recruit when you are done. <b>And this is a website, to control logistics inventory during bootcamp training.</b></p>
                        

                    </Typography>
                </Container>

            </Page>
        );
    }

}

export default withStyles(styles, { withTheme: true })(AboutPage);