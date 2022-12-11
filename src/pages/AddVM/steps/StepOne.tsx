import * as React from "react";
import { useForm, Control, Controller } from "react-hook-form";
import { TextField, Box } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export interface IStepOneFormInput {
  firstName: string;
}

const schema = yup
  .object({
    firstName: yup.string().required(),
  })
  .required();

const defaultValues = {
  firstName: "",
};

export const useStepOneForm = () => {
  return useForm<IStepOneFormInput>({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "onChange",
  });
};

export type TStepOneProps = {
  control: Control<IStepOneFormInput>;
};

export class StepOne extends React.Component<TStepOneProps> {
  render() {
    const { control } = this.props;
    return (
      <Box sx={{ width: 300, display: "grid", rowGap: 2 }} component="form">
        <Controller
          render={(props) => {
            console.log("form1", props);
            const { field, fieldState } = props;
            return (
              <TextField
                {...field}
                helperText={fieldState.error?.message}
                error={!!fieldState.error?.message}
                label="First Name *"
                placeholder="First Name"
              />
            );
          }}
          name="firstName"
          control={control}
        />
      </Box>
    );
  }
}
