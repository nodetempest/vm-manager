import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { Box, Button, Stepper, Step, StepButton } from "@mui/material";
import { useDispatch } from "react-redux";

import { Navbar } from "~/layouts/VMWizard/Navbar";
import { Main } from "~/layouts/VMWizard/Main";
import { Footer } from "~/layouts/VMWizard/Footer";
import { StepOne, useStepOneForm, IStepOneFormInput } from "./steps/StepOne";
import { StepTwo, useStepTwoForm, IStepTwoFormInput } from "./steps/StepTwo";
import {
  StepThree,
  useStepThreeForm,
  IStepThreeFormInput,
} from "./steps/StepThree";
import { AppDispatch } from "~/state/store";
import { addVM } from "~/state/slices/VMs/slice";

const steps = ["General info", "Destination", "Summary"];

export type TAddVMState = {
  activeStep: number;
  completed: Record<number, boolean>;
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

  completedSteps = () => Object.keys(this.state.completed).length;

  isLastStep = () => this.state.activeStep === this.totalSteps() - 1;

  validate = (callback: () => void) => {
    this.forms[this.state.activeStep].handleSubmit(callback)();
  };

  handleNext = () => this.handleSetStep(this.state.activeStep + 1);

  handleBack = () => {
    if (this.state.activeStep === 0) {
      this.props.navigate("..");
    }

    this.handleSetStep(this.state.activeStep - 1);
  };

  handleSetStep = (step: number) => {
    if (this.state.activeStep === step) {
      return;
    } // go next step when try to skip over uncompleted steps
    else if (step > this.completedSteps()) {
      this.validate(() => {
        this.setState((prev) => ({
          activeStep: prev.activeStep + 1,
          completed: { ...prev.completed, [this.state.activeStep]: true },
        }));
      });
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
    const { VMName, VMAddress, procType } = this.props.stepOneForm.getValues();
    const { cluster } = this.props.stepTwoForm.getValues();
    const { powerOn } = this.props.stepThreeForm.getValues();

    this.props.dispatch(
      addVM({
        VMName,
        procType,
        IP: VMAddress,
        repository: cluster,
        power: powerOn,
      })
    );

    this.props.navigate("..");
  };

  render() {
    const { activeStep, completed } = this.state;
    const { stepOneForm, stepTwoForm, stepThreeForm } = this.props;

    return (
      <>
        <Navbar title="Add Virtual Machine" />
        <Main>
          <Box
            sx={{
              height: "40px",
              borderBottom: "1px solid",
              borderColor: "grey.300",
            }}
          />
          <Box
            sx={{
              mx: "auto",
              p: "0px 40px",
              maxWidth: "1360px",
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
                      onClick={() => this.handleSetStep(index)}
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
        </Main>
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
  dispatch: AppDispatch;
};

const withState = <P extends TWithStateProps>(
  Component: React.ComponentType<P>
): React.FC<Omit<P, keyof TWithStateProps>> => {
  return (props) => {
    const stepOneForm = useStepOneForm();
    const stepTwoForm = useStepTwoForm();
    const stepThreeForm = useStepThreeForm();
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    return (
      <Component
        {...(props as P)}
        stepOneForm={stepOneForm}
        stepTwoForm={stepTwoForm}
        stepThreeForm={stepThreeForm}
        navigate={navigate}
        dispatch={dispatch}
      />
    );
  };
};

export const AddVM = withState(Base);
