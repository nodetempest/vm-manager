import * as React from "react";
import { UseFormHandleSubmit, UseFormReturn } from "react-hook-form";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepButton,
  Typography,
} from "@mui/material";

import { Footer } from "@/layouts/VMWizard/Footer";
import { StepOne, useStepOneForm, IStepOneFormInput } from "./steps/StepOne";
import { boolean } from "yup";

const steps = [
  "Select campaign settings",
  "Create an ad group",
  "Create an ad",
];

export type TAddVMState = {
  activeStep: number;
  completed: boolean[];
};

export class Base extends React.Component<TWithStateProps, TAddVMState> {
  state = {
    activeStep: 0,
    completed: [],
  };

  forms = [
    this.props.stepOneForm,
    this.props.stepTwoForm,
    this.props.stepThreeForm,
  ] as const;

  totalSteps = () => steps.length;

  completedSteps = () => this.state.completed.length;

  isLastStep = () => this.state.activeStep === this.totalSteps() - 1;

  allStepsCompleted = () => this.completedSteps() === this.totalSteps();

  validate = (callback: () => void) => {
    this.forms[this.state.activeStep].handleSubmit(callback)();
  };

  handleNext = () => {
    this.validate(() => {
      this.setState((prev) => ({
        activeStep: prev.activeStep + 1,
        completed: { ...prev.completed, [this.state.activeStep]: true },
      }));
    });
  };

  handleBack = () => {
    this.validate(() => {
      this.setState((prev) => ({
        ...prev,
        activeStep: prev.activeStep - 1,
      }));
    });
  };

  handleSetStep = (step: number) => () => {
    if (this.state.activeStep === step) {
      return;
    } // go next step when try to skip over uncompleted steps
    else if (step > this.completedSteps()) {
      this.handleNext();
    } else {
      this.validate(() => {
        this.setState((prev) => ({
          ...prev,
          activeStep: step,
        }));
      });
    }
  };

  render() {
    const { activeStep, completed } = this.state;
    const [stepOneForm, stepTwoForm, stepThreeForm] = this.forms;

    return (
      <>
        <Box
          sx={{
            height: "40px",
            borderBottom: "1px solid",
            borderColor: "grey.300",
          }}
        />
        <Box
          component="main"
          sx={{
            p: "20px 40px",
            flexGrow: 1,
            maxWidth: "1360px",
            alignSelf: "center",
            width: 1,
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 1000 }}>
            <Stepper nonLinear activeStep={activeStep} orientation="vertical">
              {steps.map((label, index) => (
                <Step
                  key={label}
                  completed={activeStep !== index && completed[index]}
                >
                  <StepButton
                    color="inherit"
                    onClick={this.handleSetStep(index)}
                  >
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
            {
              [
                <StepOne control={stepOneForm.control} />,
                <div>form2</div>,
                <div>form3</div>,
              ][activeStep]
            }
          </Box>
        </Box>
        <Footer>
          <Button onClick={this.handleBack} variant="outlined">
            Back
          </Button>
          <Button onClick={this.handleNext} variant="contained">
            Next
          </Button>
        </Footer>
      </>
    );
  }
}

type TMockForm = { handleSubmit: UseFormHandleSubmit<{}> };

export type TWithStateProps = {
  stepOneForm: UseFormReturn<IStepOneFormInput>;
  stepTwoForm: TMockForm;
  stepThreeForm: TMockForm;
};

const createMockForm = (): TMockForm => {
  return {
    handleSubmit: (onSubmit) => () =>
      new Promise<void>((resolve) => onSubmit(resolve)),
  };
};

const withState = <P extends TWithStateProps>(
  Component: React.ComponentType<P>
): React.FC<Omit<P, keyof TWithStateProps>> => {
  return (props) => {
    const stepOneForm = useStepOneForm();
    const stepTwoForm = createMockForm();
    const stepThreeForm = createMockForm();
    return (
      <Component
        {...(props as P)}
        stepOneForm={stepOneForm}
        stepTwoForm={stepTwoForm}
        stepThreeForm={stepThreeForm}
      />
    );
  };
};

export const AddVM = withState(Base);
