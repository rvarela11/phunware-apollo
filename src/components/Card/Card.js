// @vendors
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// @material-ui
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// @styles
import './Card.scss';
import sassColors from '../../globals/scss/_colors.scss';

// Setting material-ui classes
const styles = {
    quizCard: {
        width: '50%',
        minHeight: '50vh'
    },
    quizCardOption__button: {
        justifyContent: 'flex-start',
        fontSize: '1.10rem',
        backgroundColor: sassColors.purple,
        color: sassColors.white,
        '&:hover': {
            background: sassColors.lightPurple
        }
    },
    quizCardOption__button_correct: {
        backgroundColor: sassColors.lightGreen,
        '&:disabled': {
            color: sassColors.white
        }
    },
    quizCardOption__button_incorrect: {
        backgroundColor: sassColors.lightRed
    }
};

class QuizCard extends Component {
    state = {
        indexOfCorrectAnswer: null,
        isQuestionAnswered: false
    };

    componentDidMount() {
        this.getIndexOfCorrectAnswer();
    }

    // Getting the index of the correct answer
    // This will set the green (correct) or red (incorrect) button colors after a user clicks on an option
    getIndexOfCorrectAnswer = () => {
        const { item: { answer, options } } = this.props;
        options.forEach((option, index) => {
            if (option === answer) {
                this.setState({ indexOfCorrectAnswer: index });
            }
        });
    }

    render() {
        const { classes, item } = this.props;
        const { indexOfCorrectAnswer, isQuestionAnswered } = this.state;
        return (
            <Card className={classes.quizCard}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {item.question}
                    </Typography>
                    <div className="quizCard__options">
                        { item.options.map((option, index) => (
                            <CardActions key={index}>
                                <Button
                                    /*eslint-disable */
                                    className={(isQuestionAnswered) ? (indexOfCorrectAnswer === index) ? [classes.quizCardOption__button_correct, classes.quizCardOption__button] : [classes.quizCardOption__button_incorrect, classes.quizCardOption__button] : classes.quizCardOption__button}
                                    /* eslint-enable */
                                    color="primary"
                                    disabled={isQuestionAnswered}
                                    fullWidth
                                    onClick={() => this.setState({ isQuestionAnswered: true })}
                                    size="large"
                                >
                                    {option}
                                </Button>
                            </CardActions>
                        ))
                        }
                    </div>
                </CardContent>
            </Card>
        );
    }
}

QuizCard.propTypes = {
    classes: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired
};


export default withStyles(styles)(QuizCard);