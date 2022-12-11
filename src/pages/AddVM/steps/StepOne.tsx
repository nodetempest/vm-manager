import * as React from "react";
import { useForm, Control, Controller } from "react-hook-form";
import {
  TextField,
  Box,
  InputAdornment,
  IconButton,
  MenuItem,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import capitalize from "lodash/capitalize";

export interface IStepOneFormInput {
  VMAddress: string;
  username: string;
  password: string;
  procType: "intel" | "celeron" | "xeon";
  VMName: string;
}

const schema = yup.object({
  VMAddress: yup
    .string()
    .trim()
    .matches(
      /^(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))$/,
      "Incorrect IP address value"
    )
    .required("IP address is required"),
  username: yup.string().trim().required("Username name is required"),
  password: yup.string().trim().required("Password name is required"),
  procType: yup
    .string()
    .trim()
    .oneOf(["intel", "celeron", "xeon"])
    .required("Processor type name is required"),
  VMName: yup.string().trim().required("Virtual machine name is required"),
});

const defaultValues = {
  VMAddress: "",
  username: "",
  password: "",
  procType: "" as IStepOneFormInput["procType"],
  VMName: "",
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

export type TStepOneState = {
  showPassword: boolean;
};

const procValues = ["intel", "celeron", "xeon"] as const;

export const keyLabelMap: Record<keyof IStepOneFormInput, string> = {
  VMAddress: "Virtual Machine Address",
  username: "Login",
  password: "Password",
  procType: "Processor type",
  VMName: "Virtual machine name",
};

export class StepOne extends React.Component<TStepOneProps, TStepOneState> {
  state = { showPassword: false };

  toggleShowPassword = () =>
    this.setState((prev) => ({ showPassword: !prev.showPassword }));

  render() {
    const { showPassword } = this.state;
    const { control } = this.props;

    return (
      <Box
        sx={{ width: 300, display: "flex", flexDirection: "column", gap: 3 }}
        component="form"
      >
        <Controller
          render={(params) => (
            <TextField
              {...params.field}
              helperText={params.fieldState.error?.message}
              error={!!params.fieldState.error?.message}
              label={keyLabelMap.VMAddress}
              placeholder={keyLabelMap.VMAddress}
              size="small"
              variant="standard"
            />
          )}
          name="VMAddress"
          control={control}
        />
        <Controller
          render={(params) => (
            <TextField
              {...params.field}
              helperText={params.fieldState.error?.message}
              error={!!params.fieldState.error?.message}
              label={keyLabelMap.username}
              placeholder={keyLabelMap.username}
              size="small"
              variant="standard"
            />
          )}
          name="username"
          control={control}
        />
        <Controller
          render={(params) => (
            <TextField
              {...params.field}
              helperText={params.fieldState.error?.message}
              error={!!params.fieldState.error?.message}
              label={keyLabelMap.password}
              placeholder={keyLabelMap.password}
              size="small"
              variant="standard"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={this.toggleShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
          name="password"
          control={control}
        />
        <Controller
          render={(params) => (
            <TextField
              {...params.field}
              helperText={params.fieldState.error?.message}
              error={!!params.fieldState.error?.message}
              select
              label={keyLabelMap.procType}
              placeholder={keyLabelMap.procType}
              size="small"
              variant="standard"
            >
              {procValues.map((proc) => (
                <MenuItem key={proc} value={proc}>
                  {capitalize(proc)}
                </MenuItem>
              ))}
            </TextField>
          )}
          name="procType"
          control={control}
        />
        <Controller
          render={(params) => (
            <TextField
              {...params.field}
              helperText={params.fieldState.error?.message}
              error={!!params.fieldState.error?.message}
              label={keyLabelMap.VMName}
              placeholder={keyLabelMap.VMName}
              size="small"
              variant="standard"
            />
          )}
          name="VMName"
          control={control}
        />
      </Box>
    );
  }
}
