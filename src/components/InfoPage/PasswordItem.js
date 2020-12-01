import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//formik and yup
import { Formik } from 'formik'
import { object, ref, string } from 'yup'

//material ui imports
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'

//pages
import Spinner from './Spinner'
import Alert from './Alert'
import './InfoPage.css'

const styles = theme => ({
    center: {
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center'
        },
        [theme.breakpoints.up('md')]: {
            textAlign: 'right'
        }
    },
})

// export default connect()(withRouter(withStyles(styles, { withTheme: true })(EditUserPassword)));

export default class EditUserPassword extends Component {
    state = {
        password: false,
    }

    back = () => {    //back button
        this.props.clearEdit()
    }

    _handleModalClose = () => {
        this.setState(() => ({
            password: false,
        }))
    }

    _renderModal = () => {
        const onClick = () => {
            this.setState(() => ({ password: false }))
        }

        return (
            <Alert
                isOpen={this.state.password}
                onClose={this._handleClose}
                handleSubmit={onClick}
                title="Password Reset"
                text="Your password was changed successfully"
                submitButtonText="Done"
            />
        )
    }

    _handleSubmit = ({
        currentPass,
        newPass,
        confirmPass,
        setSubmitting,
        resetForm,
    }) => {
        // fake async login
        setTimeout(async () => {
            setSubmitting(false)

            this.setState(() => ({
                password: true,
            }))

            resetForm()
        }, 1000)
    }

    render() {
        return (
            <Formik
                initialValues={{       //this object contains the initial values in the form field, the properties correspond to the 'name' attribute in the individual fields within the form.
                    currentPass: '',
                    newPass: '',
                    confirmPass: '',
                }}
                validationSchema={object().shape({       //This function automatically recieves the values object as it's argument
                    currentPass: string().required('Current password is required'),
                    newPass: string().required('New password is required'),
                    confirmPass: string()
                        .oneOf([ref('newPass')], 'Passwords do not match')
                        .required('Password is required'),
                })}
                onSubmit={(         // uses formik to automatically recieve form state as it's argument.
                    { currentPass, newPass, confirmPass },
                    { setSubmitting, resetForm }
                ) =>
                    this._handleSubmit({
                        currentPass,
                        newPass,
                        confirmPass,
                        setSubmitting,
                        resetForm,
                    })
                }
                render={props => {
                    const {
                        values,
                        touched,
                        errors,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isValid,
                        isSubmitting,
                    } = props
                    return isSubmitting ? (
                        <Spinner />
                    ) : (
                            <Paper className="form form--wrapper" elevation={10}>
                                <form className="form" onSubmit={handleSubmit}>  {/* //automatically handles on submit method */}
                                    <FormControl fullWidth margin="dense">
                                        <InputLabel
                                            htmlFor="password-current"
                                            error={Boolean(touched.currentPass && errors.currentPass)}
                                        >
                                            {'Current Password'}
                                        </InputLabel>
                                        <Input
                                            id="password-current"
                                            name="currentPass"
                                            type="password" //will password-a-tize this input
                                            value={values.currentPass} //formik value matches name attribute
                                            onChange={handleChange} //formik value to update the changed object
                                            onBlur={handleBlur} //formik helper validates input has been visited
                                            error={Boolean(touched.currentPass && errors.currentPass)}  // if input has been visited and there are errors... show errors
                                        />
                                        <FormHelperText
                                            error={Boolean(touched.currentPass && errors.currentPass)}
                                        >
                                            {touched.currentPass && errors.currentPass
                                                ? errors.currentPass
                                                : ''}
                                        </FormHelperText>
                                    </FormControl>
                                    <FormControl
                                        fullWidth
                                        margin="dense"
                                        error={Boolean(touched.newPass && errors.newPass)}
                                    >
                                        <InputLabel
                                            htmlFor="password-new"
                                            error={Boolean(touched.newPass && errors.newPass)}
                                        >
                                            {'New Password'}
                                        </InputLabel>
                                        <Input
                                            id="password-new"
                                            name="newPass"
                                            type="password"
                                            value={values.newPass}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={Boolean(touched.newPass && errors.newPass)}
                                        />
                                        <FormHelperText
                                            error={Boolean(touched.newPass && errors.newPass)}
                                        >
                                            {touched.newPass && errors.newPass ? errors.newPass : ''}
                                        </FormHelperText>
                                    </FormControl>
                                    <FormControl
                                        fullWidth
                                        margin="dense"
                                        error={Boolean(touched.confirmPass && errors.confirmPass)}
                                    >
                                        <InputLabel
                                            htmlFor="password-confirm"
                                            error={Boolean(touched.confirmPass && errors.confirmPass)}
                                        >
                                            {'Confirm Password'}
                                        </InputLabel>
                                        <Input
                                            id="password-confirm"
                                            name="confirmPass"
                                            type="password"
                                            value={values.confirmPass}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={Boolean(touched.confirmPass && errors.confirmPass)}
                                        />
                                        <FormHelperText
                                            error={Boolean(touched.confirmPass && errors.confirmPass)}
                                        >
                                            {touched.confirmPass && errors.confirmPass
                                                ? errors.confirmPass
                                                : ''}
                                        </FormHelperText>
                                    </FormControl>
                                    <Button
                                        type="submit"
                                        variant="raised"
                                        color="primary"
                                        disabled={Boolean(!isValid || isSubmitting)}
                                        style={{ margin: '16px' }}
                                    >
                                        {'Reset Password'}
                                    </Button>
                                </form>
                                {this._renderModal()}
                            </Paper>
                        )
                }}
            />
        )
    }
}
