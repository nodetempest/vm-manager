import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { Box, Button, Stepper, Step, StepButton } from "@mui/material";

import { Footer } from "@/layouts/VMWizard/Footer";
import { StepOne, useStepOneForm, IStepOneFormInput } from "./steps/StepOne";
import { StepTwo, useStepTwoForm, IStepTwoFormInput } from "./steps/StepTwo";
import {
  StepThree,
  useStepThreeForm,
  IStepThreeFormInput,
} from "./steps/StepThree";

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

  validate = (callback: () => void) =>
    this.forms[this.state.activeStep].handleSubmit(callback)();

  handleNext = () => {
    this.validate(() => {
      this.setState((prev) => ({
        activeStep: prev.activeStep + 1,
        completed: { ...prev.completed, [this.state.activeStep]: true },
      }));
    });
  };

  handleBack = () => {
    if (this.state.activeStep === 0) {
      this.props.navigate("..");
    }

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

  handleCreate = () => {
    this.props.navigate("..");
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
            p: "0px 40px",
            flexGrow: 1,
            maxWidth: "1360px",
            alignSelf: "center",
            width: 1,
          }}
        >
          <Box
            sx={{
              maxWidth: 1000,
              display: "flex",
              gap: 6,
              alignItems: "flex-start",
            }}
          >
            <Stepper
              nonLinear
              activeStep={activeStep}
              orientation="vertical"
              sx={{
                pt: 3,
                "& .MuiStepLabel-labelContainer": { order: -1 },
                "& .MuiStepButton-root": { justifyContent: "end" },
                "& .MuiStepConnector-line": {
                  borderRightStyle: "solid",
                  borderRightWidth: 1,
                  borderLeftWidth: 0,
                },
                "& .MuiStepConnector-root": { ml: 0, mr: "12px" },
                "& .MuiStepLabel-iconContainer": {
                  pr: 0,
                  pl: 1,
                },
              }}
            >
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
            <Box sx={{ p: 4, flexGrow: 1 }}>
              {
                [
                  <StepOne control={stepOneForm.control} />,
                  <StepTwo control={stepTwoForm.control} />,
                  <StepThree
                    control={stepThreeForm.control}
                    {...stepOneForm.getValues()}
                  />,
                ][activeStep]
              }
            </Box>
          </Box>
        </Box>
        <Footer>
          <Button onClick={this.handleBack} variant="outlined">
            Back
          </Button>
          <Button
            onClick={this.isLastStep() ? this.handleCreate : this.handleNext}
            variant="contained"
          >
            {this.isLastStep() ? "Create" : "Next"}
          </Button>
        </Footer>
      </>
    );
  }
}

export type TWithStateProps = {
  stepOneForm: UseFormReturn<IStepOneFormInput>;
  stepTwoForm: UseFormReturn<IStepTwoFormInput>;
  stepThreeForm: UseFormReturn<IStepThreeFormInput>;
  navigate: NavigateFunction;
};

const withState = <P extends TWithStateProps>(
  Component: React.ComponentType<P>
): React.FC<Omit<P, keyof TWithStateProps>> => {
  return (props) => {
    const stepOneForm = useStepOneForm();
    const stepTwoForm = useStepTwoForm();
    const stepThreeForm = useStepThreeForm();
    const navigate = useNavigate();
    return (
      <Component
        {...(props as P)}
        stepOneForm={stepOneForm}
        stepTwoForm={stepTwoForm}
        stepThreeForm={stepThreeForm}
        navigate={navigate}
      />
    );
  };
};

export const AddVM = withState(Base);
